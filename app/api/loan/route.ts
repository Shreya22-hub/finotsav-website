import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongodb'
import { Loan } from '@/lib/models/Loan'
import { Booking } from '@/lib/models/Booking'
import { sendConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    // Basic validation
    const { name, email, phone, amount, purpose } = body
    if (!name || !email || !phone || !amount || !purpose) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const loan = await Loan.create(body)

    // Check for pending event booking to customize message
    const pendingBooking = await Booking.findOne({
      $or: [{ email }, { phone }],
      status: { $ne: 'completed' }
    })

    let messageText = `Hi ${name}, thanks for applying for a loan with Utsavya! We will contact you soon.`
    if (pendingBooking) {
      messageText = `Hi ${name}, thanks for your loan application! We also noticed your event booking. Our team will contact you soon regarding both.`
    }

    await sendConfirmationEmail(email, 'Utsavya Loan Application Received', messageText)

    return NextResponse.json({ success: true, loan })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Protect this endpoint — only logged-in users (admin)
    const session = await getServerSession(authOptions)
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const loans = await Loan.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, loans })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Protect this endpoint — only logged-in users (admin)
    const session = await getServerSession(authOptions)
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 })
    }

    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 })
    }

    const updateData: any = { status }
    if (status === 'completed') {
      updateData.completedAt = new Date()
    } else {
      updateData.completedAt = null
    }

    const loan = await Loan.findByIdAndUpdate(id, updateData, { new: true })
    if (!loan) {
      return NextResponse.json({ success: false, error: 'Loan not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, loan })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
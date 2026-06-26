import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongodb'
import { Booking } from '@/lib/models/Booking'
import { Loan } from '@/lib/models/Loan'
import { sendConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    // Basic validation
    const { name, email, phone, date, budget } = body
    if (!name || !email || !phone || !date || !budget) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const booking = await Booking.create(body)

    // Check for pending loan to customize message
    const pendingLoan = await Loan.findOne({
      $or: [{ email }, { phone }],
      status: { $ne: 'completed' }
    })

    let messageText = `Hi ${name}, thanks for booking your event with Utsavya! We will contact you soon.`
    if (pendingLoan) {
      messageText = `Hi ${name}, thanks for booking your event! We also noticed your loan application. Our team will contact you soon regarding both.`
    }

    await sendConfirmationEmail(email, 'Utsavya Event Booking Confirmation', messageText)

    return NextResponse.json({ success: true, booking })
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
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, bookings })
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

    const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true })
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
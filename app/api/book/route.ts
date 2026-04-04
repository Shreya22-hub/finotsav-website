import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongodb'
import { Booking } from '@/lib/models/Booking'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    // Basic validation
    const { name, email, date, budget } = body
    if (!name || !email || !date || !budget) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const booking = await Booking.create(body)
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Protect this endpoint — only logged-in users (admin)
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, bookings })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
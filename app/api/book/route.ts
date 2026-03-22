import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  budget: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const booking = await Booking.create(body)
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, bookings })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
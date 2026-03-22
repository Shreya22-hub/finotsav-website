import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const LoanSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  amount: String,
  purpose: String,
  createdAt: { type: Date, default: Date.now }
})

const Loan = mongoose.models.Loan || mongoose.model('Loan', LoanSchema)

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const loan = await Loan.create(body)
    return NextResponse.json({ success: true, loan })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const loans = await Loan.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, loans })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
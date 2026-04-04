import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongodb'
import { Loan } from '@/lib/models/Loan'

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
    return NextResponse.json({ success: true, loan })
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
    const loans = await Loan.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, loans })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
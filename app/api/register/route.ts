import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, email, password } = await req.json()
    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

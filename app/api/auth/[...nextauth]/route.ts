import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials?.email })
        if (!user) throw new Error('No user found')
        const isValid = await bcrypt.compare(credentials!.password, user.password)
        if (!isValid) throw new Error('Wrong password')
        return { id: user._id.toString(), name: user.name, email: user.email }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
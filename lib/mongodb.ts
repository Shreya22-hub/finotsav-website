import mongoose from 'mongoose'
import dns from 'dns'

// Fix for Windows Node.js DNS SRV resolution issue with MongoDB Atlas
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])


const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not found in .env.local')
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI)
  cached.conn = await cached.promise
  return cached.conn
}
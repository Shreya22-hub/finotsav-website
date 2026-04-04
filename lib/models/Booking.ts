import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String },
}, { timestamps: true })

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)

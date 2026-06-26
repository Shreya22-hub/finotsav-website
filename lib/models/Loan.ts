import mongoose from 'mongoose'

const LoanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: String, required: true },
  purpose: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  completedAt: { type: Date }
}, { timestamps: true })

export const Loan = mongoose.models.Loan || mongoose.model('Loan', LoanSchema)

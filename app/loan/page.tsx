'use client'
import { useState } from 'react'

export default function LoanPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', amount: '', purpose: ''
  })
  const [status, setStatus] = useState('')
  const [emi, setEmi] = useState<number | null>(null)

  const calculateEMI = () => {
    const principal = parseFloat(form.amount)
    if (!principal) return
    const rate = 0.12 / 12
    const months = 24
    const emiVal = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    setEmi(Math.round(emiVal))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', amount: '', purpose: '' })
        setEmi(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-10">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-4">
          Event <span className="text-yellow-500">Financing</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Don't let budget stop your dream event. Apply for a loan and pay in easy EMIs!
        </p>

        {/* EMI Calculator */}
        <div className="bg-gray-900 border border-yellow-500 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">💰 EMI Calculator</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-gray-400 text-sm mb-1 block">Loan Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 200000"
                value={form.amount}
                onChange={e => setForm({...form, amount: e.target.value})}
                className="w-full p-3 rounded-lg bg-black border border-gray-700"
              />
            </div>
            <button
              type="button"
              onClick={calculateEMI}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Calculate
            </button>
          </div>
          {emi && (
            <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
              <p className="text-yellow-400 text-lg font-semibold">
                Estimated EMI: ₹{emi.toLocaleString()}/month
              </p>
              <p className="text-gray-400 text-sm mt-1">*At 12% p.a. for 24 months</p>
            </div>
          )}
        </div>

        {/* Loan Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
          />
          <select
            value={form.purpose}
            onChange={e => setForm({...form, purpose: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday Party</option>
            <option value="corporate">Corporate Event</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-yellow-500 text-black py-3 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting...' : 'Apply for Loan'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-center font-semibold">
              🎉 Application submitted! We'll contact you within 24 hours.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-center font-semibold">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
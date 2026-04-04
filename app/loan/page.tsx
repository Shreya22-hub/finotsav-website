'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoanPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', amount: '', purpose: ''
  })
  const [status, setStatus] = useState('')
  const [emi, setEmi] = useState<number | null>(null)

  const calculateEMI = () => {
    const principal = parseFloat(form.amount)
    if (!principal || principal <= 0) return
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

  const inputClass = "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/60 focus:bg-yellow-500/5 transition-all duration-200 text-sm"

  const benefits = [
    { icon: '⚡', label: 'Quick Approval', desc: 'Get approved within 24 hours' },
    { icon: '📊', label: 'Low Interest', desc: 'Starting at 12% p.a.' },
    { icon: '📅', label: 'Easy EMIs', desc: 'Flexible 12–36 month plans' },
    { icon: '🔒', label: 'Secure Process', desc: '100% safe & transparent' },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Nav back */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden">
            <Image src="/logo.png" alt="Utsavya Logo" fill className="object-cover" />
          </div>
          <span className="text-lg font-bold">Utsav<span className="text-yellow-500">ya</span></span>
        </Link>
      </div>

      <div className="pt-24 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Event Financing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Don't Let Budget Stop Your{' '}
              <span className="gradient-text">Dream Event</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Apply for an event loan and celebrate the way you've always dreamed — pay in easy EMIs.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {benefits.map(({ icon, label, desc }) => (
              <div key={label} className="glass-card rounded-xl p-4 text-center hover:border-yellow-500/30 transition-all duration-200">
                <p className="text-2xl mb-2">{icon}</p>
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-gray-600 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* EMI Calculator */}
            <div className="glass-card rounded-2xl p-7 border-yellow-500/20">
              <h2 className="text-lg font-bold text-yellow-500 mb-5 flex items-center gap-2">
                💰 EMI Calculator
              </h2>

              <label className="text-gray-500 text-xs uppercase tracking-wider mb-2 block">Loan Amount (₹)</label>
              <div className="flex gap-3 mb-4">
                <input
                  type="number"
                  placeholder="e.g. 200000"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  className={inputClass + ' flex-1'}
                />
                <button
                  type="button"
                  onClick={calculateEMI}
                  className="bg-yellow-500 text-black px-5 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
                >
                  Calculate
                </button>
              </div>

              {emi ? (
                <div className="p-5 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  <p className="text-yellow-400 text-xl font-bold mb-1">
                    ₹{emi.toLocaleString()}<span className="text-sm font-normal text-gray-400">/month</span>
                  </p>
                  <p className="text-gray-500 text-xs">At 12% p.a. for 24 months</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-500">
                    <div>Total Repayment: <span className="text-white">₹{(emi * 24).toLocaleString()}</span></div>
                    <div>Interest: <span className="text-white">₹{(emi * 24 - parseFloat(form.amount)).toLocaleString()}</span></div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-white/3 rounded-xl border border-white/5 text-center text-gray-600 text-sm">
                  Enter an amount above to calculate your monthly EMI
                </div>
              )}

              <div className="mt-6 p-4 bg-white/3 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs leading-relaxed">
                  * EMI is calculated at 12% p.a. for 24 months. Actual rates may vary based on credit profile and loan tenure chosen.
                </p>
              </div>
            </div>

            {/* Loan Form */}
            <div className="glass-card rounded-2xl p-7">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                📝 Apply for Loan
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                  className={inputClass}
                />
                <select
                  value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}
                  required
                  className={inputClass + ' cursor-pointer'}
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="wedding">💍 Wedding</option>
                  <option value="birthday">🎂 Birthday Party</option>
                  <option value="corporate">🏢 Corporate Event</option>
                  <option value="other">🎉 Other</option>
                </select>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-yellow-500/20 text-sm"
                >
                  {status === 'loading' ? '⏳ Submitting...' : '🚀 Apply for Loan'}
                </button>

                {status === 'success' && (
                  <p className="text-green-400 text-xs text-center bg-green-400/10 border border-green-400/20 rounded-xl p-3">
                    🎉 Application submitted! We'll contact you within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-xs text-center bg-red-400/10 border border-red-400/20 rounded-xl p-3">
                    ❌ Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
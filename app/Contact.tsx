'use client'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', date: '', budget: '', message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', date: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/60 focus:bg-yellow-500/5 transition-all duration-200 text-sm"

  return (
    <section className="py-24 px-6 md:px-10 bg-black text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your <span className="gradient-text">Event</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Tell us about your dream event and we'll make it a reality. We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Info panel */}
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: '✉', title: 'Email Us', val: 'hello@utsavya.in' },
              { icon: '☎', title: 'Call Us', val: '+91 98765 43210' },
              { icon: '⌖', title: 'Visit Us', val: 'New Delhi, India' },
            ].map(({ icon, title, val }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-gray-500 text-sm">{val}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <p className="text-yellow-500 font-semibold text-sm mb-1">🕐 Response Time</p>
              <p className="text-gray-400 text-sm">We respond within 24 hours on business days (Mon–Sat).</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
                className={inputClass}
              />
              <input
                type="number"
                placeholder="Budget (₹)"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
                required
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Tell us about your event — guest count, theme, special requirements..."
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className={inputClass}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 shadow-xl shadow-yellow-500/20 text-sm"
            >
              {status === 'loading' ? '⏳ Submitting...' : '✨ Submit Booking Request'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 font-semibold text-center text-sm bg-green-400/10 border border-green-400/20 rounded-xl p-3">
                🎉 Booking submitted! We'll contact you within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 font-semibold text-center text-sm bg-red-400/10 border border-red-400/20 rounded-xl p-3">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
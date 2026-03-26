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

  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-12">Book Your Event</h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
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
          type="date"
          placeholder="Event Date"
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})}
          required
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />
        <input
          type="number"
          placeholder="Your budget (₹)"
          value={form.budget}
          onChange={e => setForm({...form, budget: e.target.value})}
          required
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />
        <textarea
          placeholder="Event Details"
          rows={4}
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        ></textarea>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 font-semibold">
            🎉 Booking submitted! We'll contact you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-400 font-semibold">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}
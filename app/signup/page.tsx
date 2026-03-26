'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        router.push('/login')
      } else {
        setStatus(data.message || 'error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2">
          Join <span className="text-yellow-500">LagnaLink Finance & Occasions</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">Create your account today</p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          {status === 'User already exists' && (
            <p className="text-red-400 text-sm">User already exists!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Try again!</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-yellow-500 text-black py-3 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
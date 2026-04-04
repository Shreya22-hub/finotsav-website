'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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

  const inputClass = "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/60 focus:bg-yellow-500/5 transition-all duration-200 text-sm"

  const isError = status !== '' && status !== 'loading'
  const errorMsg =
    status === 'User already exists' ? 'This email is already registered. Try logging in.' :
    isError ? 'Something went wrong. Please try again.' : ''

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/30">
            <Image src="/logo.png" alt="Utsavya Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Utsav<span className="text-yellow-500">ya</span>
          </span>
        </Link>

        <div className="glass-card rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            Join <span className="text-yellow-500">Utsavya</span>
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">Create your account to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              className={inputClass}
            />

            {errorMsg && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-yellow-500/20 text-sm mt-2"
            >
              {status === 'loading' ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
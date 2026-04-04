'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loans, setLoans] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'bookings' | 'loans'>('bookings')
  const [loading, setLoading] = useState(true)

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    Promise.all([
      fetch('/api/book').then(r => r.json()),
      fetch('/api/loan').then(r => r.json()),
    ]).then(([bookingData, loanData]) => {
      setBookings(bookingData.bookings || [])
      setLoans(loanData.loans || [])
      setLoading(false)
    })
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📋' },
    { label: 'Loan Requests', value: loans.length, icon: '💰' },
    { label: 'Total Revenue (Est.)', value: `₹${(bookings.reduce((a, b) => a + (parseInt(b.budget) || 0), 0)).toLocaleString()}`, icon: '📈' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/5 border-b border-white/10 px-6 md:px-10 py-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-yellow-500 text-sm font-medium mb-1">Welcome back, {session.user?.name} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold">
            Admin <span className="text-yellow-500">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage all bookings and loan requests</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-bold text-yellow-500">{stat.value}</p>
              <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {(['bookings', 'loans'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-semibold capitalize text-sm transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                  : 'border border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'
              }`}
            >
              {tab === 'bookings' ? `📋 Bookings (${bookings.length})` : `💰 Loans (${loans.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'bookings' && (
              bookings.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No bookings yet!</p>
                </div>
              ) : (
                bookings.map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <p><span className="text-yellow-500 font-semibold">Name:</span> <span className="text-gray-300">{item.name}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Email:</span> <span className="text-gray-300">{item.email}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Date:</span> <span className="text-gray-300">{item.date}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Budget:</span> <span className="text-gray-300">₹{parseInt(item.budget || 0).toLocaleString()}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Submitted:</span> <span className="text-gray-300">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span></p>
                      {item.message && (
                        <p className="col-span-2 md:col-span-3"><span className="text-yellow-500 font-semibold">Details:</span> <span className="text-gray-300">{item.message}</span></p>
                      )}
                    </div>
                  </div>
                ))
              )
            )}

            {activeTab === 'loans' && (
              loans.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No loan requests yet!</p>
                </div>
              ) : (
                loans.map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <p><span className="text-yellow-500 font-semibold">Name:</span> <span className="text-gray-300">{item.name}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Email:</span> <span className="text-gray-300">{item.email}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Phone:</span> <span className="text-gray-300">{item.phone}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Amount:</span> <span className="text-gray-300">₹{parseInt(item.amount || 0).toLocaleString()}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Event Type:</span> <span className="text-gray-300 capitalize">{item.purpose}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Submitted:</span> <span className="text-gray-300">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span></p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
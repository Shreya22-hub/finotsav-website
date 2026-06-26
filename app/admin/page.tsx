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
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [loanStatusFilter, setLoanStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
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
      if (bookingData.error === 'Unauthorized' || loanData.error === 'Unauthorized') {
        router.push('/')
        return
      }
      setBookings(bookingData.bookings || [])
      setLoans(loanData.loans || [])
      setLoading(false)
    })
  }, [status, router])

  const handleUpdateStatus = async (type: 'bookings' | 'loans', id: string, newStatus: string) => {
    const endpoint = type === 'bookings' ? '/api/book' : '/api/loan'
    try {
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        if (type === 'bookings') {
          setBookings(prev => prev.map(item => item._id === id ? { ...item, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : null } : item))
        } else {
          setLoans(prev => prev.map(item => item._id === id ? { ...item, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : null } : item))
        }
      } else {
        alert('Failed to update status: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      alert('Error updating status: ' + String(err))
    }
  }

  const getStatusCount = (type: 'bookings' | 'loans', statusVal: 'all' | 'pending' | 'in-progress' | 'completed') => {
    const list = type === 'bookings' ? bookings : loans
    if (statusVal === 'all') return list.length
    return list.filter(item => (item.status || 'pending') === statusVal).length
  }

  const filteredBookings = bookings.filter(item => {
    const s = item.status || 'pending'
    return bookingStatusFilter === 'all' || s === bookingStatusFilter
  })

  const filteredLoans = loans.filter(item => {
    const s = item.status || 'pending'
    return loanStatusFilter === 'all' || s === loanStatusFilter
  })

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
        <div className="flex gap-3 mb-6">
          {(['bookings', 'loans'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-semibold capitalize text-sm transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                  : 'border border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'
              }`}
            >
              {tab === 'bookings' ? `📋 Bookings (${bookings.length})` : `💰 Loans (${loans.length})`}
            </button>
          ))}
        </div>

        {/* Status Filters Sub-tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-5">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map(f => {
            const isActive = activeTab === 'bookings' ? bookingStatusFilter === f : loanStatusFilter === f
            const count = getStatusCount(activeTab, f)
            let colorClasses = 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
            let dot = '⚪ '

            if (isActive) {
              if (f === 'all') colorClasses = 'bg-white/10 text-white border-white/20'
              else if (f === 'pending') colorClasses = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              else if (f === 'in-progress') colorClasses = 'bg-blue-500/10 text-blue-500 border-blue-500/20'
              else if (f === 'completed') colorClasses = 'bg-green-500/10 text-green-500 border-green-500/20'
            }

            if (f === 'pending') dot = '🟡 '
            else if (f === 'in-progress') dot = '🔵 '
            else if (f === 'completed') dot = '🟢 '

            return (
              <button
                key={f}
                onClick={() => activeTab === 'bookings' ? setBookingStatusFilter(f) : setLoanStatusFilter(f)}
                className={`px-4 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 capitalize cursor-pointer flex items-center gap-1.5 ${colorClasses}`}
              >
                <span>{dot}</span>
                <span>{f === 'all' ? 'All Requests' : f.replace('-', ' ')}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isActive ? 'bg-white/10' : 'bg-white/5'
                }`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'bookings' && (
              filteredBookings.length === 0 ? (
                <div className="text-center py-20 text-gray-500 glass-card rounded-2xl">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No bookings match the filter!</p>
                </div>
              ) : (
                filteredBookings.map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Booking Inquiry</p>
                      </div>
                      {renderStatusBadge(item.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <p><span className="text-yellow-500 font-semibold">Email:</span> <span className="text-gray-300">{item.email}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Event Date:</span> <span className="text-gray-300">{item.date}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Budget:</span> <span className="text-gray-300">₹{parseInt(item.budget || 0).toLocaleString()}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Submitted:</span> <span className="text-gray-300">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span></p>
                      {item.message && (
                        <p className="col-span-2 md:col-span-3"><span className="text-yellow-500 font-semibold">Details:</span> <span className="text-gray-300">{item.message}</span></p>
                      )}
                    </div>

                    {/* Actions and Status Timestamps */}
                    <div className="border-t border-white/5 pt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-gray-400">
                        {(item.status || 'pending') === 'completed' && item.completedAt ? (
                          <span className="flex items-center gap-1.5 text-green-400/80">
                            🟢 Completed on {new Date(item.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        ) : (
                          <span className="text-gray-500">Last updated: {new Date(item.updatedAt || item.createdAt).toLocaleDateString('en-IN')}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {(item.status || 'pending') === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus('bookings', item._id, 'in-progress')}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ⚙️ Start Progress
                            </button>
                            <button
                              onClick={() => handleUpdateStatus('bookings', item._id, 'completed')}
                              className="px-3.5 py-1.5 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 text-xs font-semibold border border-green-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ✓ Complete
                            </button>
                          </>
                        )}
                        {(item.status || 'pending') === 'in-progress' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus('bookings', item._id, 'pending')}
                              className="px-3.5 py-1.5 rounded-lg bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 text-xs font-semibold border border-yellow-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ⏳ Revert to Pending
                            </button>
                            <button
                              onClick={() => handleUpdateStatus('bookings', item._id, 'completed')}
                              className="px-3.5 py-1.5 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 text-xs font-semibold border border-green-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ✓ Complete
                            </button>
                          </>
                        )}
                        {(item.status || 'pending') === 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus('bookings', item._id, 'in-progress')}
                            className="px-3.5 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                          >
                            ↺ Reopen Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )
            )}

            {activeTab === 'loans' && (
              filteredLoans.length === 0 ? (
                <div className="text-center py-20 text-gray-500 glass-card rounded-2xl">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No loan requests match the filter!</p>
                </div>
              ) : (
                filteredLoans.map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Financing Request</p>
                      </div>
                      {renderStatusBadge(item.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <p><span className="text-yellow-500 font-semibold">Email:</span> <span className="text-gray-300">{item.email}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Phone:</span> <span className="text-gray-300">{item.phone}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Amount:</span> <span className="text-gray-300 font-medium text-yellow-400">₹{parseInt(item.amount || 0).toLocaleString()}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Event Type:</span> <span className="text-gray-300 capitalize">{item.purpose}</span></p>
                      <p><span className="text-yellow-500 font-semibold">Submitted:</span> <span className="text-gray-300">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span></p>
                    </div>

                    {/* Actions and Status Timestamps */}
                    <div className="border-t border-white/5 pt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-gray-400">
                        {(item.status || 'pending') === 'completed' && item.completedAt ? (
                          <span className="flex items-center gap-1.5 text-green-400/80">
                            🟢 Approved/Completed on {new Date(item.completedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        ) : (
                          <span className="text-gray-500">Last updated: {new Date(item.updatedAt || item.createdAt).toLocaleDateString('en-IN')}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {(item.status || 'pending') === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus('loans', item._id, 'in-progress')}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ⚙️ Start Review
                            </button>
                            <button
                              onClick={() => handleUpdateStatus('loans', item._id, 'completed')}
                              className="px-3.5 py-1.5 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 text-xs font-semibold border border-green-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ✓ Approve & Complete
                            </button>
                          </>
                        )}
                        {(item.status || 'pending') === 'in-progress' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus('loans', item._id, 'pending')}
                              className="px-3.5 py-1.5 rounded-lg bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 text-xs font-semibold border border-yellow-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ⏳ Revert to Pending
                            </button>
                            <button
                              onClick={() => handleUpdateStatus('loans', item._id, 'completed')}
                              className="px-3.5 py-1.5 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 text-xs font-semibold border border-green-500/30 transition-all cursor-pointer flex items-center gap-1"
                            >
                              ✓ Approve & Complete
                            </button>
                          </>
                        )}
                        {(item.status || 'pending') === 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus('loans', item._id, 'in-progress')}
                            className="px-3.5 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                          >
                            ↺ Reopen Request
                          </button>
                        )}
                      </div>
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

// Helpers
const renderStatusBadge = (status: string) => {
  const currentStatus = status || 'pending'
  let badgeColor = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  if (currentStatus === 'in-progress') {
    badgeColor = 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  } else if (currentStatus === 'completed') {
    badgeColor = 'bg-green-500/10 text-green-500 border-green-500/20'
  }
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${badgeColor} capitalize inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        currentStatus === 'pending' ? 'bg-yellow-500' :
        currentStatus === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
      }`} />
      {currentStatus === 'in-progress' ? 'In Progress' : currentStatus}
    </span>
  )
}
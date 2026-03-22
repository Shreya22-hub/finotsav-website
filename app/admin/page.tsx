'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loans, setLoans] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'bookings' | 'loans'>('bookings')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/book').then(r => r.json()),
      fetch('/api/loan').then(r => r.json())
    ]).then(([bookingData, loanData]) => {
      setBookings(bookingData.bookings || [])
      setLoans(loanData.loans || [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Admin <span className="text-yellow-500">Dashboard</span>
      </h1>
      <p className="text-center text-gray-400 mb-10">Manage all bookings and loan requests</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
        <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 text-center">
          <p className="text-4xl font-bold text-yellow-500">{bookings.length}</p>
          <p className="text-gray-400 mt-1">Total Bookings</p>
        </div>
        <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 text-center">
          <p className="text-4xl font-bold text-yellow-500">{loans.length}</p>
          <p className="text-gray-400 mt-1">Loan Requests</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'bookings'
              ? 'bg-yellow-500 text-black'
              : 'border border-yellow-500 text-yellow-500'
          }`}
        >
          Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('loans')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'loans'
              ? 'bg-yellow-500 text-black'
              : 'border border-yellow-500 text-yellow-500'
          }`}
        >
          Loan Requests ({loans.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {activeTab === 'bookings' && (
            bookings.length === 0 ? (
              <p className="text-center text-gray-400">No bookings yet!</p>
            ) : (
              bookings.map((item, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="text-yellow-500 font-semibold">Name:</span> {item.name}</p>
                    <p><span className="text-yellow-500 font-semibold">Email:</span> {item.email}</p>
                    <p><span className="text-yellow-500 font-semibold">Date:</span> {item.date}</p>
                    <p><span className="text-yellow-500 font-semibold">Budget:</span> ₹{item.budget}</p>
                    <p className="col-span-2"><span className="text-yellow-500 font-semibold">Details:</span> {item.message}</p>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'loans' && (
            loans.length === 0 ? (
              <p className="text-center text-gray-400">No loan requests yet!</p>
            ) : (
              loans.map((item, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="text-yellow-500 font-semibold">Name:</span> {item.name}</p>
                    <p><span className="text-yellow-500 font-semibold">Email:</span> {item.email}</p>
                    <p><span className="text-yellow-500 font-semibold">Phone:</span> {item.phone}</p>
                    <p><span className="text-yellow-500 font-semibold">Amount:</span> ₹{item.amount}</p>
                    <p><span className="text-yellow-500 font-semibold">Event Type:</span> {item.purpose}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}
    </div>
  )
}
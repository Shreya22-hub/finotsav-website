'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-4 bg-black/30 backdrop-blur-md z-50">
      
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-yellow-500">
        Finotsav
      </Link>

      {/* Menu */}
      <div className="hidden md:flex gap-8 text-sm items-center">
        <a href="#" className="hover:text-yellow-400 transition">Home</a>
        <a href="#" className="hover:text-yellow-400 transition">Services</a>
        <a href="#" className="hover:text-yellow-400 transition">Gallery</a>
        <a href="#" className="hover:text-yellow-400 transition">Contact</a>
        <Link href="/loan" className="hover:text-yellow-400 transition">Loan</Link>

        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-yellow-500 text-sm">Hi, {session.user?.name?.split(' ')[0]}!</span>
            <button
              onClick={() => signOut()}
              className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full text-sm hover:bg-yellow-500 hover:text-black transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition text-sm"
          >
            Login
          </Link>
        )}
      </div>

    </div>
  )
}
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all duration-300">
            <div className="relative w-8 h-8 flex items-center justify-center">
               <Image src="/logo.png" alt="Utsavya Logo" fill className="object-contain mix-blend-multiply" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
            Utsav<span className="text-yellow-500">ya</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-7 text-sm items-center text-gray-300">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-yellow-400 transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-yellow-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link href="/loan" className="hover:text-yellow-400 transition-colors duration-200 relative group">
            Loan
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-yellow-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-yellow-500 text-sm font-medium">
                Hi, {session.user?.name?.split(' ')[0]}! 👋
              </span>
              <button
                onClick={() => signOut()}
                className="border border-yellow-500/60 text-yellow-500 px-4 py-1.5 rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-all duration-200 hover:border-yellow-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-yellow-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-yellow-500/20"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4 text-gray-300 text-sm">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-yellow-400 transition-colors py-1 border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link
            href="/loan"
            className="hover:text-yellow-400 transition-colors py-1 border-b border-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Loan
          </Link>

          <div className="pt-2">
            {session ? (
              <div className="flex flex-col gap-3">
                <p className="text-yellow-500 font-medium">Hi, {session.user?.name?.split(' ')[0]}! 👋</p>
                <button
                  onClick={() => { signOut(); setMenuOpen(false) }}
                  className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-all w-fit"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
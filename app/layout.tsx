import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Utsavya — Event Planning & Financing',
  description: 'From intimate gatherings to grand celebrations — Utsavya plans unforgettable experiences tailored just for you. Book events and apply for event financing.',
  keywords: ['event planning', 'wedding planner', 'event financing', 'utsavya', 'celebration', 'India'],
  openGraph: {
    title: 'Utsavya — Extraordinary Experiences',
    description: 'All-in-one event management and financing platform for every celebration.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Utsavya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utsavya — Event Planning & Financing',
    description: 'Plan your dream event with Utsavya. Wedding, birthday, corporate events & more.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
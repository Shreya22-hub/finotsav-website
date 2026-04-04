import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/20">
              <Image src="/logo.png" alt="Utsavya Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Utsav<span className="text-yellow-500">ya</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Turning your special moments into extraordinary experiences. From intimate gatherings to grand celebrations across India.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 flex items-center justify-center transition-all duration-300 text-xs text-gray-400 hover:text-yellow-400">
              f
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 flex items-center justify-center transition-all duration-300 text-xs text-gray-400 hover:text-yellow-400">
              ig
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 flex items-center justify-center transition-all duration-300 text-xs text-gray-400 hover:text-yellow-400">
              in
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-yellow-500 mb-5 text-sm uppercase tracking-widest">Quick Links</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Services', href: '#services' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-yellow-500/50 group-hover:w-2 transition-all duration-200" />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/loan" className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-yellow-500/50 group-hover:w-2 transition-all duration-200" />
                Event Financing
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-yellow-500 mb-5 text-sm uppercase tracking-widest">Get In Touch</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">✉</span>
              hello@utsavya.in
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">☎</span>
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">⌖</span>
              New Delhi, India
            </li>
          </ul>
          <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-xs text-gray-500 mb-2">Mon–Sat, 10am–7pm IST</p>
            <a href="#contact" className="text-yellow-500 text-sm font-semibold hover:text-yellow-400 transition-colors">
              Book a Free Consultation →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-600 text-xs">
        <p>© {new Date().getFullYear()} Utsavya. All rights reserved.</p>
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  )
}

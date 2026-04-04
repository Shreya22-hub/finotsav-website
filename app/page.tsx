import Navbar from './Navbar'
import Services from './Services'
import Gallery from './Gallery'
import Testimonials from './Testimonials'
import Pricing from './Pricing'
import Contact from './Contact'
import Footer from './Footer'

const stats = [
  { value: '500+', label: 'Events Planned' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '6+', label: 'Years Experience' },
  { value: '50+', label: 'Expert Team' },
]

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        id="home"
        className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/3 rounded-full blur-3xl" />
          {/* Grid dots */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Badge */}
        <div className="animate-fadeIn delay-100 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-yellow-400 text-sm font-medium">India's Premier Event Planners</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fadeInUp delay-200 text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight max-w-4xl">
          Turning Your Special Moments Into{' '}
          <span className="gradient-text">Extraordinary Experiences</span>
        </h1>

        <p className="animate-fadeInUp delay-300 text-lg md:text-xl max-w-2xl mb-10 text-gray-400 leading-relaxed">
          From intimate gatherings to grand celebrations, we design unforgettable experiences tailored just for you.
        </p>

        {/* CTAs */}
        <div className="animate-fadeInUp delay-400 flex flex-col sm:flex-row gap-4 mb-16">
          <a href="#contact">
            <button className="bg-yellow-500 text-black px-8 py-3.5 rounded-full font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-200 shadow-xl shadow-yellow-500/30 text-sm">
              ✨ Plan Your Event
            </button>
          </a>
          <a href="#gallery">
            <button className="border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold hover:border-yellow-500/50 hover:bg-white/5 transition-all duration-200 text-sm">
              View Gallery →
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fadeIn delay-500 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300">
              <p className="text-2xl md:text-3xl font-bold text-yellow-500">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-40">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div id="services"><Services /></div>
      <div id="gallery"><Gallery /></div>
      <Testimonials />
      <div id="pricing"><Pricing /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  )
}
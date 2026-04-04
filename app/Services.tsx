const services = [
  {
    icon: '💍',
    name: 'Wedding Planning',
    desc: 'Fairy-tale weddings crafted with love, precision, and timeless elegance.',
    color: 'from-pink-500/10 to-rose-500/5',
    border: 'hover:border-pink-500/40',
  },
  {
    icon: '🏢',
    name: 'Corporate Events',
    desc: 'Professional events that leave lasting impressions and drive real results.',
    color: 'from-blue-500/10 to-indigo-500/5',
    border: 'hover:border-blue-500/40',
  },
  {
    icon: '🎂',
    name: 'Birthday Parties',
    desc: 'Birthday celebrations filled with joy, colour, and cherished memories.',
    color: 'from-purple-500/10 to-violet-500/5',
    border: 'hover:border-purple-500/40',
  },
  {
    icon: '🎨',
    name: 'Decoration & Styling',
    desc: 'Stunning visual transformations that turn any space into a masterpiece.',
    color: 'from-orange-500/10 to-amber-500/5',
    border: 'hover:border-orange-500/40',
  },
  {
    icon: '📸',
    name: 'Photography',
    desc: 'Capturing every precious moment beautifully for a lifetime of memories.',
    color: 'from-teal-500/10 to-emerald-500/5',
    border: 'hover:border-teal-500/40',
  },
  {
    icon: '🍽️',
    name: 'Catering',
    desc: 'Exquisite cuisines and impeccable service for every palate and occasion.',
    color: 'from-yellow-500/10 to-amber-500/5',
    border: 'hover:border-yellow-500/40',
  },
]

export default function Services() {
  return (
    <section className="py-24 px-6 md:px-10 bg-black text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Everything you need to create the perfect event — all under one roof.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <a
              href="#contact"
              key={i}
              className={`group relative border border-white/8 rounded-2xl p-7 transition-all duration-300 hover:scale-105 hover:-translate-y-1 block ${service.border} cursor-pointer`}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))`
              }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-200">
                {service.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
              {/* Hover arrow */}
              <div className="mt-4 text-yellow-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                Learn more <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
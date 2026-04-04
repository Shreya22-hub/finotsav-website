const plans = [
  {
    name: 'Basic',
    price: '₹25,000',
    desc: 'Perfect for intimate gatherings and small celebrations.',
    features: [
      'Events up to 50 guests',
      'Basic Decoration Package',
      '1 Professional Photographer',
      'Venue Coordination',
      'Email Support',
    ],
    highlight: false,
    badge: null,
  },
  {
    name: 'Premium',
    price: '₹75,000',
    desc: 'Our most popular choice for medium to large events.',
    features: [
      'Events up to 200 guests',
      'Advanced Decoration & Styling',
      'Photo + Video Coverage',
      'Catering Coordination',
      'Dedicated Event Manager',
      'Priority Support',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Luxury',
    price: '₹2,00,000',
    desc: 'The ultimate experience for grand celebrations.',
    features: [
      'Unlimited Guests',
      'Luxury Setup & Styling',
      'Full Photography & Videography',
      'Premium Catering Service',
      'Full Team Support',
      '24/7 Dedicated Manager',
    ],
    highlight: false,
    badge: null,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 px-6 md:px-10 bg-black text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Transparent pricing with no hidden fees. Choose the plan that fits your dream.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-yellow-500/15 to-yellow-500/5 border-2 border-yellow-500/60 shadow-2xl shadow-yellow-500/20'
                  : 'glass-card'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-yellow-500' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-gray-500 text-sm mb-5">{plan.desc}</p>

              <p className="text-4xl font-black mb-6 text-white">
                {plan.price}
                <span className="text-gray-600 text-base font-normal ml-1">onwards</span>
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-500 text-xs flex items-center justify-center flex-shrink-0">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact">
                <button className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/30 hover:scale-105'
                    : 'border border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'
                }`}>
                  Choose {plan.name} →
                </button>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          * Prices are starting estimates. Final quote depends on guest count, venue, and customizations.
        </p>
      </div>
    </section>
  )
}
const reviews = [
  {
    name: 'Aarav & Meera',
    role: 'Wedding Couple',
    text: 'They made our wedding absolutely magical. Every detail was perfectly planned — from the floral arrangements to the lighting. We couldn\'t have asked for more!',
    rating: 5,
    initials: 'AM',
  },
  {
    name: 'Rohan Sharma',
    role: 'Corporate Client',
    text: 'Best event planners we\'ve ever worked with! Highly professional, creative, and always one step ahead. Our annual conference was a huge success.',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'Priya Kapoor',
    role: 'Birthday Celebration',
    text: 'Our birthday event was absolutely शानदार! Loved every single detail — the décor, the food, the ambiance. Utsavya truly exceeded our expectations.',
    rating: 5,
    initials: 'PK',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-10 bg-black text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Don't just take our word for it — hear from the people who've celebrated with us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-7 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="text-yellow-500/30 text-5xl font-serif leading-none mb-2 select-none">"</div>

              <StarRating count={review.rating} />

              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-gray-600 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
import Image from 'next/image'

const images = [
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486', alt: 'Elegant Wedding Ceremony' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552', alt: 'Grand Wedding Reception' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485', alt: 'Beautiful Celebration' },
  { src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde', alt: 'Corporate Event' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc', alt: 'Party Decoration' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', alt: 'Special Occasion' },
]

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-10 bg-black text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Events <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            A glimpse into the beautiful moments we've helped create.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <Image
                src={`${img.src}?auto=format&fit=crop&w=600&q=80`}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white font-semibold text-sm">{img.alt}</p>
              </div>
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-yellow-500/0 group-hover:border-yellow-500/40 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
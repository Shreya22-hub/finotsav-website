const images = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1529636798458-92182e662485",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
];

export default function Gallery() {
  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      
      <h2 className="text-4xl font-bold mb-12">
        Our Events Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={src}
              alt="event"
              className="w-full h-64 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
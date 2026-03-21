const reviews = [
  {
    name: "Aarav & Meera",
    text: "They made our wedding absolutely magical. Everything was perfectly planned!",
  },
  {
    name: "Rohan Sharma",
    text: "Best event planners ever! Highly professional and creative.",
  },
  {
    name: "Priya Kapoor",
    text: "Our birthday event was शानदार! Loved every detail.",
  },
];

export default function Testimonials() {
  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      
      <h2 className="text-4xl font-bold mb-12">
        What Our Clients Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="border border-gray-700 p-8 rounded-xl hover:scale-105 transition duration-300"
          >
            <p className="text-gray-400 mb-4">
              "{review.text}"
            </p>

            <h3 className="text-yellow-500 font-semibold">
              {review.name}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}
const services = [
  "Wedding Planning",
  "Corporate Events",
  "Birthday Parties",
  "Decoration & Styling",
  "Photography",
  "Catering",
];

export default function Services() {
  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      
      <h2 className="text-4xl font-bold mb-12">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="border border-gray-700 p-8 rounded-xl hover:scale-105 hover:border-yellow-500 transition duration-300"
          >
            <h3 className="text-xl font-semibold">
              {service}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}
const plans = [
  {
    name: "Basic",
    price: "₹25,000",
    features: ["Small Events", "Basic Decoration", "1 Photographer"],
  },
  {
    name: "Premium",
    price: "₹75,000",
    features: ["Medium Events", "Advanced Decoration", "Photo + Video"],
  },
  {
    name: "Luxury",
    price: "₹2,00,000",
    features: ["Grand Events", "Luxury Setup", "Full Team Support"],
  },
];

export default function Pricing() {
  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      
      <h2 className="text-4xl font-bold mb-12">
        Our Packages
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="border border-gray-700 p-8 rounded-xl hover:scale-105 hover:border-yellow-500 transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-yellow-500">
              {plan.name}
            </h3>

            <p className="text-3xl font-bold mb-6">
              {plan.price}
            </p>

            <ul className="mb-6 space-y-2 text-gray-400">
              {plan.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>

            <button className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:scale-105 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
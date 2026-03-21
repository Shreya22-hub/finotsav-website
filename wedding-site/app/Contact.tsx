"use client";
export default function Contact() {
    const handleSubmit = async (e: any) => {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    email: e.target[1].value,
    date: e.target[2].value,
    message: e.target[3].value,
  };

  try {
    await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },   
      body: JSON.stringify(data),
    });

    alert("Booking Submitted Successfully!");
  } catch (error) {
    alert("Error submitting booking");
  }
};
  return (
    <div className="py-20 px-10 bg-black text-white text-center">
      
      <h2 className="text-4xl font-bold mb-12">
        Book Your Event
      </h2>
      
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <input
          type="date"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />
        <input
          type="number"
          placeholder="Your budget (₹)"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <textarea
          placeholder="Event Details"
          rows={4}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        ></textarea>

        <button className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:scale-105 transition">
          Submit
        </button>

      </form>

    </div>
  );
}
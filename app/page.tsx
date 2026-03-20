export default function Home() {
  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center text-center px-4">
      
      <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
        Turning Your Special Moments Into <br />
        Extraordinary Experiences
      </h1>

      <p className="text-lg max-w-2xl mb-8 text-gray-400 leading-relaxed">
        From intimate gatherings to grand celebrations, we design unforgettable experiences tailored just for you.
      </p>

      <button className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:scale-110 hover:shadow-lg transition duration-300 font-semibold">
        Plan Your Event
      </button>

    </div>
  );
}
import Navbar from "./Navbar";
import Services from "./Services";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Contact from "./Contact";

import Link from "next/link";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-b from-black via-black to-gray-900 text-white flex flex-col justify-center items-center text-center px-4 animate-fadeIn">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Turning Your Special Moments Into <br />
          Extraordinary Experiences
        </h1>

        <p className="text-lg max-w-2xl mb-8 text-gray-400 leading-relaxed">
          From intimate gatherings to grand celebrations, we design unforgettable experiences tailored just for you.
        </p>
        

<Link href="/book">
  <button className="bg-yellow-500 text-black px-8 py-3 rounded-full">
    Plan Your Event
  </button>
</Link>

      </div>
      {/* SERVICES SECTION */}
      <Services />
      <Gallery />
      <Testimonials/>
      <Pricing />
      <Contact />
    </>
  );
}
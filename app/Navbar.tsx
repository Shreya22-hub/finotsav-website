export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-4 bg-black/30 backdrop-blur-md z-50">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-yellow-500">
        Finotsav
      </h1>

      {/* Menu */}
      <div className="hidden md:flex gap-8 text-sm">
        <a href="#" className="hover:text-yellow-400 transition">Home</a>
        <a href="#" className="hover:text-yellow-400 transition">Services</a>
        <a href="#" className="hover:text-yellow-400 transition">Gallery</a>
        <a href="#" className="hover:text-yellow-400 transition">Contact</a>
      </div>

    </div>
  );
}
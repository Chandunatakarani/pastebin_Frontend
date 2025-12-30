import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          Pastebin<span className="text-blue-400">Lite</span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm">
          <a href="/" className="hover:text-blue-400 transition">
            Create Paste
          </a>
          <Link
  to="/pastes"
  className="px-4 py-2 rounded-lg hover:text-blue-500"
>
  Past Pastes
</Link>
        </div>
      </div>
    </nav>
  );
}

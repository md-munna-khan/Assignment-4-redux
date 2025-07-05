
import { useState } from "react";
import { Link } from "react-router"; // Use react-router-dom
import logo from "./logo.jpg";
import { Menu, X } from "lucide-react"; // for hamburger & close icon

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded-full" />
          <span className="text-xl font-semibold text-gray-800">BookZone</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Drawer (left side) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8 object-cover rounded-full" />
            <span className="text-lg font-semibold text-gray-800">BookZone</span>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-4">
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}

// NavLinks Component
function NavLinks({ onClick }: { onClick?: () => void }) {
  const linkClass =
    "text-gray-700 hover:text-blue-600 transition font-medium";

  return (
    <>
      <Link to="/" onClick={onClick} className={linkClass}>
        Home
      </Link>
      <Link to="/books" onClick={onClick} className={linkClass}>
        All Books
      </Link>
      <Link to="/create-book" onClick={onClick} className={linkClass}>
        Add Book
      </Link>
      <Link to="/borrow-summary" onClick={onClick} className={linkClass}>
        Borrow Summary
      </Link>
    </>
  );
}

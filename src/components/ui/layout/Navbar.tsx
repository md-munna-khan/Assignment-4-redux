

import { Link } from "react-router";
import logo from "./logo.jpg";

export default function Navbar() {
  return (
    <nav className="bg-white mb-8 mt-4 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-25 object-cover rounded-full" />
        <span className="text-xl font-semibold text-gray-800">BookZone</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Home
        </Link>
        <Link
          to="/books"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          All Books
        </Link>
        <Link
          to="/create-book"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Add Book
        </Link>
        <Link
          to="/borrow-summary"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Borrow Summary
        </Link>
      </div>
    </nav>
  );
}

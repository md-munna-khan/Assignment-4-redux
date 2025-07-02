import React from "react";
import { Link } from "react-router";
import logo from "./logo.jpg";
export default function Navbar() {
  return (
    <div className="flex justify-between my-2">
      <div>
        <img className="w-50  " src={logo}></img>
      </div>
      <div className="flex gap-4 py-3 shadow-md ">
        <Link to="/">
          <button className="px-4 py-2 transition">
            Home
          </button>
        </Link>
        <Link to="/books">
          <button className="px-4 py-2 transition">
            Book
          </button>
        </Link>
        <Link to="/borrow-summary">
          <button className="px-4 py-2  transition">
            Borrow Summary
          </button>
        </Link>
      </div>
    </div>
  );
}

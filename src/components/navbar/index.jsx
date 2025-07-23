import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CartIcon from "../cartIcon";
import Logo from "../logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />

        <ul className="hidden md:flex gap-x-6">
          {["/", "/about", "/contact", "/products"].map((path, index) => {
            const labels = ["Home", "About", "Contact", "Products"];
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 font-medium transition duration-200 ease-in-out ${
                      isActive
                        ? "border-b-2 border-yellow-500 text-gray-900 shadow-md rounded-md"
                        : "text-gray-700"
                    } hover:border-b-2 hover:border-yellow-500 hover:text-gray-900`
                  }
                >
                  {labels[index]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4">
          <CartIcon />
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-yellow-600 transition-colors duration-200 p-1"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-2 space-y-1">
          {["/", "/about", "/contact", "/products"].map((path, index) => {
            const labels = ["Home", "About", "Contact", "Products"];
            return (
              <NavLink
                key={index}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    isActive
                      ? "bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {labels[index]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

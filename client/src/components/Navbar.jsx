import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  const { username } = useSelector((state) => state.auth.username || {});
  const { loading } = useSelector((state) => state.auth.loading || {});

  useEffect(() => {
    if (!loading)
      if (username) {
        console.log("This is the username:", username);
        setUser(true);
      } else {
        console.log("Username not found");
        setUser(false);
      }
  }, [loading, username]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white p-4 absolute w-screen top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          Blog
        </a>

        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
          {user ? (
            <li>
              <a href="/logout" className="hover:text-gray-300">
                Log out
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:text-gray-300">
                Log in
              </a>
            </li>
          )}
        </ul>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul
          className={`md:hidden mt-4 space-y-2 px-4 transition-all duration-300 ease-out transform origin-top ${
            isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`}
        >
          <li>
            <a href="/about" className="block hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">
              Contact
            </a>
          </li>
          {user ? (
            <li>
              <a href="/logout" className="hover:text-gray-300">
                Log out
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:text-gray-300">
                Log in
              </a>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

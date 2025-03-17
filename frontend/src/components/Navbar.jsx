"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoPlaceholder from "../assets/logo-placeholder.png";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // untuk mendeteksi path aktif

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profil Desa", path: "/ProfilDesa" },
    { name: "Infografis", path: "/Infografis" },
    { name: "Pelayanan", path: "/Pelayanan" },
    { name: "Media", path: "/Media" },
    { name: "Arsip", path: "/Arsip" },
    { name: "Informasi", path: "/Information" },
  ];

  // Function to get color based on path
  const getPathColor = (path) => {
    switch (path) {
      case "/Pelayanan":
        return "#6CABCA"; // coral/orange
      case "/Media":
        return "#5DE1C4"; // turquoise
      case "/Arsip":
        return "#6CABCA"; // blue
      case "/":
        return "#6CABCA"; // blue
      default:
        return "#B9FF66"; // lime green
    }
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-white/80 shadow-md" : "bg-white/40"
      }`}
      style={{ fontFamily: "poppins" }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-3">
        <div
          className={`flex items-center justify-between ${
            isMenuOpen ? "hidden" : "flex"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logoPlaceholder || "/placeholder.svg?height=48&width=48"}
              alt="Logo Desa"
              className="h-10 md:h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h3 className="font-bold text-xs md:text-sm leading-tight text-gray-800">
                PEMERINTAH DESA BAHONTOBUNGKU <br />
                KABUPATEN MOROWALI
              </h3>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative pb-1 hover:text-gray-600 font-medium text-sm transition-colors ${
                  location.pathname === link.path
                    ? "text-black"
                    : "text-gray-700"
                }`}
              >
                {link.name}
                {/* Underline animation with dynamic color */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-transform duration-300 ${
                    location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                  style={{
                    backgroundColor:
                      location.pathname === link.path
                        ? getPathColor(link.path)
                        : "transparent",
                    width: "100%",
                  }}
                ></span>
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-[#B9FF66] hover:bg-opacity-90 text-gray-800 px-4 py-2 rounded-full text-sm font-bold transition-colors"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logoPlaceholder || "/placeholder.svg?height=40&width=40"}
                alt="Logo"
                className="h-10 w-auto"
              />
              <h3 className="font-bold text-xs leading-tight">
                PEMERINTAH DESA
                <br />
                BAHONTOBUNGKU
              </h3>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-gray-800 font-medium text-lg transition-colors`}
                onClick={toggleMenu}
                style={{
                  color:
                    location.pathname === link.path
                      ? getPathColor(link.path)
                      : "rgb(31, 41, 55)",
                }}
              >
                {link.name}
                {/* Underline for mobile with dynamic color */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-transform duration-300 ${
                    location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                  style={{
                    backgroundColor:
                      location.pathname === link.path
                        ? getPathColor(link.path)
                        : "transparent",
                    width: "100%",
                  }}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <Link
              to="/login"
              className="flex items-center justify-center w-full bg-gradient-to-r from-[#6CABCA] to-[#5DE1C4] hover:opacity-90 text-white px-5 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

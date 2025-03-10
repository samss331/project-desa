import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoPlaceholder from "../assets/logo-placeholder.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState({
    profilDesa: false,
    infografis: false,
    pelayanan: false,
    media: false,
    arsip: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle hanya dropdown yang diklik
    }));
  };

  return (
    <>
      <header
        className={`flex flex-wrap bg-white shadow-md top-0 z-30 py-2 ${
          isMenuOpen ? "" : "sticky"
        }`}
      >
        <nav className="container flex justify-between mx-4 md:mx-auto md:justify-around items-center">
          <Link to="/">
            <div className="flex justify-center items-center space-x-2 md:space-x-4">
              <img src={logoPlaceholder} alt="Logo" className="h-14" />
              <h3 className="font-bold md:text-base text-xs">
                PEMERINTAH DESA BAHONTOBUNGKU <br />
                KABUPATEN MOROWALI
              </h3>
            </div>
          </Link>
          {/* Navbar List */}
          <NavbarList />
          {/* Burger Nav */}
          <BurgerNav />
        </nav>
      </header>
      {/* Aside Nav */}
      <AsideNav />
    </>
  );

  function NavbarList() {
    return (
      <>
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <Link
              to="/"
              className="relative flex items-center space-x-1 hover:text-gray-900 font-bold"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/ProfilDesa"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Profil Desa</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 1
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 2
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 3
                </a>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <Link
              to="/Infografis"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Infografis</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 1
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 2
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 3
                </a>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <Link
              to="#"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Pelayanan</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 1
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 2
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 3
                </a>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <Link
              to="#"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Media</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 1
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 2
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 3
                </a>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <Link
              to="#"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Arsip Surat</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 1
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 2
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Subitem 3
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div id="login" className="hidden p-2 pt-1 items-center md:flex">
          <Link
            to="/login"
            className="text-[#16BE27] items-center font-bold text-xl"
          >
            Login
          </Link>
        </div>
      </>
    );
  }

  function BurgerNav() {
    return (
      <div className="flex md:hidden">
        <button
          id="BurgerButton"
          className="block md:hidden"
          onClick={handleBurgerClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    );
  }

  function AsideNav() {
    return (
      <aside
        id="menuAside"
        className={`fixed left-0 w-full h-full bg-black/30 z-20 top-0 ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 h-full w-2/3 bg-white py-2 px-2">
          <li>
            <Link
              to="/"
              className="relative flex items-center space-x-1 hover:text-gray-900 font-bold"
            >
              Home
            </Link>
          </li>

          {/* Profil Desa */}
          <li className="relative">
            <div
              className="flex items-center space-x-1 hover:text-gray-200 cursor-pointer"
              onClick={() => toggleDropdown("profilDesa")}
            >
              <Link to="/ProfilDesa">Profil Desa</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {dropdownOpen.profilDesa && (
              <ul className="left-0 mt-2 w-48 text-gray-800 rounded-lg bg-white shadow-lg">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Visi & Misi
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Struktur Pemerintahan
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Peta Wilayah
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Infografis */}
          <li className="relative">
            <div
              className="flex items-center space-x-1 hover:text-gray-200 cursor-pointer"
              onClick={() => toggleDropdown("infografis")}
            >
              <Link to="/Infografis">Infografis</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {dropdownOpen.infografis && (
              <ul className="left-0 mt-2 w-48 text-gray-800 rounded-lg bg-white shadow-lg">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Data Statistik
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Laporan Tahunan
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Peta Infrastruktur
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Pelayanan */}
          <li className="relative">
            <div
              className="flex items-center space-x-1 hover:text-gray-200 cursor-pointer"
              onClick={() => toggleDropdown("pelayanan")}
            >
              <Link to="#">Pelayanan</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {dropdownOpen.pelayanan && (
              <ul className="left-0 mt-2 w-48 text-gray-800 rounded-lg bg-white shadow-lg">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Pembuatan KTP
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Pembuatan KK
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Surat Domisili
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Media */}
          <li className="relative">
            <div
              className="flex items-center space-x-1 hover:text-gray-200 cursor-pointer"
              onClick={() => toggleDropdown("media")}
            >
              <Link to="#">Media</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {dropdownOpen.media && (
              <ul className="left-0 mt-2 w-48 text-gray-800 rounded-lg bg-white shadow-lg">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Galeri Foto
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Video Dokumentasi
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Arsip */}
          <li className="relative">
            <div
              className="flex items-center space-x-1 hover:text-gray-200 cursor-pointer"
              onClick={() => toggleDropdown("arsip")}
            >
              <Link to="#">Arsip</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {dropdownOpen.arsip && (
              <ul className="left-0 mt-2 w-48 text-gray-800 rounded-lg bg-white shadow-lg">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Dokumen Penting
                  </a>
                </li>
              </ul>
            )}
          </li>

          <div id="login" className="p-2 pt-1">
            <Link to="/login" className="text-[#16BE27] font-bold md:text-xl">
              Login
            </Link>
          </div>
        </ul>
        <div
          id="close"
          className="absolute right-0 top-0 text-3xl pr-4 font-bold w-1/3 h-full text-end cursor-pointer"
          onClick={handleCloseClick}
        >
          x
        </div>
      </aside>
    );
  }
}

export default Navbar;

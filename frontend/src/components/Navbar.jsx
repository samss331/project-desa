import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logoPlaceholder from '../assets/logo-placeholder.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`flex flex-wrap bg-white shadow-md sticky top-0 z-10 py-2 ${isMenuOpen ? '' : 'sticky'}`}>
        <nav className="container flex justify-between mx-4 md:mx-auto md:justify-around items-center">
          <Link to="/">
            <div className="flex justify-center items-center space-x-2 md:space-x-4">
              <img src={logoPlaceholder} alt="Logo" className="h-14" />
              <h3 className="font-bold md:text-base text-sm">
                PEMERINTAH DESA DESAKU <br />
                KABUPATEN KABUPATENKU
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

  function NavbarList(){
    return (
      <>
      <ul className="hidden md:flex space-x-6 text-gray-700">
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/ProfilDesa">Profil Desa</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/pemerintahan-desa">Pemerintahan Desa</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/pelayanan">Pelayanan</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li><Link to="/apbdes" className="hover:text-gray-900">APBDes</Link></li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/media">Media</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li><Link to="/budaya-desa" className="hover:text-gray-900">Budaya Desa</Link></li>
            <li><Link to="/umkm-desa" className="hover:text-gray-900">UMKM Desa</Link></li>
          </ul>
          <div id="login" className="hidden p-2 pt-1 bg-[#1D2632] rounded-2xl items-center md:flex">
            <Link to="/login" className="text-[#16BE27] items-center font-bold text-xl">Login</Link>
          </div>
      </>
    )
  };

  function BurgerNav(){
    return(
      <div className="flex md:hidden">
      <button id="BurgerButton" className="block md:hidden" onClick={handleBurgerClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
    )
  };

  function AsideNav(){
    return(
      <aside id="menuAside" className={`fixed left-0 w-full h-full bg-black bg-opacity-30 z-20 top-0 ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="flex flex-col h-full w-2/3 bg-white">
          <ul className="flex flex-col space-y-4 pl-8 pt-4">
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/profil-desa">Profil Desa</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/pemerintahan-desa">Pemerintahan Desa</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/pelayanan">Pelayanan</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li><Link to="/apbdes" className="hover:text-gray-900">APBDes</Link></li>
            <li className="relative flex items-center space-x-1 hover:text-gray-900">
              <Link to="/media">Media</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
            <div id="login" className="flex w-20 p-2 pt-1 bg-[#1D2632] rounded-2xl items-center ">
            <Link to="/login" className="text-[#16BE27] items-center font-bold text-xl">Login</Link>
          </div>
            </li>
          </ul>
          <div id="close" className="absolute right-0 top-0 text-3xl pr-4 font-bold w-1/3 h-full text-end cursor-pointer" onClick={handleCloseClick}>x</div>
        </div>
      </aside>
    )
  };
}

export default Navbar;
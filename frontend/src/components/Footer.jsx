import React from "react";
import logo from "../assets/logo-placeholder.png";
import Ios from "../assets/ios.png";
import Mobile from "../assets/mobile.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">

          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <img src={logo} alt="Logo" className="w-16 mb-4" />
            <p className="text-gray-400 text-center md:text-left">
              Website resmi PEMERINTAHAN DESA DESAKU Kabupaten Kabupatenku
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

         
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-lg font-bold">Socials</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>

         
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-lg font-bold">Situs Terkait</h4>
            <p className="text-gray-400">
              Jl. JalanKu No.99D, Desaku, Kec. Kecamatan, Kab. Kabupaten, Kota 0000
            </p>
            <p className="text-gray-400 mt-2">+0 0000000000</p>
            <p className="text-gray-400">gmailku@gmail.com</p>
          </div>

         
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h4 className="text-lg font-bold">Pelayanan Terpadu</h4>
            <p className="text-gray-400">SIDUMAS (Layanan Pengaduan Masyarakat)</p>
            <div className="flex justify-center md:justify-start mt-4 space-x-4">
              <a href="#">
                <img src={Ios} alt="Download on App Store" className="w-24" />
              </a>
              <a href="#">
                <img src={Mobile} alt="Get it on Google Play" className="w-24" />
              </a>
            </div>
          </div>
        </div>

     <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          Copyright &copy; 2025 Pemerintah Desa Desaku. All rights reserved.<br />
          <a href="#" className="text-gray-400 hover:text-white">Privacy & Policy</a> |
          <a href="#" className="text-gray-400 hover:text-white">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

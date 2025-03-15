import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "flowbite";
import { CalendarDots } from "@phosphor-icons/react";

const images = ["../../src/assets/berita1.jpg", "../../src/assets/berita2.jpg", "../../src/assets/berita3.jpg"];

const Informasi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <Navbar />
      <div className="my-4 md:mx-40">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left ">Informasi & Berita</h1>
            <p className="mt-2 text-gray-600 text-center md:text-left">Semua informasi dan berita tentang Desa Bahontobungku tersedia disini</p>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-lg w-full mx-auto">
            <div className="relative h-56 sm:h-64 md:h-96">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Slide ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
            {/* Slider controls */}
            <button onClick={prevSlide} className="absolute top-1/2 left-3 z-40 w-8 h-8 sm:w-10 sm:h-10 bg-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none transition">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-3 z-40 w-8 h-8 sm:w-10 sm:h-10 bg-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none transition">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold">Informasi Terkini</h1>
            <p className="text-sm font-light cursor-pointer hover:underline">Lebih banyak</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center mt-8">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="w-full sm:w-80 md:w-96 h-auto rounded-lg bg-green-700 shadow-xl p-4">
                  <h1 className="text-xl sm:text-2xl text-white font-bold">Pengumuman</h1>
                  <p className="text-white text-sm mt-2">Akan ada pemadaman listrik bergilir, warga dihimbau untuk bersiap-siap. informasi lebih lanjut silahkan tekan tombol "next".</p>
                  <button className="mt-2 flex items-center gap-1 text-gray-100 hover:gap-2 transition-all">
                    Next
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="#f1f1f1">
                      <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Berita Section */}
        <div className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold">Berita</h1>
            <div className="flex">
              <a href="#" className="mx-1 px-2 border text-gray-500 text-xs rounded-md">
                Previous
              </a>
              <a href="#" className="mx-1 px-2 border text-gray-700 text-xs hover:bg-blue-500 hover:text-white rounded-md">
                1
              </a>
              <a href="#" className="mx-1 px-2 border text-gray-700 text-xs hover:bg-blue-500 hover:text-white rounded-md">
                2
              </a>
              <a href="#" className="mx-1 px-2 border text-gray-700 text-xs hover:bg-blue-500 hover:text-white rounded-md">
                3
              </a>
              <a href="#" className="mx-1 px-2 border text-gray-700 text-xs hover:bg-blue-500 hover:text-white rounded-md">
                Next
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="w-full h-64 rounded-xl ">
                  <div className="relative">
                    <img className="w-full h-52 sm:h-52 object-cover rounded-2xl" src={`../../src/assets/berita${i + 1}.jpg`} alt="Image" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold">TP PKK Morowali Peringati Hari Kesatuan Gerak PKK</h3>
                    <p className="text-gray-700 flex items-center text-xs mt-1">
                      <CalendarDots size={18} /> 13-03-2025
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Informasi;

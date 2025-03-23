"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
/* eslint-enable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarouselVisiMisi from "../components/ProfilDesa/CarouselVisiMisi";
import CarouselAparatur from "../components/ProfilDesa/CarouselProfil";
import Bg from "../assets/Background.jpg";
import placeholder from "../assets/ph.jpg";

const images = [Bg, placeholder]; // Ganti dengan path gambar yang sesuai

export default function ProfilDesa() {
  return (
    <div>
      <Navbar />
      <InformasiWilayah />

      {/* Visi & Misi */}
      <CarouselVisiMisi id="VisiMisi" />

      {/* Perangkat Desa */}
      <CarouselAparatur />
      <Footer />
    </div>
  );

  function InformasiWilayah() {
    const [index, setIndex] = useState(0);
    const images = [Bg, placeholder];

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Ganti gambar setiap 5 detik
      return () => clearInterval(interval);
    }, []);

    return (
      <section className="relative h-[30rem] md:h-[49rem] overflow-hidden">
        {/* Slideshow Background */}
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 md:bg-black/30 flex flex-col justify-center text-white h-full"
          style={{ fontFamily: "poppins" }}
        >
          <div className="flex flex-col justify-center md:block md:w-1/2 mx-4 sm:mx-6 md:mx-[6rem] h-full md:mt-[10rem] space-y-3 md:space-y-10">
            <h1 className="text-[2rem] md:text-[5rem] font-bold leading-none">
              Informasi Wilayah
            </h1>

            {/* Deskripsi dengan breakpoint yang lebih baik */}
            <div className="text-sm sm:text-base md:text-xl space-y-2 md:space-y-4">
              <p className="md:w-[31rem] text-justify leading-relaxed">
                Secara Geografis Desa Bahontobungku terletak pada wilayah
                administrasi Kecamatan Bungku Tengah, dengan perkiraan titik
                kordinat berada pada:
              </p>

              {/* Koordinat dengan format yang lebih baik di mobile */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 md:w-[31rem]">
                <p className="bg-black/30 px-3 py-1 rounded-md inline-block">
                  <span className="font-medium">Bujur Timur:</span> 121° 956690"
                </p>
                <p className="bg-black/30 px-3 py-1 rounded-md inline-block">
                  <span className="font-medium">Lintang Selatan:</span>{" "}
                  -2,649603"
                </p>
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <Link
                to="/Map"
                className="inline-block bg-[#16BE27] text-lg md:text-2xl rounded-lg px-4 py-2 md:p-3 font-bold cursor-pointer text-gray-700 hover:bg-[#14a924] transition-colors"
                style={{ fontFamily: "poppins" }}
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

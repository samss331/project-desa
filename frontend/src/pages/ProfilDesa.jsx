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

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Ganti gambar setiap 6 detik
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
          className="absolute inset-0 bg-black/70 md:bg-black/30 flex flex-col justify-center text-white h-full text-xl"
          style={{ fontFamily: "poppins" }}
        >
          <div className="flex flex-col justify-center md:block md:w-1/2 mx-8 md:mx-[6rem] h-full md:mt-[10rem] space-y-2 md:space-y-10">
            <h1 className="text-[2rem] md:text-[5rem] font-bold leading-none">
              Informasi Wilayah
            </h1>
            <p className="md:w-[31rem] text-justify text-sm md:text-xl">
              Secara Geografis Desa Bahontobungku terletak pada wilayah
              administrasi Kecamatan Bungku Tengah, dengan perkiraan titik
              kordinat berada pada Bujur Timur : 〖121〗° 956690” Lintang
              Selatan : -2,649603”.
            </p>
            <div>
            <Link to = "/Map"
                className="bg-[#16BE27] text-lg md:text-2xl rounded-lg p-1 md:p-3 font-bold cursor-pointer md:w-fit text-gray-700"
                style={{ fontFamily: "poppins" }}
              >
                Liat Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

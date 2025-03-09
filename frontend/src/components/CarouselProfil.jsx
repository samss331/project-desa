"use client";

import { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
/* eslint-enable no-unused-vars */
import { ChevronLeft, ChevronRight } from "lucide-react";
import Pic from "../assets/dad.png";
import Pic2 from "../assets/download.png";

const aparatur = [
  {
    name: "John Doe",
    tugas: "Mengelola administrasi pemerintahan desa",
    image: Pic,
  },
  {
    name: "Jane Smith",
    tugas: "Mengatur keuangan desa dan anggaran",
    image: Pic2,
  },
  {
    name: "Michael Johnson",
    tugas: "Membantu pelayanan masyarakat desa",
    image: Pic,
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function CarouselAparatur() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [index, isHovered]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % aparatur.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + aparatur.length) % aparatur.length);
  };

  return (
    <div
      className="relative md:w-full md:max-w-7xl mx-4 md:mx-auto overflow-hidden pt-28"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[25rem]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="absolute inset-0 flex flex-col md:flex md:flex-row justify-center items-center text-center md:text-left bg-purple-700 text-white p-8 rounded-2xl"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold">{aparatur[index].name}</h2>
              <p>{aparatur[index].tugas}</p>
            </div>
            <img
              src={aparatur[index].image}
              alt={aparatur[index].name}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </AnimatePresence>
        {/* Indikator di dalam carousel */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {aparatur.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-white scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigasi */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform translate-y-1/2  p-2 rounded-full shadow-md"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform translate-y-1/2  p-2 rounded-full shadow-md"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

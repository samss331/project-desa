"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselVisiMisi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const slides = [
    {
      title: "Visi",
      text: "Bahontobungku Unggul, Masyarakat Sejahtera",
      description:
        "Mewujudkan desa yang unggul dengan masyarakat yang sejahtera melalui pembangunan berkelanjutan dan partisipatif.",
    },
    {
      title: "Misi",
      text: "Bahontobungku Unggul, Masyarakat Sejahtera",
      description:
        "Meningkatkan kualitas pelayanan publik, mengembangkan ekonomi lokal, dan memperkuat ketahanan sosial budaya masyarakat desa.",
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Visi dan Misi
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visi misi desa yang menjadi pedoman masyarakat dan pemerintah dalam
          tujuan memajukan desa Bahontobungku
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          {/* Slide Content */}
          <div
            className="relative bg-white rounded-2xl overflow-hidden"
            style={{ minHeight: "320px" }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-green-50"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-emerald-50"></div>

            {/* Content */}
            <div
              className={`p-10 md:p-12 transition-all duration-500 ease-in-out transform ${
                isAnimating
                  ? direction === "right"
                    ? "-translate-x-10 opacity-0"
                    : "translate-x-10 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="inline-block px-4 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-4">
                  {slides[currentIndex].title}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  {slides[currentIndex].text}
                </h3>

                <p className="text-gray-600 max-w-2xl text-center mb-8">
                  {slides[currentIndex].description}
                </p>

                <div className="flex items-center justify-center space-x-1 mt-auto">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index > currentIndex) {
                          setDirection("right");
                        } else if (index < currentIndex) {
                          setDirection("left");
                        }
                        setCurrentIndex(index);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-green-500 w-8"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-green-50 transition-colors border border-gray-100 text-gray-700"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-green-50 transition-colors border border-gray-100 text-gray-700"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Subtle Branding */}
      <div className="mt-8 text-sm text-gray-400 font-medium">
        Desa Bahontobungku
      </div>
    </section>
  );
};

export default CarouselVisiMisi;

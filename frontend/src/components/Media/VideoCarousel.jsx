import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VideoCarousel = ({ videos, autoplay = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return <div className="text-center text-gray-500 text-lg">Video tidak tersedia</div>;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <video
          src={videos[currentIndex]}
          controls
          autoPlay={autoplay}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Tombol Navigasi */}
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">
        <ChevronRight size={24} />
      </button>

      {/* Indikator */}
      <div className="flex justify-center mt-2 space-x-2">
        {videos.map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-400"}`} />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;

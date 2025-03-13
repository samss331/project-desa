import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Tambahkan impor ini
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageCarousel from "../components/Media/ImageCarousel";
import VideoCarousel from "../components/Media/VideoCarousel";

const mediaData = {
  2025: {
    images: ["/assets/image1.jpg", "/assets/image2.jpg"],
    videos: ["/assets/video1.mp4"],
  },
  2024: {
    images: ["/assets/image3.jpg"],
    videos: [],
  },
  2023: {
    images: [],
    videos: [],
  },
};

// ✅ Fungsi ExpandableSection yang sudah diperbaiki
function ExpandableSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mt-6 border rounded-lg shadow-lg overflow-hidden">
      {/* Header dengan tombol klik */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white border-b text-xl font-semibold hover:bg-gray-100"
      >
        {title}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {/* Konten (Hanya muncul saat terbuka) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] p-4" : "max-h-0"
        }`}
      >
        {isOpen && children}
      </div>
    </div>
  );
}

export default function Media() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const currentMedia = mediaData[selectedYear] || { images: [], videos: [] };

  return (
    <div className="flex flex-col bg-white items-center" style={{ fontFamily: "poppins" }}>
      <Navbar />
      <div className="min-h-screen w-full max-w-5xl flex flex-col items-center justify-center bg-white p-6 pt-16">
        <h1 className="text-[2.8rem] md:text-[7rem] w-5/6 md:w-9/12 font-extrabold md:font-black bg-gradient-to-b from-black to-gray-200 bg-clip-text text-transparent leading-tight py-4">
          Gallery <p>Digital Desa</p> 
        </h1>

        {/* Dropdown Pilihan Tahun */}
        <select
          className="mt-2 md:mt-6 border rounded-lg text-lg self-end md:mr-12"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          {Object.keys(mediaData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Foto (Expandable) */}
        <ExpandableSection title="Foto">
          {currentMedia.images.length > 0 ? (
            <ImageCarousel images={currentMedia.images} />
          ) : (
            <p className="text-gray-500 text-center mt-2">Gambar tidak tersedia</p>
          )}
        </ExpandableSection>

        {/* Video (Expandable) */}
        <ExpandableSection title="Video">
          {currentMedia.videos.length > 0 ? (
            <VideoCarousel videos={currentMedia.videos} autoplay={true} />
          ) : (
            <p className="text-gray-500 text-center mt-2">Video tidak tersedia</p>
          )}
        </ExpandableSection>
      </div>
      <Footer />
    </div>
  );
}

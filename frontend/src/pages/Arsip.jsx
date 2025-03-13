"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Added FileText icon
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PdfCarousel from "../components/Media/PdfCarousel"; // New PDF carousel component

// Updated media data to include PDFs
const mediaData = {
  2025: {
    pdfs: [
      { title: "Annual Report 2025", url: "/assets/report2025.pdf" },
      { title: "Project Documentation", url: "/assets/project2025.pdf" },
    ],
  },
  2024: {
    pdfs: [{ title: "Annual Report 2024", url: "/assets/report2024.pdf" }],
  },
  2023: {
    pdfs: [
      { title: "Annual Report 2023", url: "/assets/report2023.pdf" },
      { title: "Financial Statement", url: "/assets/financial2023.pdf" },
      { title: "Community Projects", url: "/assets/community2023.pdf" },
    ],
  },
};

function ExpandableSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mt-6 border rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white border-b text-xl font-semibold hover:bg-gray-100"
      >
        {title}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

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
  const currentMedia = mediaData[selectedYear] || { pdfs: [] };

  return (
    <div
      className="flex flex-col bg-white items-center"
      style={{ fontFamily: "poppins" }}
    >
      <Navbar />
      <div className="min-h-screen w-full max-w-5xl flex flex-col items-center justify-center bg-white p-6 pt-16">
        <h1 className="text-[2.8rem] md:text-[7rem] w-5/6 md:w-9/12 font-extrabold md:font-black bg-gradient-to-b from-black to-gray-200 bg-clip-text text-transparent leading-tight py-4">
          Arsip <p>Surat Desa</p>
        </h1>

        {/* Year Selection Dropdown */}
        <select
          className="mt-2 md:mt-6 border rounded-lg text-lg self-end md:mr-12 p-2"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          {Object.keys(mediaData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* PDF Documents (Expandable) */}
        <ExpandableSection title="Dokumen PDF">
          {currentMedia.pdfs && currentMedia.pdfs.length > 0 ? (
            <PdfCarousel pdfs={currentMedia.pdfs} />
          ) : (
            <p className="text-gray-500 text-center mt-2">
              Dokumen PDF tidak tersedia
            </p>
          )}
        </ExpandableSection>
      </div>
      <Footer />
    </div>
  );
}

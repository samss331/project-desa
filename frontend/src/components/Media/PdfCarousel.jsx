"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";

export default function PdfCarousel({ pdfs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingPdf, setViewingPdf] = useState(null);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? pdfs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === pdfs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const openPdf = (pdf) => {
    setViewingPdf(pdf);
  };

  const closePdf = () => {
    setViewingPdf(null);
  };

  // If there are no PDFs, don't render anything
  if (!pdfs || pdfs.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      {/* PDF Carousel */}
      <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-64 h-80 border rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
              index === currentIndex ? "scale-105 border-blue-500" : ""
            }`}
          >
            <div className="h-full flex flex-col">
              {/* PDF Card Header */}
              <div className="bg-gray-100 p-4 flex items-center justify-center h-48">
                <FileText size={64} className="text-gray-500" />
              </div>

              {/* PDF Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {pdf.title}
                </h3>
                <div className="mt-auto flex justify-between">
                  <button
                    onClick={() => openPdf(pdf)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={16} /> Buka
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {pdfs.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {pdfs.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {pdfs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">{viewingPdf.title}</h3>
              <button
                onClick={closePdf}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <iframe
                src={`${viewingPdf.url}#toolbar=1&navpanes=1`}
                className="w-full h-full"
                title={viewingPdf.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

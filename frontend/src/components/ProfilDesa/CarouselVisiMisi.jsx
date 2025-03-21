import { useState } from "react";

const CarouselVisiMisi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Visi",
      text: "Bahontobungku Unggul, Masyarakat Sejahtera",
    },
    {
      title: "Misi",
      text: "Bahontobungku Unggul, Masyarakat Sejahtera",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="container mx-auto px-6 mt-20 flex justify-center text-center z-20">
      <div>
        <h2 className="text-3xl font-bold">Visi Dan Misi</h2>
        <p>Visi misi desa yang menjadi pedoman masyarakat dan pemerintah dalam tujuan memajukan desa Bahontobungku</p>
        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mt-6 mx-auto">
          {/* Tombol Navigasi Kiri */}
          <button 
            onClick={prevSlide} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 px-4 rounded-full shadow-lg hover:bg-green-600"
          >
            ←
          </button>
          {/* Konten Carousel */}
          <div className="bg-white rounded-lg shadow-lg p-10 px-4 border-t-4 border-green-500 text-center">
            <h3 className="text-xl font-semibold">{slides[currentIndex].title}</h3>
            <p className="text-lg font-bold mt-2">{slides[currentIndex].text}</p>
            <p className="text-gray-500 mt-28">Bahontobungku</p>
            {/* Navigasi Titik */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}
                ></span>
              ))}
            </div>
          </div>
          {/* Tombol Navigasi Kanan */}
          <button 
            onClick={nextSlide} 
            className="absolute flex right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 px-4 rounded-full shadow-lg hover:bg-green-600"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselVisiMisi;

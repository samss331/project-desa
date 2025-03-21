import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bg from "../assets/Background.jpg";
import Pengumuman from "../components/Pengumuman";
import Card from "../components/CardTemlpate1";
import { BookOpen, Bell, Users, ClipboardList } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative">
        {" "}
        {/* Hero dibungkus relative agar pengumuman bisa absolute */}
        <HeroSection />
        <Pengumuman /> {/* Ditempel tepat di batas Hero */}
      </div>
      <InfoSection />
      <Footer />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section
      className="py-8 px-4 md:px-8 pt-24 pb-11"
      style={{ fontFamily: "Poppins" }}
    >
      <img src="../assets/berita2.jpg" />
      <div
        className="relative w-full max-w-9xl h-[40rem] md:h-[37rem] bg-cover bg-center rounded-3xl overflow-hidden mx-auto"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/30 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-[2rem] md:text-[5rem] font-bold">
            WEBSITE RESMI
          </h2>
          <p className="text-[1rem] md:text-[3rem] font-bold">
            DESA BAHONTOBUNGKU
          </p>
        </div>
      </div>
    </section>
  );
};

const InfoSection = () => {
  return (
    <div className="relative bg-white pt-20 md:pt-28 px-5">
      {" "}
      {/* Ditambah padding atas agar tidak tabrakan */}
      <div className="block md:flex w-full h-full md:h-[50rem] mx-auto text-center relative">
        {/* SVG Decoration */}
        <svg
          width="1100"
          height="600"
          viewBox="0 0 200 150"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden absolute inset-y-0 top-28 right-0 z-10 md:flex"
        >
          <path
            d="M0,40 A40,40 0 0,1 40,0 H200 V110 A40,40 0 0,1 160,150 H0 Z"
            fill="#F4F9FF"
          />
        </svg>
        {/* Cards */}
        <div className="flex flex-col w-full md:w-2/5 h-full justify-center md:pl-20 relative z-10 px-6">
          <h2 className="w-full md:w-3/4 text-3xl md:text-4xl font-bold text-gray-800 leading-12 text-left">
            Dapatkan Informasi Terbaru terkait desa
          </h2>
          <p className="text-gray-500 mt-3 text-justify md:text-left">
            We build readymade websites, mobile applications, and elaborate
            online business services.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-3/5 md:flex md:flex-row space-x-6 space-y-6 relative z-10">
          <div className="flex flex-col w-1/2 space-y-6 items-center pt-6 md:pt-20 mx-auto">
            <Card>
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <BookOpen
                  size={40}
                  strokeWidth={1}
                  className="p-4 mt-4 w-36 h-28 bg-blue-100 rounded-2xl"
                />
                <h3 className="text-xl font-semibold mt-3">Berita</h3>
                <p className="text-gray-500">
                  Baca berbagai berita terbaru tentang desa bahontobungku
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <Users
                  size={40}
                  strokeWidth={1}
                  className="p-4 mt-4 w-36 h-28 bg-yellow-100 rounded-2xl"
                />
                <h3 className="text-xl font-semibold mt-3">Aparatur</h3>
                <p className="text-gray-500">
                  Ketahui profil singkat dari para perangkat pemerintahan desa
                  bahontobungku
                </p>
              </div>
            </Card>
          </div>
          <div className="flex flex-col w-1/2 space-y-6 items-center">
            <Card>
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <Bell
                  size={40}
                  strokeWidth={1}
                  className="p-4 mt-4 w-36 h-28 bg-pink-100 rounded-2xl"
                />
                <h3 className="text-xl font-semibold mt-3">Pengumuman</h3>
                <p className="text-gray-500">
                  Informasi terkait pengumuman untuk masyarakat desa
                  bahontobungku
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <ClipboardList
                  size={40}
                  strokeWidth={1}
                  className="p-4 mt-4 w-36 h-28 bg-green-100 rounded-2xl"
                />
                <h3 className="text-xl font-semibold mt-3">Fasilitas</h3>
                <p className="text-gray-500">
                  Lihat data statistik terkait fasilitas yang ada di desa
                  bahontobungku
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

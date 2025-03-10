import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import chartIcon from "../assets/chart-1.png";

export default function Infografis() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ContentSection />
      <Footer />
    </div>
  );
}

// Hero Section khusus halaman Infografis
const HeroSection = () => {
  return (
    <section className="relative bg-white h-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      {/* BAGIAN KIRI - ICON */}
      <div className="flex justify-center md:justify-center">
        <img
          src={chartIcon}
          alt="Icon Infografis"
          className="w-94 h-94 object-contain"
        />
      </div>

      {/* BAGIAN KANAN - TEKS DAN TOMBOL */}
      <div className="text-center md:text-center max-w-lg">
        {/* JUDUL UTAMA */}
        <h2 className="text-4xl md:text-5xl font-bold leading-snug bg-gradient-to-t from-gray-600 to-gray-300 bg-clip-text text-transparent">
          Halaman ini menyajikan informasi <br />
          <span className="font-semibold">dalam bentuk visual infografis</span>
        </h2>

        {/* DESKRIPSI */}
        <p className="text-gray-600 text-lg mt-4">
          Ketahui berbagai informasi tentang desa Bahontobungku dengan tampilan
          yang menarik
        </p>
      </div>
    </section>
  );
};

// Bagian konten yang memuat tab kategori + konten infografis
const ContentSection = () => {
  const [activeTab, setActiveTab] = useState("penduduk");

  // Deskripsi sesuai tab
  const tabDescriptions = {
    penduduk:
      "Demografi Penduduk. Memberikan informasi lengkap mengenai karakteristik demografi penduduk desa bahontobungku",
    apbdes:
      "APBDes. Menampilkan informasi seputar Anggaran Pendapatan dan Belanja Desa Bahontobungku secara transparan",
    fasilitas:
      "Fasilitas Desa. Menampilkan informasi fasilitas umum yang tersedia di desa bahontobungku",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "penduduk":
        return (
          <div className="space-y-10">
            <CardSection title="Jumlah Penduduk Desa Bahontobungku" />
            <CardSection title="Statistik Berdasarkan Usia" />
            <CardSection title="Statistik Berdasarkan Pekerjaan" />
            <CardSection title="Statistik Berdasarkan Pendidikan" />
          </div>
        );
      case "apbdes":
        return (
          <div className="space-y-10">
            <CardSection title="Anggaran Pendapatan dan Belanja Desa (APBDes)" />
            <CardSection title="Realisasi Anggaran" />
          </div>
        );
      case "fasilitas":
        return (
          <div className="space-y-10">
            <CardSection title="Fasilitas Umum Desa Bahontobungku" />
            <CardSection title="Statistik Penggunaan Fasilitas" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-gray-100 py-10 px-5 md:px-20">
      {/* TAB KATEGORI ATAS DESKRIPSI */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["penduduk", "apbdes", "fasilitas"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border px-7 py-4 rounded-lg shadow-sm font-medium transition-all duration-300
              ${
                activeTab === tab
                  ? "bg-lime-300 text-black border-lime-300"
                  : "bg-white text-black border-gray-300 hover:bg-lime-200"
              }`}
          >
            {tab === "penduduk" && "Penduduk"}
            {tab === "apbdes" && "APBDes"}
            {tab === "fasilitas" && "Fasilitas"}
          </button>
        ))}
      </div>

      {/* DESKRIPSI DYNAMIC */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xl md:text-2xl text-gray-800">
          <span className="font-bold bg-yellow-200 px-1 rounded">
            {tabDescriptions[activeTab].split(".")[0]}.
          </span>{" "}
          {tabDescriptions[activeTab].split(".").slice(1).join(".")}
        </p>
      </div>

      {/* KONTEN KATEGORI */}
      {renderContent()}
    </section>
  );
};

// Reusable Card Section untuk masing-masing konten
const CardSection = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h4 className="text-xl font-semibold mb-4">{title}</h4>
    {/* Placeholder chart */}
    <div className="w-full h-[300px] bg-gray-200 rounded-lg flex justify-center items-center">
      <p className="text-gray-500">[Chart {title}]</p>
    </div>
  </div>
);

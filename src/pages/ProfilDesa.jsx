import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProfilDesa() {
  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[35rem] md:h-[45rem]"
        style={{ backgroundImage: "url('assets/rice-field-7890204_1920.jpg')" }}
      >
        <div className="inset-0 bg-black bg-opacity-70 md:bg-opacity-30 flex flex-col justify-center text-white h-full text-xl">
          <div className="block w-1/2 mx-[6rem] h-full mt-[10rem] space-y-10">
            <h1 className="text-[5rem] font-bold">Informasi Wilayah</h1>
            <p className="w-[31rem] text-justify">
              Secara Geografis Desa Bahontobungku terletak pada wilayah administrasi Kecamatan Bungku Tengah, dengan perkiraan titik kordinat berada pada Bujur Timur : 〖121〗^°  956690” Lintang Selatan : -2,649603”.
            </p>
            <div>
              <a className="bg-[#16BE27] rounded-lg p-3 text-black font-bold">
                Baca Selengkapnya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="container mx-auto px-6 mt-20 flex justify-center text-center">
        <div>
          <h2 className="text-3xl font-bold">Visi Dan Misi</h2>
          <p>Visi misi desa yang menjadi pedoman masyarakat dan pemerintah dalam tujuan memajukan desa bahontobungku</p>
          {/* Carousel Container */}
          <div className="relative w-full max-w-4xl mt-6 mx-auto">
            {/* Tombol Navigasi Kiri */}
            <button className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
              ←
            </button>
               {/* Konten Carousel */}
            <div className="bg-white rounded-lg shadow-lg p-10 px-4 border-t-4 border-green-500 text-center">
              <h3 className="text-xl font-semibold">Visi</h3>
              <p className="text-lg font-bold mt-2">Bahontobungku Unggul, Masyarakat Sejahtera</p>
              <p className="text-gray-500 mt-28">Bahontobungku</p>
              {/* Navigasi Titik */}
              <div className="flex justify-center mt-4 space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              </div>
            </div>
            {/* Tombol Navigasi Kanan */}
            <button className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
              →
            </button>
          </div>
        </div>
      </section>

      {/* Perangkat Desa */}
      <section className="container mx-auto pt-6 mt-28 flex justify-center text-center">
        <div className="bg-gray-800 text-white w-11/12 max-w-7xl p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-500 text-white py-2 px-4 rounded-lg mb-4">
            <span>→ Perangkat Desa</span>
          </div>
          {/* Judul */}
          <h2 className="text-2xl font-bold">Berikut adalah perangkat pemerintahan desa bahontobungku</h2>
          {/* Card */}
          <div className="flex flex-row gap-6 mt-6">
            {/* Card Anggota Desa */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 mt-6">
            {/* Card Anggota Desa */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/4">
              <img src="https://via.placeholder.com/150" alt="Foto Anggota" className="w-full h-32 object-cover" />
              <div className="bg-green-500 text-white p-3">
                <h3 className="font-bold">Yunus Ganteng</h3>
                <p className="text-sm text-black">Kepala Desa</p>
              </div>
            </div>
          </div>
          {/* Tombol Lebih Sedikit */}
          <div className="mt-6 text-sm text-gray-300 flex items-center space-x-2 cursor-pointer hover:text-white">
            <span>Lebih Sedikit</span>
            <span>🎵</span>
          </div>
        </div>
      </section>
          <Footer />
    </div>
  );
}
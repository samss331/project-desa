import React from "react";

const Fasilitas = () => {
  return (
    <div className="space-y-10">
      {/* Section Judul */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Daftar <span className="text-yellow-600">Fasilitas</span> Umum Desa
          Bahontobungku
        </h2>
        <p className="text-gray-600">
          Informasi lengkap fasilitas umum yang tersedia di desa
        </p>
      </section>

      {/* Grafik Lingkaran */}
      <section className="bg-white p-5 rounded-xl shadow-md flex justify-center items-center">
        {/* Placeholder Pie Chart */}
        <div className="bg-gray-100 w-60 h-60 rounded-full flex items-center justify-center">
          Pie Chart Fasilitas
        </div>
      </section>

      {/* Detail Fasilitas */}
      <section className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-bold mb-4">
          Detail Ketersediaan Fasilitas Umum Desa Bahontobungku
        </h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Fasilitas Kesehatan</span>
            <span className="font-bold">76,14%</span>
          </li>
          <li className="flex justify-between">
            <span>Fasilitas Pendidikan</span>
            <span className="font-bold">76,14%</span>
          </li>
          <li className="flex justify-between">
            <span>Fasilitas Ibadah</span>
            <span className="font-bold">76,14%</span>
          </li>
          <li className="flex justify-between">
            <span>Fasilitas Transportasi</span>
            <span className="font-bold">76,14%</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Fasilitas;

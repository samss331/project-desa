import React from "react";

export default function Penduduk() {
  return (
    <div className="space-y-8">
      {/* Judul Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Demografi Penduduk
        </h2>
        <p className="text-gray-600">
          Memberikan informasi lengkap mengenai karakteristik demografi penduduk
          desa Bahontobungku.
        </p>
      </div>

      {/* Card Statistik atau Grafik (dummy example) */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-xl text-gray-700">
          Jumlah Penduduk Desa Bahontobungku
        </h3>
        {/* Grafik Placeholder */}
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          Grafik akan ditampilkan di sini
        </div>
      </div>

      {/* Tambahkan card-card lain sesuai desain figma */}
    </div>
  );
}

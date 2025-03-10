import React from "react";

const APBDes = () => {
  return (
    <div className="space-y-10">
      {/* Section Judul */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          APB <span className="text-yellow-600">Desa</span> Bahontobungku
        </h2>
        <p className="text-gray-600">
          Informasi Anggaran Pendapatan dan Belanja Desa tahun 2023
        </p>
      </section>

      {/* Section Anggaran */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 rounded-xl shadow-md">
        <div>
          <p className="font-bold">Pendapatan</p>
          <p className="text-red-600 text-2xl font-semibold">
            Rp1.000.000.000,00
          </p>
        </div>
        <div>
          <p className="font-bold">Pengeluaran</p>
          <p className="text-red-600 text-2xl font-semibold">
            Rp1.000.000.000,00
          </p>
        </div>
        <div>
          <p className="font-bold">Pembiayaan</p>
          <p className="text-red-600 text-2xl font-semibold">
            Rp1.000.000.000,00
          </p>
        </div>
        <div>
          <p className="font-bold">Jumlah APBDes</p>
          <p className="text-red-600 text-2xl font-semibold">
            Rp1.000.000.000,00
          </p>
        </div>
      </section>

      {/* Grafik & Detail */}
      <section className="space-y-6">
        {/* Placeholder Grafik, nanti bisa diganti ChartJS / Recharts */}
        <div className="bg-white p-5 rounded-xl shadow-md h-72">
          Grafik Pengeluaran Desa Bahontobungku per Tahun
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md h-72">
          Detail Kegiatan Pembangunan Desa (2023)
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md h-72">
          Detail Kesehatan Masyarakat Desa (2023)
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md h-72">
          Detail Pendidikan Desa (2023)
        </div>
      </section>
    </div>
  );
};

export default APBDes;

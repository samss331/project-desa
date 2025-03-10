import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const APBDes = () => {
  // Data dummy untuk grafik

  const PendapatanBelanjaDesaChart = () => {
    const data = {
      labels: ["2023", "2024", "2025"], // Tahun yang ditampilkan
      datasets: [
        {
          label: "Pendapatan",
          data: [84.92, 69.13, 23.05], // Data pendapatan
          backgroundColor: "rgba(255, 206, 86, 0.7)", // Warna kuning
        },
        {
          label: "Pengeluaran",
          data: [50.93, 51.05, 73.24], // Data pengeluaran
          backgroundColor: "rgba(255, 99, 132, 0.7)", // Warna merah
        },
      ],
    };

    return (
      <div className="w-full max-w-3xl mx-auto"> {/* Set height using CSS class */}
        <Bar data={data}  options={{ responsive: true, maintainAspectRatio: false }} height={250} />
      </div>
    );
  };

  const PendapatanBulananChart = () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
        {
          label: "Pendapatan Desa",
          data: [26.79, 83.45, 63.09, 75.82, 92.29, 27.02, 43.63, 57.57, 84.84, 17.79, 80.07, 33.51],
          backgroundColor: "rgba(255, 206, 86, 0.7)", // Warna kuning
        },
      ],
    };

    return (
      <div className="w-full max-w-3xl mx-auto"> {/* Set height using CSS class */}
        <Bar data={data}  options={{ responsive: true, maintainAspectRatio: false }} height={250} />
      </div>
    );
  };

  const BelanjaBulananChart = () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
        {
          label: "Pengeluaran Desa",
          data: [26.79, 83.45, 63.09, 75.82, 92.29, 27.02, 43.63, 57.57, 64.84, 17.79, 80.07, 33.51],
          backgroundColor: "rgba(255, 99, 132, 0.7)", // Warna merah
        },
      ],
    };

    return (
      <div className="w-full max-w-3xl mx-auto"> {/* Set height using CSS class */}
        <Bar data={data}  options={{ responsive: true, maintainAspectRatio: false }} height={250} />
      </div>
    );
  };
  const Pembiayaan = () => {
    const data = {
      labels: ["Penerimaan", "Pengeluaran"],
      datasets: [
        {
          label: "Pembiayaan Desa",
          data: [750000000, 600000000], // Dummy data (dalam Rupiah)
          backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"], // Biru untuk penerimaan, merah untuk pengeluaran
        },
      ],
    };
  
    return (
      <div className="w-full max-w-3xl mx-auto">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Section Judul */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          APB <span className="text-yellow-300">Desa</span> Bahontobungku
        </h2>
        <p className="text-gray-600">Informasi Anggaran Pendapatan dan Belanja Desa tahun 2023</p>
      </section>

      {/* Section Anggaran */}
      <section className="flex flex-col md:grid md:grid-cols-2 md:gap-5 bg-white p-5 rounded-xl shadow-md space-y-6 md:space-y-0">
        {/* Pendapatan Naik */}
        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-gray-50">
          <div>
            <p className="font-semibold">Pendapatan</p>
            <p className="text-yellow-300 text-2xl font-bold">Rp1.000.000.000,00</p>
          </div>
          <ArrowUpCircle className="text-yellow-300" size={28} />
        </div>

        {/* Pendapatan Turun */}
        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-gray-50">
          <div>
            <p className="font-semibold">Pendapatan</p>
            <p className="text-red-500 text-2xl font-bold">Rp1.000.000.000,00</p>
          </div>
          <ArrowDownCircle className="text-red-500" size={28} />
        </div>

        {/* Pendapatan Naik Lagi */}
        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-gray-50">
          <div>
            <p className="font-semibold">Pendapatan</p>
            <p className="text-yellow-300 text-2xl font-bold">Rp1.000.000.000,00</p>
          </div>
          <ArrowUpCircle className="text-yellow-300" size={28} />
        </div>

        {/* Pendapatan Turun Lagi */}
        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-gray-50">
          <div>
            <p className="font-semibold">Pendapatan</p>
            <p className="text-red-500 text-2xl font-bold">Rp1.000.000.000,00</p>
          </div>
          <ArrowDownCircle className="text-red-500" size={28} />
        </div>

        {/* Surplus / Deposit */}
        <div className="col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-xl shadow-sm bg-gray-50">
          <p className="font-semibold">Surplus/Deposit</p>
          <p className="text-yellow-300 text-2xl font-bold">Rp1.000.000.000,00</p>
        </div>
      </section>

      {/* Grafik & Detail */}
      <section className="space-y-6">
        {/* Grafik menggunakan Chart.js */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-bold text-lg text-lime-700 mb-4 self-start">Grafik Pendapatan dan Pengeluaran Desa</h3>
          <PendapatanBelanjaDesaChart />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-bold text-lg text-lime-700 mb-4 self-start">Detail Informasi Pendapatan Desa Tahun 2025</h3>
          <PendapatanBulananChart />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-bold text-lg text-lime-700 mb-4 self-start">Detail Informasi Belanja Desa Tahun 2025</h3>
          <BelanjaBulananChart />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-bold text-lg text-lime-700 mb-4 self-start">Detail Informasi Pembiayaan Desa Tahun 2025</h3>
          <Pembiayaan/>
        </div>
      </section>
    </div>
  );
};

export default APBDes;
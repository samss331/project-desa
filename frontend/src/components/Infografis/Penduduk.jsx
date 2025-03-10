import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowUpRight } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Penduduk() {
  const totalPenduduk = 370; // Total keseluruhan penduduk (misal)

  // Data Chart Dummy
  const kelompokUmurData = {
    labels: ["0-14", "15-24", "25-54", "55-64", "65+"],
    datasets: [
      {
        label: "Laki-laki",
        data: [40, 25, 35, 20, 15],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Perempuan",
        data: [30, 20, 40, 15, 10],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const pendudukDusunData = {
    labels: ["Dusun 1", "Dusun 2", "Dusun 3"],
    datasets: [
      {
        data: [120, 150, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pekerjaanData = {
    labels: ["Petani", "Guru", "Pedagang", "PNS"],
    datasets: [
      {
        label: "Jumlah",
        data: [60, 20, 40, 10],
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
    ],
  };

  const keyakinanData = {
    labels: ["Islam", "Kristen", "Hindu", "Budha"],
    datasets: [
      {
        data: [200, 50, 10, 5],
        backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    <section className="space-y-10">
      {/* Deskripsi dan Kartu Total Penduduk */}
      <div>
        {/* Deskripsi */}
        <h2 className="text-xl font-bold mb-4">
          <span className="bg-yellow-300 px-1 rounded">
            Demografi Penduduk.
          </span>{" "}
          <span className="text-gray-700">
            Memberikan informasi lengkap mengenai karakteristik demografi
            penduduk desa bahontobungku
          </span>
        </h2>

        {/* Kartu */}
        <div className="bg-white rounded-3xl p-5">
          <h3 className="font-bold text-2xl text-center bg-lime-400 rounded-xl py-2 mb-6">
            Jumlah Penduduk desa bahontobungku
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["#60A5FA", "#F87171", "#34D399", "#FBBF24"].map((color, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md`}
                style={{ backgroundColor: color }}
              >
                {/* Content */}
                <div className="z-10 space-y-3">
                  <div className="bg-white inline-block px-3 py-1 rounded-lg text-sm font-semibold">
                    Total Penduduk
                  </div>
                  <div className="text-white font-bold text-2xl">
                    {totalPenduduk} orang
                  </div>
                  <button className="flex items-center gap-1 text-white hover:underline">
                    Detail Statistik <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* Background Illustration Placeholder */}
                <div className="absolute bottom-0 right-0 opacity-40">
                  <img
                    src="/assets/chart-1.png"
                    alt="Ilustrasi"
                    className="w-28 h-28 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 1 - Kelompok Umur */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text-lime-700 mb-4">
          Berdasarkan Kelompok Umur
        </h3>
        <div className="w-full max-w-4xl mx-auto">
          <Bar
            data={kelompokUmurData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={250}
          />
        </div>
        <p className="text-right italic text-gray-500 mt-2">Learn more</p>
      </div>

      {/* Chart 2 - Penduduk Dusun */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text-lime-700 mb-4">
          Berdasarkan Penduduk Dusun
        </h3>
        <div className="w-full max-w-3xl mx-auto">
          <Pie
            data={pendudukDusunData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={250}
          />
        </div>
        <p className="text-right italic text-gray-500 mt-2">Learn more</p>
      </div>

      {/* Chart 3 - Pekerjaan */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text-lime-700 mb-4">
          Berdasarkan Pekerjaan
        </h3>
        <div className="w-full max-w-4xl mx-auto">
          <Bar
            data={pekerjaanData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y",
            }}
            height={250}
          />
        </div>
        <p className="text-right italic text-gray-500 mt-2">Learn more</p>
      </div>

      {/* Chart 4 - Keyakinan */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text-lime-700 mb-4">
          Berdasarkan Keyakinan
        </h3>
        <div className="w-full max-w-3xl mx-auto">
          <Pie
            data={keyakinanData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={250}
          />
        </div>
        <p className="text-right italic text-gray-500 mt-2">Learn more</p>
      </div>
    </section>
  );
}

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Ilustrasi from "../../assets/Ilustrasi.png";
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
  // Data total untuk kartu (example static data)
  const infoCards = [
    { title: "Total Penduduk", count: 370, color: "#6CABCA" }, // Biru
    { title: "Kepala Keluarga", count: 120, color: "#FE7C66" }, // Merah
    { title: "Laki-laki", count: 180, color: "#5DE1C4" }, // Hijau
    { title: "Perempuan", count: 190, color: "#B9FF66" }, // Kuning
  ];

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
        backgroundColor: ["#B9FF66", "#FE7C66", "#5DE1C4", "#6CABCA"],
      },
    ],
  };

  return (
    <section className="relative space-y-10 z-10">
      {/* Deskripsi dan Kartu Total Penduduk */}
      <div>
        {/* Deskripsi */}
        <h2 className="text-lg md:text-2xl m-5 max-w-200">
          <span className="font-bold bg-yellow-300 px-1 rounded md:flex flex-col w-fit hidden">
            Demografi Penduduk.
          </span>
          <span
            className="text-gray-700 md:flex hidden"
            style={{ fontFamily: "poppins" }}
          >
            Memberikan informasi lengkap mengenai karakteristik demografi
            penduduk desa Bahontobungku.
          </span>
        </h2>

        {/* Kartu */}
        <div className="bg-white rounded-3xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infoCards.map((item, idx) => (
              <div
                key={idx}
                className={`
                  rounded-3xl
                  p-4
                  flex
                  flex-col
                  justify-between
                  relative
                  overflow-hidden
                  shadow-md
                  transition-all
                  duration-300
                  ease-in-out
                  border-2
                  border-black
                  hover:shadow-[5px_5px_0px_black]
                  hover:-translate-x-1
                  hover:-translate-y-1
                `}
                style={{ backgroundColor: item.color }}
              >
                {/* Content */}
                <div className="z-10 space-y-3">
                  <div
                    className="bg-white inline-block px-3 py-1 rounded-lg text-lg md:text-3xl font-semibold"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {item.title}
                  </div>
                  <div className="text-white font-bold text-2xl">
                    {item.count} orang
                  </div>
                  <button className="flex items-center gap-1 text-white hover:underline">
                    Detail Statistik <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* Background Illustration */}
                <div className="absolute top-0 right-0 opacity-40">
                  <img
                    src={Ilustrasi}
                    alt="Icon Infografis"
                    className="w-40 h-40 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 1 - Kelompok Umur */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3
          className="font-bold text-xl bg-yellow-300 px-1 rounded mb-4"
          style={{ fontFamily: "Poppins" }}
        >
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
        <h3
          className="font-bold text-xl bg-yellow-300 px-1 rounded mb-4"
          style={{ fontFamily: "Poppins" }}
        >
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
        <h3
          className="font-bold text-xl bg-yellow-300 px-1 rounded mb-4"
          style={{ fontFamily: "Poppins" }}
        >
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
        <h3
          className="font-bold text-xl bg-yellow-300 px-1 rounded mb-4"
          style={{ fontFamily: "Poppins" }}
        >
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

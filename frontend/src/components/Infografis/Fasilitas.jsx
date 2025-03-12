import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChevronDown, ChevronUp } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Fasilitas() {
  const [openDetail, setOpenDetail] = useState(null);

  const fasilitasSummary = {
    labels: ["Fasilitas Umum", "Fasilitas Kesehatan", "Fasilitas Industri"],
    datasets: [
      {
        data: [10, 6, 4],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const fasilitasDetail = {
    "Fasilitas Umum": [
      { name: "Sekolah", count: 5 },
      { name: "Lapangan", count: 3 },
      { name: "Pasar", count: 2 },
    ],
    "Fasilitas Kesehatan": [
      { name: "Rumah Sakit", count: 1 },
      { name: "Puskesmas", count: 2 },
      { name: "Posyandu", count: 3 },
    ],
    "Fasilitas Industri": [
      { name: "Pabrik", count: 2 },
      { name: "Gudang", count: 2 },
    ],
  };

  const toggleDetail = (category) => {
    setOpenDetail(openDetail === category ? null : category);
  };

  return (
    <section className="space-y-8" style={{ fontFamily: "poppins" }}>
      {/* PIE CHART */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text black mb-4">
          Persebaran Fasilitas di Desa Bahontobungku
        </h3>
        <div className="w-full max-w-3xl mx-auto">
          <Pie
            data={fasilitasSummary}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={250}
          />
        </div>
      </div>

      {/* DROPDOWN DETAIL */}
      {Object.keys(fasilitasDetail).map((category, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition-all"
        >
          {/* BUTTON HEADER */}
          <button
            onClick={() => toggleDetail(category)}
            className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center hover:text-lime-600"
          >
            <span>{category}</span>
            <span
              className={`transform transition-transform duration-300 ${
                openDetail === category ? "rotate-180" : "rotate-0"
              }`}
            >
              {openDetail === category ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>

          {/* DETAIL CONTENT */}
          {openDetail === category && (
            <div className="mt-4 grid gap-3">
              {fasilitasDetail[category].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-xl hover:bg-gray-200 transition"
                >
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-bold text-gray-800">{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Penduduk() {
  // Dummy data sementara
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
      {/* Chart 1 */}
      <div className="bg-white shadow-lg rounded-3xl p-5 border border-gray-300">
        <h3 className="font-bold text-xl text-lime-700 mb-4">
          Berdasarkan kelompok Umur
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

      {/* Chart 2 */}
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

      {/* Chart 3 */}
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

      {/* Chart 4 */}
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

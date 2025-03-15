import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Data Dummy per Tahun
const dataPerTahun = {
  2023: {
    pendapatan: [84.92, 69.13, 23.05],
    pengeluaran: [50.93, 51.05, 73.24],
    bulanan: [
      26.79, 83.45, 63.09, 75.82, 92.29, 27.02, 43.63, 57.57, 84.84, 17.79,
      80.07, 33.51,
    ],
    pembiayaan: [750000000, 600000000],
  },
  2024: {
    pendapatan: [90.12, 70.55, 30.67],
    pengeluaran: [55.93, 60.05, 80.24],
    bulanan: [
      30.79, 70.45, 66.09, 70.82, 85.29, 40.02, 50.63, 60.57, 70.84, 20.79,
      85.07, 40.51,
    ],
    pembiayaan: [800000000, 650000000],
  },
};

export default function APBDes() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const currentData = dataPerTahun[selectedYear];

  // Hitung total
  const totalPendapatan =
    currentData.pendapatan.reduce((a, b) => a + b, 0) * 10000000;
  const totalBelanja =
    currentData.pengeluaran.reduce((a, b) => a + b, 0) * 10000000;
  const surplusDefisit = totalPendapatan - totalBelanja;
  const pembiayaanNetto = currentData.pembiayaan[0] - currentData.pembiayaan[1];

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  return (
    <div className="relative space-y-10 z-10" style={{ fontFamily: "poppins" }}>
      {/* Header */}
      <section className="flex justify-between items-center space-y-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            APB <span className="text-yellow-300">Desa</span> Bahontobungku
          </h2>
          <p className="text-gray-600">
            Informasi Anggaran Pendapatan dan Belanja Desa tahun {selectedYear}
          </p>
        </div>

        {/* Dropdown Tahun */}
        <div>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border px-4 py-2 rounded-md shadow focus:outline-none"
          >
            {Object.keys(dataPerTahun).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 rounded-xl shadow-md">
        <InfoCard
          title="Pendapatan"
          amount={totalPendapatan}
          isIncrease={true}
        />
        <InfoCard title="Belanja" amount={totalBelanja} isIncrease={false} />
        <InfoCard
          title="Surplus/Defisit"
          amount={surplusDefisit}
          isIncrease={surplusDefisit >= 0}
        />
        <InfoCard
          title="Pembiayaan Netto"
          amount={pembiayaanNetto}
          isIncrease={pembiayaanNetto >= 0}
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartWithTitle title="Grafik Pendapatan vs Belanja Desa">
          <PendapatanBelanjaDesaChart data={currentData} />
        </ChartWithTitle>
        <ChartWithTitle title="Grafik Pendapatan Desa per Bulan">
          <PendapatanBulananChart data={currentData} />
        </ChartWithTitle>
        <ChartWithTitle title="Grafik Belanja Desa per Bulan">
          <BelanjaBulananChart data={currentData} />
        </ChartWithTitle>
        <ChartWithTitle title="Grafik Pembiayaan Desa">
          <PembiayaanChart data={currentData} />
        </ChartWithTitle>
      </section>
    </div>
  );
}

// ========================== COMPONENTS =============================

const InfoCard = ({ title, amount, isIncrease }) => (
  <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 hover:shadow-[5px_5px_0px_black] hover:-translate-x-1 hover:-translate-y-1 shadow-md transition-all duration-300 ease-in-out">
    <div>
      <p className="font-semibold">{title}</p>
      <p
        className={`${
          isIncrease ? "text-yellow-300" : "text-red-500"
        } text-2xl font-bold`}
      >
        {formatCurrency(amount)}
      </p>
    </div>
    {isIncrease ? (
      <ArrowUpCircle className="text-yellow-300" size={28} />
    ) : (
      <ArrowDownCircle className="text-red-500" size={28} />
    )}
  </div>
);

const ChartWithTitle = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-bold text-center">{title}</h3>
    {children}
  </div>
);

const formatCurrency = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

// ========================== CHARTS =============================

const PendapatanBelanjaDesaChart = ({ data }) => {
  const chartData = {
    labels: ["PAD", "Dana Desa", "Alokasi Dana Desa"],
    datasets: [
      {
        label: "Pendapatan",
        data: data.pendapatan,
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
      {
        label: "Pengeluaran",
        data: data.pengeluaran,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };
  return <Bar data={chartData} />;
};

const PendapatanBulananChart = ({ data }) => {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Pendapatan Desa",
        data: data.bulanan,
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
    ],
  };
  return <Bar data={chartData} />;
};

const BelanjaBulananChart = ({ data }) => {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Belanja Desa",
        data: data.bulanan.map((d) => d * 0.9),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };
  return <Bar data={chartData} />;
};

const PembiayaanChart = ({ data }) => {
  const chartData = {
    labels: ["Penerimaan Pembiayaan", "Pengeluaran Pembiayaan"],
    datasets: [
      {
        label: "Pembiayaan Desa",
        data: data.pembiayaan,
        backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };
  return <Bar data={chartData} />;
};

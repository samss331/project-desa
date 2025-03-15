"use client";

import { useState, useEffect } from "react";
import {
  FaEdit,
  FaSave,
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaPray,
  FaHome,
} from "react-icons/fa";

export default function Penduduk() {
  const [totalPenduduk, setTotalPenduduk] = useState([
    { kategori: "Laki-laki", total: 150 },
    { kategori: "Perempuan", total: 130 },
    { kategori: "Kepala Keluarga", total: 180 },
    { kategori: "Total Penduduk", total: 0 },
  ]);
  const [pendudukUsia, setPendudukUsia] = useState([
    { kategori: "0-17 Tahun", total: 80 },
    { kategori: "18-40 Tahun", total: 120 },
    { kategori: "41-65 Tahun", total: 60 },
    { kategori: "65+ Tahun", total: 20 },
  ]);
  const [pendudukPekerjaan, setPendudukPekerjaan] = useState([
    { kategori: "Pelajar", total: 90 },
    { kategori: "Petani", total: 50 },
    { kategori: "Pegawai", total: 70 },
    { kategori: "Wirausaha", total: 40 },
  ]);
  const [pendudukKeyakinan, setPendudukKeyakinan] = useState([
    { kategori: "Islam", total: 200 },
    { kategori: "Kristen", total: 30 },
    { kategori: "Hindu", total: 20 },
    { kategori: "Budha", total: 10 },
    { kategori: "Lainnya", total: 5 },
  ]);
  const [pendudukDusun, setPendudukDusun] = useState([
    { kategori: "Dusun 1", total: 110 },
    { kategori: "Dusun 2", total: 95 },
    { kategori: "Dusun 3", total: 75 },
  ]);

  const [editTP, setEditTP] = useState(null);
  const [editUsia, setEditUsia] = useState(null);
  const [editPekerjaan, setEditPekerjaan] = useState(null);
  const [editKeyakinan, setEditKeyakinan] = useState(null);
  const [editDusun, setEditDusun] = useState(null);

  // Auto update Total Penduduk
  useEffect(() => {
    const totalSum =
      totalPenduduk[0].total + totalPenduduk[1].total + totalPenduduk[2].total;
    setTotalPenduduk((prev) => {
      const updated = [...prev];
      updated[3].total = totalSum;
      return updated;
    });
  }, [totalPenduduk[0].total, totalPenduduk[1].total, totalPenduduk[2].total]);

  // Handle input change
  const handleChange = (idx, value, setFunc, data) => {
    const updated = [...data];
    updated[idx].total = Number(value);
    setFunc(updated);
  };

  // Get total for percentage calculations
  const getTotal = (data) => {
    return data.reduce((sum, item) => sum + item.total, 0);
  };

  // Render summary cards
  const renderSummaryCards = () => {
    const totalSum = totalPenduduk[3].total;
    const totalDusun = getTotal(pendudukDusun);

    const cards = [
      {
        title: "Total Penduduk",
        value: totalSum,
        icon: <FaUsers className="text-blue-500" size={24} />,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Kepala Keluarga",
        value: totalPenduduk[2].total,
        icon: <FaUserTie className="text-green-500" size={24} />,
        color: "from-green-500 to-green-600",
      },
      {
        title: "Total Dusun",
        value: pendudukDusun.length,
        icon: <FaHome className="text-indigo-500" size={24} />,
        color: "from-indigo-500 to-indigo-600",
      },
      {
        title: "Keyakinan Terbanyak",
        value: "Islam",
        icon: <FaPray className="text-orange-500" size={24} />,
        color: "from-orange-500 to-orange-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {card.value}
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl">{card.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render progress bar
  const renderProgressBar = (value, total) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  // Render reusable table
  const renderTable = (
    title,
    data,
    editIdx,
    setEditIdx,
    setFunc,
    autoTotal = false,
    icon
  ) => {
    const total = getTotal(data);

    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">{icon}</div>
            <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Kategori</th>
                  <th className="px-4 py-3 text-center font-medium">Total</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Persentase
                  </th>
                  <th className="px-4 py-3 text-center font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{row.kategori}</td>
                    <td className="px-4 py-3 text-center">
                      {autoTotal && idx === data.length - 1 ? (
                        <span className="text-blue-600 font-medium">
                          {row.total}
                        </span>
                      ) : editIdx === idx ? (
                        <input
                          type="number"
                          min="0"
                          value={row.total}
                          onChange={(e) =>
                            handleChange(idx, e.target.value, setFunc, data)
                          }
                          className="w-24 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                        />
                      ) : (
                        row.total
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {autoTotal && idx === data.length - 1 ? (
                        <span className="text-blue-600 font-medium">100%</span>
                      ) : (
                        <div>
                          <span className="text-gray-700">
                            {total > 0
                              ? ((row.total / total) * 100).toFixed(1)
                              : 0}
                            %
                          </span>
                          {renderProgressBar(row.total, total)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {autoTotal && idx === data.length - 1 ? (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                          Auto
                        </span>
                      ) : editIdx === idx ? (
                        <button
                          onClick={() => setEditIdx(null)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          title="Simpan"
                        >
                          <FaSave size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditIdx(idx)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Main return
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Data Kependudukan
        </h1>

        {renderSummaryCards()}

        <div className="mt-8 space-y-6">
          {renderTable(
            "Total Penduduk",
            totalPenduduk,
            editTP,
            setEditTP,
            setTotalPenduduk,
            true,
            <FaUsers className="text-blue-500" size={20} />
          )}

          {renderTable(
            "Jumlah Penduduk Berdasarkan Dusun",
            pendudukDusun,
            editDusun,
            setEditDusun,
            setPendudukDusun,
            false,
            <FaHome className="text-indigo-500" size={20} />
          )}

          {renderTable(
            "Jumlah Penduduk Berdasarkan Usia",
            pendudukUsia,
            editUsia,
            setEditUsia,
            setPendudukUsia,
            false,
            <FaUsers className="text-green-500" size={20} />
          )}

          {renderTable(
            "Jumlah Penduduk Berdasarkan Pekerjaan",
            pendudukPekerjaan,
            editPekerjaan,
            setEditPekerjaan,
            setPendudukPekerjaan,
            false,
            <FaBriefcase className="text-purple-500" size={20} />
          )}

          {renderTable(
            "Jumlah Penduduk Berdasarkan Keyakinan",
            pendudukKeyakinan,
            editKeyakinan,
            setEditKeyakinan,
            setPendudukKeyakinan,
            false,
            <FaPray className="text-orange-500" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  FaMoneyBillWave,
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function TabAPBDesAdmin() {
  // Available years
  const [dataAPBDes, setDataAPBDes] = useState([
    { id: 1, tahun: "2023", isExpanded: true },
    { id: 2, tahun: "2024", isExpanded: false },
  ]);

  // Monthly data
  const [dataBulanan, setDataBulanan] = useState([
    {
      id: 1,
      tahun: "2023",
      bulan: "Januari",
      pendapatan: "26.79",
      pengeluaran: "15.00",
      jenis: "Dana Desa",
    },
    {
      id: 2,
      tahun: "2023",
      bulan: "Februari",
      pendapatan: "24.50",
      pengeluaran: "18.30",
      jenis: "Pembangunan",
    },
    {
      id: 3,
      tahun: "2023",
      bulan: "Maret",
      pendapatan: "28.10",
      pengeluaran: "16.75",
      jenis: "Operasional",
    },
    {
      id: 4,
      tahun: "2023",
      bulan: "April",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 5,
      tahun: "2023",
      bulan: "Mei",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 6,
      tahun: "2023",
      bulan: "Juni",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 7,
      tahun: "2023",
      bulan: "Juli",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 8,
      tahun: "2023",
      bulan: "Agustus",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 9,
      tahun: "2023",
      bulan: "September",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 10,
      tahun: "2023",
      bulan: "Oktober",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 11,
      tahun: "2023",
      bulan: "November",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 12,
      tahun: "2023",
      bulan: "Desember",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 13,
      tahun: "2024",
      bulan: "Januari",
      pendapatan: "30.20",
      pengeluaran: "17.50",
      jenis: "Dana Desa",
    },
    {
      id: 14,
      tahun: "2024",
      bulan: "Februari",
      pendapatan: "29.80",
      pengeluaran: "19.40",
      jenis: "Infrastruktur",
    },
    {
      id: 15,
      tahun: "2024",
      bulan: "Maret",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 16,
      tahun: "2024",
      bulan: "April",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 17,
      tahun: "2024",
      bulan: "Mei",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 18,
      tahun: "2024",
      bulan: "Juni",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 19,
      tahun: "2024",
      bulan: "Juli",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 20,
      tahun: "2024",
      bulan: "Agustus",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 21,
      tahun: "2024",
      bulan: "September",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 22,
      tahun: "2024",
      bulan: "Oktober",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 23,
      tahun: "2024",
      bulan: "November",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
    {
      id: 24,
      tahun: "2024",
      bulan: "Desember",
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    },
  ]);

  // New year state
  const [newYear, setNewYear] = useState("");
  const [showNewYearInput, setShowNewYearInput] = useState(false);

  // Fixed months array
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Toggle year expansion
  const toggleYearExpansion = (id) => {
    setDataAPBDes((prev) =>
      prev.map((year) =>
        year.id === id ? { ...year, isExpanded: !year.isExpanded } : year
      )
    );
  };

  // Handle monthly data update
  const handleMonthlyDataUpdate = (id, field, value) => {
    setDataBulanan((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value === "" ? null : value }
          : item
      )
    );
  };

  // Add a new year with all months
  const addNewYear = () => {
    if (newYear.trim() === "") return;

    // Check if year already exists
    if (dataAPBDes.some((year) => year.tahun === newYear)) {
      alert("Tahun ini sudah ada!");
      return;
    }

    // Add to years list
    const newYearId = Date.now();
    setDataAPBDes([
      ...dataAPBDes,
      { id: newYearId, tahun: newYear, isExpanded: true },
    ]);

    // Add all months for the new year
    const newMonthsData = months.map((month, index) => ({
      id: newYearId + index + 1,
      tahun: newYear,
      bulan: month,
      pendapatan: null,
      pengeluaran: null,
      jenis: null,
    }));

    setDataBulanan([...dataBulanan, ...newMonthsData]);
    setNewYear("");
    setShowNewYearInput(false);
  };

  // Delete a year and its monthly data
  const deleteYear = (yearToDelete) => {
    if (
      confirm(`Apakah Anda yakin ingin menghapus data tahun ${yearToDelete}?`)
    ) {
      setDataAPBDes((prev) =>
        prev.filter((year) => year.tahun !== yearToDelete)
      );
      setDataBulanan((prev) =>
        prev.filter((item) => item.tahun !== yearToDelete)
      );
    }
  };

  // Calculate totals for a specific year
  const calculateYearTotals = (year) => {
    const yearData = dataBulanan.filter((item) => item.tahun === year);
    const totalPendapatan = yearData.reduce(
      (sum, item) =>
        sum + (item.pendapatan ? Number.parseFloat(item.pendapatan) : 0),
      0
    );
    const totalPengeluaran = yearData.reduce(
      (sum, item) =>
        sum + (item.pengeluaran ? Number.parseFloat(item.pengeluaran) : 0),
      0
    );

    return {
      pendapatan: totalPendapatan,
      pengeluaran: totalPengeluaran,
      saldo: totalPendapatan - totalPengeluaran,
    };
  };

  // Calculate overall totals for summary cards
  const calculateOverallTotals = () => {
    const totalPendapatan = dataBulanan.reduce(
      (sum, item) =>
        sum + (item.pendapatan ? Number.parseFloat(item.pendapatan) : 0),
      0
    );
    const totalPengeluaran = dataBulanan.reduce(
      (sum, item) =>
        sum + (item.pengeluaran ? Number.parseFloat(item.pengeluaran) : 0),
      0
    );

    return {
      pendapatan: totalPendapatan,
      pengeluaran: totalPengeluaran,
      saldo: totalPendapatan - totalPengeluaran,
    };
  };

  // Render summary cards
  const renderSummaryCards = () => {
    const { pendapatan, pengeluaran, saldo } = calculateOverallTotals();

    const cards = [
      {
        title: "Total Pendapatan",
        value: `${pendapatan.toFixed(2)} Juta`,
        icon: <FaArrowDown className="text-green-500" size={24} />,
        color: "from-green-500 to-green-600",
      },
      {
        title: "Total Pengeluaran",
        value: `${pengeluaran.toFixed(2)} Juta`,
        icon: <FaArrowUp className="text-red-500" size={24} />,
        color: "from-red-500 to-red-600",
      },
      {
        title: "Saldo",
        value: `${saldo.toFixed(2)} Juta`,
        icon: <FaMoneyBillWave className="text-blue-500" size={24} />,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Total Tahun",
        value: dataAPBDes.length,
        icon: <FaCalendarAlt className="text-purple-500" size={24} />,
        color: "from-purple-500 to-purple-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

  // Render years table
  const renderYearsTable = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-6">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <FaCalendarAlt className="text-yellow-500" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-xl text-gray-800">
              Data Tahun APBDes
            </h2>
            <p className="text-gray-500 text-sm">
              Daftar tahun anggaran yang tersedia.
            </p>
          </div>
        </div>

        <div className="mb-4">
          {showNewYearInput ? (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="Masukkan tahun (contoh: 2025)"
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button
                onClick={addNewYear}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setShowNewYearInput(false);
                  setNewYear("");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewYearInput(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
            >
              <FaPlus size={14} />
              <span>Tambah Tahun Baru</span>
            </button>
          )}
        </div>

        {dataAPBDes.map((year) => {
          const { pendapatan, pengeluaran, saldo } = calculateYearTotals(
            year.tahun
          );

          return (
            <div
              key={year.id}
              className="mb-6 border border-gray-200 rounded-xl overflow-hidden"
            >
              <div
                className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer"
                onClick={() => toggleYearExpansion(year.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <FaCalendarAlt className="text-yellow-500" size={16} />
                  </div>
                  <h3 className="font-semibold text-lg">Tahun {year.tahun}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-sm">
                      <span className="text-gray-500">Pendapatan:</span>
                      <span className="ml-2 font-medium text-green-600">
                        {pendapatan.toFixed(2)} Juta
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Pengeluaran:</span>
                      <span className="ml-2 font-medium text-red-600">
                        {pengeluaran.toFixed(2)} Juta
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Saldo:</span>
                      <span
                        className={`ml-2 font-medium ${
                          saldo >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {saldo.toFixed(2)} Juta
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteYear(year.tahun);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors"
                      title="Hapus Tahun"
                    >
                      <FaTrash size={14} />
                    </button>
                    {year.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
              </div>

              {year.isExpanded && (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-600">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left font-medium">#</th>
                          <th className="px-4 py-3 text-left font-medium">
                            Bulan
                          </th>
                          <th className="px-4 py-3 text-center font-medium">
                            Jenis
                          </th>
                          <th className="px-4 py-3 text-center font-medium">
                            Pendapatan (Juta)
                          </th>
                          <th className="px-4 py-3 text-center font-medium">
                            Pengeluaran (Juta)
                          </th>
                          <th className="px-4 py-3 text-center font-medium">
                            Saldo (Juta)
                          </th>
                          <th className="px-4 py-3 text-center font-medium">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataBulanan
                          .filter((item) => item.tahun === year.tahun)
                          .map((row, idx) => {
                            const pendapatan = row.pendapatan
                              ? Number.parseFloat(row.pendapatan)
                              : 0;
                            const pengeluaran = row.pengeluaran
                              ? Number.parseFloat(row.pengeluaran)
                              : 0;
                            const saldo = pendapatan - pengeluaran;

                            return (
                              <tr
                                key={row.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition"
                              >
                                <td className="px-4 py-3">{idx + 1}</td>
                                <td className="px-4 py-3 font-medium">
                                  {row.bulan}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <input
                                    type="text"
                                    value={row.jenis === null ? "" : row.jenis}
                                    onChange={(e) =>
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "jenis",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Opsional"
                                    className="w-32 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <input
                                    type="text"
                                    value={
                                      row.pendapatan === null
                                        ? ""
                                        : row.pendapatan
                                    }
                                    onChange={(e) =>
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "pendapatan",
                                        e.target.value
                                      )
                                    }
                                    placeholder="0.00"
                                    className="w-24 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <input
                                    type="text"
                                    value={
                                      row.pengeluaran === null
                                        ? ""
                                        : row.pengeluaran
                                    }
                                    onChange={(e) =>
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "pengeluaran",
                                        e.target.value
                                      )
                                    }
                                    placeholder="0.00"
                                    className="w-24 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                  />
                                </td>
                                <td
                                  className={`px-4 py-3 text-center font-medium ${
                                    saldo >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {saldo.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => {
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "pendapatan",
                                        null
                                      );
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "pengeluaran",
                                        null
                                      );
                                      handleMonthlyDataUpdate(
                                        row.id,
                                        "jenis",
                                        null
                                      );
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white p-1.5 rounded-lg transition-colors"
                                    title="Reset Data"
                                  >
                                    <FaTrash size={14} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 font-medium">
                          <td colSpan={3} className="px-4 py-3 text-right">
                            Total:
                          </td>
                          <td className="px-4 py-3 text-center text-green-600">
                            {pendapatan.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center text-red-600">
                            {pengeluaran.toFixed(2)}
                          </td>
                          <td
                            className={`px-4 py-3 text-center ${
                              saldo >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {saldo.toFixed(2)}
                          </td>
                          <td className="px-4 py-3"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSummaryCards()}
      {renderYearsTable()}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  FaFileAlt,
  FaEnvelopeOpen,
  FaEnvelope,
  FaDownload,
  FaEye,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Updated media data to include more details
const suratData = {
  2025: [
    {
      id: 1,
      judul: "Surat Keputusan Kepala Desa",
      jenis: "Surat Keluar",
      nomor: "SK/2025/001",
      tanggal: "2025-01-15",
      perihal: "Penetapan Anggaran Desa 2025",
      url: "/assets/report2025.pdf",
    },
    {
      id: 2,
      judul: "Surat Undangan Musyawarah Desa",
      jenis: "Surat Keluar",
      nomor: "SK/2025/002",
      tanggal: "2025-02-10",
      perihal: "Musyawarah Pembangunan Desa",
      url: "/assets/project2025.pdf",
    },
  ],
  2024: [
    {
      id: 3,
      judul: "Laporan Keuangan Tahunan",
      jenis: "Surat Keluar",
      nomor: "SK/2024/015",
      tanggal: "2024-12-20",
      perihal: "Laporan Keuangan Desa Tahun 2024",
      url: "/assets/report2024.pdf",
    },
    {
      id: 4,
      judul: "Surat Permohonan Bantuan",
      jenis: "Surat Masuk",
      nomor: "SM/2024/023",
      tanggal: "2024-10-05",
      perihal: "Permohonan Bantuan Bencana Alam",
      url: "/assets/bantuan2024.pdf",
    },
  ],
  2023: [
    {
      id: 5,
      judul: "Laporan Tahunan Desa",
      jenis: "Surat Keluar",
      nomor: "SK/2023/012",
      tanggal: "2023-12-15",
      perihal: "Laporan Tahunan Desa 2023",
      url: "/assets/report2023.pdf",
    },
    {
      id: 6,
      judul: "Laporan Keuangan Semester 2",
      jenis: "Surat Keluar",
      nomor: "SK/2023/010",
      tanggal: "2023-07-10",
      perihal: "Laporan Keuangan Semester 2 Tahun 2023",
      url: "/assets/financial2023.pdf",
    },
    {
      id: 7,
      judul: "Laporan Program Pemberdayaan",
      jenis: "Surat Keluar",
      nomor: "SK/2023/008",
      tanggal: "2023-05-22",
      perihal: "Laporan Program Pemberdayaan Masyarakat",
      url: "/assets/community2023.pdf",
    },
  ],
};

export default function ArsipSurat() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Get current year's data
  const currentYearData = suratData[selectedYear] || [];

  // Filter data based on active tab and search query
  const filteredData = currentYearData.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perihal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      (activeTab === "masuk" && item.jenis === "Surat Masuk") ||
      (activeTab === "keluar" && item.jenis === "Surat Keluar");

    return matchesSearch && matchesFilter;
  });

  // Count by type
  const countMasuk = currentYearData.filter(
    (item) => item.jenis === "Surat Masuk"
  ).length;
  const countKeluar = currentYearData.filter(
    (item) => item.jenis === "Surat Keluar"
  ).length;

  // Handle preview
  const handlePreview = (item) => {
    setCurrentItem(item);
    setShowPreviewModal(true);
  };

  // Get icon and color based on surat type
  const getSuratIcon = (type) => {
    if (type === "Surat Masuk") {
      return <FaEnvelopeOpen className="text-blue-500" />;
    } else {
      return <FaEnvelope className="text-green-500" />;
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pt-20">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              Arsip Surat Desa
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Akses dan unduh dokumen surat resmi desa untuk keperluan informasi
              dan transparansi publik
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Surat
                </h3>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaFileAlt className="text-purple-500 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {currentYearData.length}
              </div>
              <p className="text-sm text-gray-600">
                Surat tersedia tahun {selectedYear}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Surat Masuk
                </h3>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaEnvelopeOpen className="text-blue-500 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {countMasuk}
              </div>
              <p className="text-sm text-gray-600">Surat masuk tersedia</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Surat Keluar
                </h3>
                <div className="bg-green-100 p-2 rounded-lg">
                  <FaEnvelope className="text-green-500 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {countKeluar}
              </div>
              <p className="text-sm text-gray-600">Surat keluar tersedia</p>
            </div>
          </div>

          {/* Filter and Search */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              {/* Year Selection */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                <span className="text-gray-700 font-medium">Pilih Tahun:</span>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setSelectedYear(e.target.value)}
                  value={selectedYear}
                >
                  {Object.keys(suratData).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full md:w-64"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("semua")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "semua"
                    ? "bg-purple-500 text-white font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaFileAlt
                  className={
                    activeTab === "semua" ? "text-white" : "text-purple-500"
                  }
                />
                <span>Semua Surat</span>
              </button>
              <button
                onClick={() => setActiveTab("masuk")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "masuk"
                    ? "bg-blue-500 text-white font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaEnvelopeOpen
                  className={
                    activeTab === "masuk" ? "text-white" : "text-blue-500"
                  }
                />
                <span>Surat Masuk</span>
              </button>
              <button
                onClick={() => setActiveTab("keluar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "keluar"
                    ? "bg-green-500 text-white font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaEnvelope
                  className={
                    activeTab === "keluar" ? "text-white" : "text-green-500"
                  }
                />
                <span>Surat Keluar</span>
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Daftar Surat Tahun {selectedYear}
                </h2>
                <p className="text-gray-600 text-sm">
                  Akses dan unduh dokumen surat resmi desa
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-tl-lg">
                      No. Surat
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Jenis
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Judul
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Perihal
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 rounded-tr-lg">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((surat) => (
                      <tr key={surat.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                          {surat.nomor}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          <div className="flex items-center gap-2">
                            {getSuratIcon(surat.jenis)}
                            <span>{surat.jenis}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {surat.judul}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {new Date(surat.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {surat.perihal}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handlePreview(surat)}
                              className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                              title="Lihat Detail"
                            >
                              <FaEye className="text-blue-600" />
                            </button>
                            <a
                              href={surat.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                              title="Unduh"
                            >
                              <FaDownload className="text-purple-600" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        <FaFileAlt className="text-gray-300 text-5xl mx-auto mb-3" />
                        <p>Tidak ada surat yang ditemukan</p>
                        <p className="text-gray-400 text-sm">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {getSuratIcon(currentItem.jenis)} {currentItem.judul}
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Nomor Surat</p>
                  <p className="font-medium">{currentItem.nomor}</p>
                </div>
                <div>
                  <p className="text-gray-500">Jenis</p>
                  <p className="font-medium">{currentItem.jenis}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tanggal</p>
                  <p className="font-medium">
                    {new Date(currentItem.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Perihal</p>
                  <p className="font-medium">{currentItem.perihal}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Preview Dokumen
              </h4>
              <div className="bg-gray-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
                <iframe
                  src={currentItem.url}
                  className="w-full h-full"
                  title={currentItem.judul}
                >
                  Browser Anda tidak mendukung tampilan PDF.
                </iframe>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              <a
                href={currentItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <FaDownload className="text-white" />
                <span>Unduh Dokumen</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

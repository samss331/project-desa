"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

const SuratAdmin = () => {
  const [suratData, setSuratData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchSuratMasuk = async () => {
      try {
        const response = await axios.get("http://localhost:3000/surat/suratMasuk");
        console.log("Data surat masuk:", response.data);
        setSuratData(response.data.data || []); // Pastikan mengambil hanya array data
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError("Gagal memuat data surat masuk.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuratMasuk();
  }, []);

  // Filter data based on search query and active tab
  const filteredData = suratData.filter((item) => {
    const matchesSearch =
      item.perihal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorSurat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pengirim?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      item.jenis?.toLowerCase().includes(activeTab.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Count by type
  const countMasuk = suratData.filter(
    (item) => item.jenis === "Surat Masuk"
  ).length;
  const countKeluar = suratData.filter(
    (item) => item.jenis === "Surat Keluar"
  ).length;

  // Get icon based on surat type
  const getSuratIcon = (type) => {
    return type === "Surat Masuk" ? (
      <FaEnvelopeOpen className="text-blue-500" />
    ) : (
      <FaEnvelope className="text-green-500" />
    );
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Diterima":
        return "bg-green-100 text-green-800";
      case "Terkirim":
        return "bg-blue-100 text-blue-800";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Daftar Surat Masuk</h1>

      {/* Search Input */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari surat..."
          className="border p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="text-gray-500 ml-2 mt-2" />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 ${activeTab === "semua" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("semua")}
        >
          Semua ({suratData.length})
        </button>
        <button
          className={`p-2 ${activeTab === "Surat Masuk" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Surat Masuk")}
        >
          Surat Masuk ({countMasuk})
        </button>
        <button
          className={`p-2 ${activeTab === "Surat Keluar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Surat Keluar")}
        >
          Surat Keluar ({countKeluar})
        </button>
      </div>

      {/* Tampilkan Loading/Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Daftar Surat */}
      {!loading && !error && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Jenis</th>
              <th className="border p-2">Nomor</th>
              <th className="border p-2">Perihal</th>
              <th className="border p-2">Pengirim</th>
              <th className="border p-2">Tanggal</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((surat, index) => (
                <tr key={surat.id} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 flex items-center">
                    {getSuratIcon(surat.jenis)} {surat.jenis}
                  </td>
                  <td className="border p-2">{surat.nomorSurat}</td>
                  <td className="border p-2">{surat.perihal}</td>
                  <td className="border p-2">{surat.pengirim}</td>
                  <td className="border p-2">{surat.tanggalTerima}</td>
                  <td className={`border p-2 ${getStatusColor(surat.status)}`}>
                    {surat.status}
                  </td>
                  <td className="border p-2 flex space-x-2">
                    <button className="bg-yellow-500 text-white p-1 rounded">
                      <FaEye />
                    </button>
                    <button className="bg-blue-500 text-white p-1 rounded">
                      <FaEdit />
                    </button>
                    <button className="bg-red-500 text-white p-1 rounded">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border p-2 text-center">
                  Tidak ada surat masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuratAdmin;

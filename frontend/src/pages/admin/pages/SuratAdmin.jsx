"use client";

import { useState } from "react";
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
  // Sample data with more details
  const [suratData, setSuratData] = useState([
    {
      id: 1,
      jenis: "Surat Masuk",
      nomor: "SM/2024/001",
      perihal: "Undangan Rapat Koordinasi",
      pengirim: "Dinas Pendidikan",
      tanggal: "2024-02-01",
      status: "Diterima",
    },
    {
      id: 2,
      jenis: "Surat Keluar",
      nomor: "SK/2024/001",
      perihal: "Permohonan Kerjasama",
      pengirim: "Kepala Bagian",
      tanggal: "2024-02-05",
      status: "Terkirim",
    },
    {
      id: 3,
      jenis: "Surat Masuk",
      nomor: "SM/2024/002",
      perihal: "Pemberitahuan Kegiatan",
      pengirim: "Kementerian",
      tanggal: "2024-02-10",
      status: "Diproses",
    },
    {
      id: 4,
      jenis: "Surat Keluar",
      nomor: "SK/2024/002",
      perihal: "Laporan Bulanan",
      pengirim: "Sekretaris",
      tanggal: "2024-02-15",
      status: "Terkirim",
    },
    {
      id: 5,
      jenis: "Surat Masuk",
      nomor: "SM/2024/003",
      perihal: "Permintaan Data",
      pengirim: "BPS",
      tanggal: "2024-02-20",
      status: "Diterima",
    },
  ]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    jenis: "Surat Masuk",
    nomor: "",
    perihal: "",
    pengirim: "",
    tanggal: "",
    status: "Diterima",
  });

  // Filter data based on active tab and search query
  const filteredData = suratData.filter((item) => {
    const matchesSearch =
      item.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pengirim.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      item.jenis.toLowerCase().includes(activeTab.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Count by type
  const countMasuk = suratData.filter(
    (item) => item.jenis === "Surat Masuk"
  ).length;
  const countKeluar = suratData.filter(
    (item) => item.jenis === "Surat Keluar"
  ).length;

  // Handle actions
  const handleAdd = () => {
    setFormData({
      jenis: "Surat Masuk",
      nomor: "",
      perihal: "",
      pengirim: "",
      tanggal: new Date().toISOString().split("T")[0],
      status: "Diterima",
    });
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    const item = suratData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setFormData({
        jenis: item.jenis,
        nomor: item.nomor,
        perihal: item.perihal,
        pengirim: item.pengirim,
        tanggal: item.tanggal,
        status: item.status,
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = (id) => {
    const item = suratData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowDeleteModal(true);
    }
  };

  const handlePreview = (id) => {
    const item = suratData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowPreviewModal(true);
    }
  };

  const saveNewItem = () => {
    const newItem = {
      id: Math.max(...suratData.map((item) => item.id), 0) + 1,
      ...formData,
    };
    setSuratData([...suratData, newItem]);
    setShowAddModal(false);
  };

  const saveEditedItem = () => {
    const updatedData = suratData.map((item) =>
      item.id === currentItem.id ? { ...item, ...formData } : item
    );
    setSuratData(updatedData);
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    const updatedData = suratData.filter((item) => item.id !== currentItem.id);
    setSuratData(updatedData);
    setShowDeleteModal(false);
  };

  // Get icon and color based on surat type
  const getSuratIcon = (type) => {
    if (type === "Surat Masuk") {
      return <FaEnvelopeOpen className="text-blue-500" />;
    } else {
      return <FaEnvelope className="text-green-500" />;
    }
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <FaFileAlt className="text-purple-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Surat</h1>
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
              {suratData.length}
            </div>
            <p className="text-sm text-gray-600">Surat tersimpan</p>
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
            <p className="text-sm text-gray-600">Surat masuk tersimpan</p>
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
            <p className="text-sm text-gray-600">Surat keluar tersimpan</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
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

        {/* Surat Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Daftar Surat</h2>
              <p className="text-gray-600 text-sm">
                Kelola surat masuk dan keluar di sistem
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
                />
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <FaPlus className="text-white" />
                <span>Tambah Surat</span>
              </button>
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
                    Perihal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Pengirim
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
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
                        {surat.perihal}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {surat.pengirim}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {new Date(surat.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            surat.status
                          )}`}
                        >
                          {surat.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handlePreview(surat.id)}
                            className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                            title="Lihat Detail"
                          >
                            <FaEye className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(surat.id)}
                            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(surat.id)}
                            className="p-1.5 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                            title="Hapus"
                          >
                            <FaTrash className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Tidak ada data surat yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Tambah Surat Baru
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi surat yang akan ditambahkan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="jenis"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Jenis Surat
                </label>
                <select
                  id="jenis"
                  value={formData.jenis}
                  onChange={(e) =>
                    setFormData({ ...formData, jenis: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Surat Masuk">Surat Masuk</option>
                  <option value="Surat Keluar">Surat Keluar</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nomor Surat
                </label>
                <input
                  id="nomor"
                  type="text"
                  value={formData.nomor}
                  onChange={(e) =>
                    setFormData({ ...formData, nomor: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Contoh: SM/2024/001"
                />
              </div>

              <div>
                <label
                  htmlFor="perihal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Perihal
                </label>
                <input
                  id="perihal"
                  type="text"
                  value={formData.perihal}
                  onChange={(e) =>
                    setFormData({ ...formData, perihal: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Perihal surat"
                />
              </div>

              <div>
                <label
                  htmlFor="pengirim"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pengirim/Tujuan
                </label>
                <input
                  id="pengirim"
                  type="text"
                  value={formData.pengirim}
                  onChange={(e) =>
                    setFormData({ ...formData, pengirim: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Nama pengirim atau tujuan"
                />
              </div>

              <div>
                <label
                  htmlFor="tanggal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tanggal
                </label>
                <input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Diterima">Diterima</option>
                  <option value="Terkirim">Terkirim</option>
                  <option value="Diproses">Diproses</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="upload-file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Dokumen (Opsional)
                </label>
                <input
                  id="upload-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={saveNewItem}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Surat</h3>
              <p className="text-gray-600 text-sm">Ubah informasi surat</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="edit-jenis"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Jenis Surat
                </label>
                <select
                  id="edit-jenis"
                  value={formData.jenis}
                  onChange={(e) =>
                    setFormData({ ...formData, jenis: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Surat Masuk">Surat Masuk</option>
                  <option value="Surat Keluar">Surat Keluar</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-nomor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nomor Surat
                </label>
                <input
                  id="edit-nomor"
                  type="text"
                  value={formData.nomor}
                  onChange={(e) =>
                    setFormData({ ...formData, nomor: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-perihal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Perihal
                </label>
                <input
                  id="edit-perihal"
                  type="text"
                  value={formData.perihal}
                  onChange={(e) =>
                    setFormData({ ...formData, perihal: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-pengirim"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pengirim/Tujuan
                </label>
                <input
                  id="edit-pengirim"
                  type="text"
                  value={formData.pengirim}
                  onChange={(e) =>
                    setFormData({ ...formData, pengirim: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-tanggal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tanggal
                </label>
                <input
                  id="edit-tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Diterima">Diterima</option>
                  <option value="Terkirim">Terkirim</option>
                  <option value="Diproses">Diproses</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-upload-file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Dokumen Baru (Opsional)
                </label>
                <input
                  id="edit-upload-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={saveEditedItem}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Konfirmasi Hapus
              </h3>
              <p className="text-gray-600 text-sm">
                Apakah Anda yakin ingin menghapus surat "{currentItem?.nomor}"?
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {getSuratIcon(currentItem?.jenis)} {currentItem?.perihal}
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
                  <p className="font-medium">{currentItem?.nomor}</p>
                </div>
                <div>
                  <p className="text-gray-500">Jenis</p>
                  <p className="font-medium">{currentItem?.jenis}</p>
                </div>
                <div>
                  <p className="text-gray-500">Pengirim/Tujuan</p>
                  <p className="font-medium">{currentItem?.pengirim}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tanggal</p>
                  <p className="font-medium">{currentItem?.tanggal}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        currentItem?.status
                      )}`}
                    >
                      {currentItem?.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Isi Surat
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm">
                <p>Dokumen surat belum tersedia untuk ditampilkan.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <FaDownload className="text-white" />
                <span>Unduh Surat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuratAdmin;

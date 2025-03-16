"use client";

import { useState } from "react";
import {
  FaBullhorn,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaCheck,
  FaClock,
} from "react-icons/fa";

const PengumumanAdmin = () => {
  // Sample data with more details
  const [pengumumanData, setPengumumanData] = useState([
    {
      id: 1,
      judul: "Jadwal Pemadaman Listrik",
      kategori: "Informasi",
      tanggal: "2024-01-05",
      tanggalBerakhir: "2024-01-10",
      penulis: "Admin",
      status: "Aktif",
      isi: "Akan dilakukan pemadaman listrik pada tanggal 10 Januari 2024 pukul 09.00-12.00 WIB untuk perbaikan jaringan.",
      prioritas: "Tinggi",
    },
    {
      id: 2,
      judul: "Pengambilan Kartu Keluarga",
      kategori: "Layanan",
      tanggal: "2024-01-06",
      tanggalBerakhir: "2024-01-20",
      penulis: "Sekretaris",
      status: "Aktif",
      isi: "Pengambilan Kartu Keluarga dapat dilakukan pada jam kerja di kantor desa dengan membawa bukti pengajuan.",
      prioritas: "Sedang",
    },
    {
      id: 3,
      judul: "Jadwal Posyandu Bulan Januari",
      kategori: "Kesehatan",
      tanggal: "2024-01-10",
      tanggalBerakhir: "2024-01-31",
      penulis: "Admin",
      status: "Aktif",
      isi: "Posyandu akan dilaksanakan pada tanggal 15 Januari 2024 di Balai Desa mulai pukul 08.00 WIB.",
      prioritas: "Sedang",
    },
    {
      id: 4,
      judul: "Penutupan Jalan Desa",
      kategori: "Informasi",
      tanggal: "2024-01-15",
      tanggalBerakhir: "2024-01-18",
      penulis: "Admin",
      status: "Aktif",
      isi: "Jalan desa akan ditutup sementara untuk perbaikan jembatan pada tanggal 17-18 Januari 2024.",
      prioritas: "Tinggi",
    },
    {
      id: 5,
      judul: "Pengumuman Pemenang Lomba Desa",
      kategori: "Acara",
      tanggal: "2023-12-20",
      tanggalBerakhir: "2024-01-05",
      penulis: "Sekretaris",
      status: "Kadaluarsa",
      isi: "Pengumuman pemenang lomba desa telah diumumkan. Selamat kepada para pemenang!",
      prioritas: "Rendah",
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
    judul: "",
    kategori: "Informasi",
    tanggal: "",
    tanggalBerakhir: "",
    penulis: "",
    status: "Aktif",
    isi: "",
    prioritas: "Sedang",
  });

  // Filter data based on active tab and search query
  const filteredData = pengumumanData.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.isi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      (activeTab === "aktif" && item.status === "Aktif") ||
      (activeTab === "kadaluarsa" && item.status === "Kadaluarsa");

    return matchesSearch && matchesFilter;
  });

  // Count by status
  const countAktif = pengumumanData.filter(
    (item) => item.status === "Aktif"
  ).length;
  const countKadaluarsa = pengumumanData.filter(
    (item) => item.status === "Kadaluarsa"
  ).length;

  // Handle actions
  const handleAdd = () => {
    setFormData({
      judul: "",
      kategori: "Informasi",
      tanggal: new Date().toISOString().split("T")[0],
      tanggalBerakhir: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split("T")[0],
      penulis: "Admin",
      status: "Aktif",
      isi: "",
      prioritas: "Sedang",
    });
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    const item = pengumumanData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setFormData({
        judul: item.judul,
        kategori: item.kategori,
        tanggal: item.tanggal,
        tanggalBerakhir: item.tanggalBerakhir,
        penulis: item.penulis,
        status: item.status,
        isi: item.isi,
        prioritas: item.prioritas,
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = (id) => {
    const item = pengumumanData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowDeleteModal(true);
    }
  };

  const handlePreview = (id) => {
    const item = pengumumanData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowPreviewModal(true);
    }
  };

  const saveNewItem = () => {
    const newItem = {
      id: Math.max(...pengumumanData.map((item) => item.id), 0) + 1,
      ...formData,
    };
    setPengumumanData([...pengumumanData, newItem]);
    setShowAddModal(false);
  };

  const saveEditedItem = () => {
    const updatedData = pengumumanData.map((item) =>
      item.id === currentItem.id ? { ...item, ...formData } : item
    );
    setPengumumanData(updatedData);
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    const updatedData = pengumumanData.filter(
      (item) => item.id !== currentItem.id
    );
    setPengumumanData(updatedData);
    setShowDeleteModal(false);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Kadaluarsa":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Tinggi":
        return "bg-red-100 text-red-800";
      case "Sedang":
        return "bg-yellow-100 text-yellow-800";
      case "Rendah":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Informasi":
        return "bg-blue-100 text-blue-800";
      case "Layanan":
        return "bg-purple-100 text-purple-800";
      case "Kesehatan":
        return "bg-green-100 text-green-800";
      case "Acara":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <FaBullhorn className="text-purple-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Pengumuman
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Pengumuman
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaBullhorn className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {pengumumanData.length}
            </div>
            <p className="text-sm text-gray-600">Pengumuman tersimpan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Pengumuman Aktif
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaCheck className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countAktif}
            </div>
            <p className="text-sm text-gray-600">Pengumuman aktif</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Pengumuman Kadaluarsa
              </h3>
              <div className="bg-gray-100 p-2 rounded-lg">
                <FaClock className="text-gray-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countKadaluarsa}
            </div>
            <p className="text-sm text-gray-600">Pengumuman kadaluarsa</p>
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
              <FaBullhorn
                className={
                  activeTab === "semua" ? "text-white" : "text-purple-500"
                }
              />
              <span>Semua Pengumuman</span>
            </button>
            <button
              onClick={() => setActiveTab("aktif")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "aktif"
                  ? "bg-green-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaCheck
                className={
                  activeTab === "aktif" ? "text-white" : "text-green-500"
                }
              />
              <span>Aktif</span>
            </button>
            <button
              onClick={() => setActiveTab("kadaluarsa")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "kadaluarsa"
                  ? "bg-gray-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaClock
                className={
                  activeTab === "kadaluarsa" ? "text-white" : "text-gray-500"
                }
              />
              <span>Kadaluarsa</span>
            </button>
          </div>
        </div>

        {/* Pengumuman Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Daftar Pengumuman
              </h2>
              <p className="text-gray-600 text-sm">
                Kelola pengumuman dan informasi penting
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pengumuman..."
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
                <span>Tambah Pengumuman</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-tl-lg">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Judul
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Kategori
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Prioritas
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 rounded-tr-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((pengumuman) => (
                    <tr key={pengumuman.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {pengumuman.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {pengumuman.judul}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            pengumuman.kategori
                          )}`}
                        >
                          {pengumuman.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          {new Date(pengumuman.tanggal).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            pengumuman.status
                          )}`}
                        >
                          {pengumuman.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            pengumuman.prioritas
                          )}`}
                        >
                          {pengumuman.prioritas}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handlePreview(pengumuman.id)}
                            className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                            title="Lihat Detail"
                          >
                            <FaEye className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(pengumuman.id)}
                            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(pengumuman.id)}
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
                      Tidak ada data pengumuman yang ditemukan.
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
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Tambah Pengumuman Baru
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi pengumuman yang akan ditambahkan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="judul"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Pengumuman
                </label>
                <input
                  id="judul"
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Masukkan judul pengumuman"
                />
              </div>

              <div>
                <label
                  htmlFor="kategori"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kategori
                </label>
                <select
                  id="kategori"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Informasi">Informasi</option>
                  <option value="Layanan">Layanan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Acara">Acara</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tanggal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Mulai
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
                    htmlFor="tanggalBerakhir"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Berakhir
                  </label>
                  <input
                    id="tanggalBerakhir"
                    type="date"
                    value={formData.tanggalBerakhir}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tanggalBerakhir: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="penulis"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Penulis
                  </label>
                  <input
                    id="penulis"
                    type="text"
                    value={formData.penulis}
                    onChange={(e) =>
                      setFormData({ ...formData, penulis: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Nama penulis"
                  />
                </div>

                <div>
                  <label
                    htmlFor="prioritas"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prioritas
                  </label>
                  <select
                    id="prioritas"
                    value={formData.prioritas}
                    onChange={(e) =>
                      setFormData({ ...formData, prioritas: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
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
                  <option value="Aktif">Aktif</option>
                  <option value="Kadaluarsa">Kadaluarsa</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="isi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Isi Pengumuman
                </label>
                <textarea
                  id="isi"
                  value={formData.isi}
                  onChange={(e) =>
                    setFormData({ ...formData, isi: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[150px]"
                  placeholder="Isi pengumuman lengkap"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="upload-lampiran"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Lampiran (Opsional)
                </label>
                <input
                  id="upload-lampiran"
                  type="file"
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
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Edit Pengumuman
              </h3>
              <p className="text-gray-600 text-sm">Ubah informasi pengumuman</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="edit-judul"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Pengumuman
                </label>
                <input
                  id="edit-judul"
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-kategori"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kategori
                </label>
                <select
                  id="edit-kategori"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Informasi">Informasi</option>
                  <option value="Layanan">Layanan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Acara">Acara</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="edit-tanggal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Mulai
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
                    htmlFor="edit-tanggalBerakhir"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Berakhir
                  </label>
                  <input
                    id="edit-tanggalBerakhir"
                    type="date"
                    value={formData.tanggalBerakhir}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tanggalBerakhir: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="edit-penulis"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Penulis
                  </label>
                  <input
                    id="edit-penulis"
                    type="text"
                    value={formData.penulis}
                    onChange={(e) =>
                      setFormData({ ...formData, penulis: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-prioritas"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prioritas
                  </label>
                  <select
                    id="edit-prioritas"
                    value={formData.prioritas}
                    onChange={(e) =>
                      setFormData({ ...formData, prioritas: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
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
                  <option value="Aktif">Aktif</option>
                  <option value="Kadaluarsa">Kadaluarsa</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-isi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Isi Pengumuman
                </label>
                <textarea
                  id="edit-isi"
                  value={formData.isi}
                  onChange={(e) =>
                    setFormData({ ...formData, isi: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[150px]"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="edit-upload-lampiran"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Lampiran Baru (Opsional)
                </label>
                <input
                  id="edit-upload-lampiran"
                  type="file"
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
                Apakah Anda yakin ingin menghapus pengumuman "
                {currentItem?.judul}"? Tindakan ini tidak dapat dibatalkan.
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
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                <FaBullhorn className="inline-block mr-2 text-purple-500" />
                Detail Pengumuman
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

            <div className="mb-6">
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentItem?.judul}
                </h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      currentItem?.kategori
                    )}`}
                  >
                    <FaTag className="inline-block mr-1" />
                    {currentItem?.kategori}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      currentItem?.prioritas
                    )}`}
                  >
                    Prioritas: {currentItem?.prioritas}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      currentItem?.status
                    )}`}
                  >
                    {currentItem?.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Tanggal Mulai</p>
                    <p className="font-medium flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      {currentItem?.tanggal &&
                        new Date(currentItem.tanggal).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tanggal Berakhir</p>
                    <p className="font-medium flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      {currentItem?.tanggalBerakhir &&
                        new Date(
                          currentItem.tanggalBerakhir
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Penulis</p>
                    <p className="font-medium flex items-center gap-1">
                      <FaUser className="text-gray-400" />
                      {currentItem?.penulis}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Isi Pengumuman
                </h4>
                <div className="text-gray-700 whitespace-pre-line">
                  {currentItem?.isi}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              {currentItem?.status === "Kadaluarsa" && (
                <button
                  onClick={() => {
                    const updatedData = pengumumanData.map((item) =>
                      item.id === currentItem.id
                        ? { ...item, status: "Aktif" }
                        : item
                    );
                    setPengumumanData(updatedData);
                    setShowPreviewModal(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <FaCheck className="text-white" />
                  <span>Aktifkan Kembali</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengumumanAdmin;

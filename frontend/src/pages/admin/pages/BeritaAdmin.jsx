"use client";

import { useState } from "react";
import {
  FaNewspaper,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaTags,
} from "react-icons/fa";

const BeritaAdmin = () => {
  // Sample data with more details
  const [beritaData, setBeritaData] = useState([
    {
      id: 1,
      judul: "Pembangunan Jalan Desa Telah Selesai",
      kategori: "Infrastruktur",
      tanggal: "2024-01-01",
      penulis: "Admin",
      status: "Dipublikasi",
      ringkasan:
        "Pembangunan jalan desa yang telah dimulai sejak bulan lalu akhirnya selesai dan siap digunakan oleh warga.",
    },
    {
      id: 2,
      judul: "Kegiatan Posyandu Bulan Januari",
      kategori: "Kesehatan",
      tanggal: "2024-01-02",
      penulis: "Admin",
      status: "Dipublikasi",
      ringkasan:
        "Posyandu bulan Januari akan dilaksanakan pada tanggal 15 Januari 2024 di Balai Desa.",
    },
    {
      id: 3,
      judul: "Hasil Panen Padi Meningkat",
      kategori: "Pertanian",
      tanggal: "2024-01-10",
      penulis: "Sekretaris",
      status: "Dipublikasi",
      ringkasan:
        "Hasil panen padi di desa kita mengalami peningkatan sebesar 15% dibandingkan tahun lalu.",
    },
    {
      id: 4,
      judul: "Jadwal Vaksinasi Covid-19 Tahap 3",
      kategori: "Kesehatan",
      tanggal: "2024-01-15",
      penulis: "Admin",
      status: "Draft",
      ringkasan:
        "Vaksinasi Covid-19 tahap 3 akan dilaksanakan pada tanggal 25 Januari 2024 di Puskesmas Desa.",
    },
    {
      id: 5,
      judul: "Pelatihan Keterampilan Digital untuk Pemuda",
      kategori: "Pendidikan",
      tanggal: "2024-01-20",
      penulis: "Sekretaris",
      status: "Draft",
      ringkasan:
        "Pelatihan keterampilan digital untuk pemuda desa akan diadakan selama 3 hari mulai tanggal 1 Februari 2024.",
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
    kategori: "Umum",
    tanggal: "",
    penulis: "",
    status: "Draft",
    ringkasan: "",
    konten: "",
  });

  // Filter data based on active tab and search query
  const filteredData = beritaData.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.penulis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      (activeTab === "dipublikasi" && item.status === "Dipublikasi") ||
      (activeTab === "draft" && item.status === "Draft");

    return matchesSearch && matchesFilter;
  });

  // Count by status
  const countPublished = beritaData.filter(
    (item) => item.status === "Dipublikasi"
  ).length;
  const countDraft = beritaData.filter(
    (item) => item.status === "Draft"
  ).length;

  // Handle actions
  const handleAdd = () => {
    setFormData({
      judul: "",
      kategori: "Umum",
      tanggal: new Date().toISOString().split("T")[0],
      penulis: "Admin",
      status: "Draft",
      ringkasan: "",
      konten: "",
    });
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    const item = beritaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setFormData({
        judul: item.judul,
        kategori: item.kategori,
        tanggal: item.tanggal,
        penulis: item.penulis,
        status: item.status,
        ringkasan: item.ringkasan,
        konten: item.konten || "",
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = (id) => {
    const item = beritaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowDeleteModal(true);
    }
  };

  const handlePreview = (id) => {
    const item = beritaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowPreviewModal(true);
    }
  };

  const saveNewItem = () => {
    const newItem = {
      id: Math.max(...beritaData.map((item) => item.id), 0) + 1,
      ...formData,
    };
    setBeritaData([...beritaData, newItem]);
    setShowAddModal(false);
  };

  const saveEditedItem = () => {
    const updatedData = beritaData.map((item) =>
      item.id === currentItem.id ? { ...item, ...formData } : item
    );
    setBeritaData(updatedData);
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    const updatedData = beritaData.filter((item) => item.id !== currentItem.id);
    setBeritaData(updatedData);
    setShowDeleteModal(false);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Dipublikasi":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "kesehatan":
        return "bg-red-100 text-red-800";
      case "pendidikan":
        return "bg-blue-100 text-blue-800";
      case "infrastruktur":
        return "bg-orange-100 text-orange-800";
      case "pertanian":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <FaNewspaper className="text-purple-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Berita</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Berita
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaNewspaper className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {beritaData.length}
            </div>
            <p className="text-sm text-gray-600">Berita tersimpan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Dipublikasi
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaNewspaper className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countPublished}
            </div>
            <p className="text-sm text-gray-600">Berita dipublikasikan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Draft</h3>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaNewspaper className="text-yellow-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countDraft}
            </div>
            <p className="text-sm text-gray-600">Berita dalam draft</p>
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
              <FaNewspaper
                className={
                  activeTab === "semua" ? "text-white" : "text-purple-500"
                }
              />
              <span>Semua Berita</span>
            </button>
            <button
              onClick={() => setActiveTab("dipublikasi")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "dipublikasi"
                  ? "bg-green-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaNewspaper
                className={
                  activeTab === "dipublikasi" ? "text-white" : "text-green-500"
                }
              />
              <span>Dipublikasi</span>
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "draft"
                  ? "bg-yellow-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaNewspaper
                className={
                  activeTab === "draft" ? "text-white" : "text-yellow-500"
                }
              />
              <span>Draft</span>
            </button>
          </div>
        </div>

        {/* Berita Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Daftar Berita</h2>
              <p className="text-gray-600 text-sm">
                Kelola berita dan artikel website desa
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita..."
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
                <span>Tambah Berita</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-tl-lg">
                    Judul
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Kategori
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Penulis
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
                  filteredData.map((berita) => (
                    <tr key={berita.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {berita.judul}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            berita.kategori
                          )}`}
                        >
                          {berita.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          {new Date(berita.tanggal).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          {berita.penulis}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            berita.status
                          )}`}
                        >
                          {berita.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handlePreview(berita.id)}
                            className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                            title="Lihat Detail"
                          >
                            <FaEye className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(berita.id)}
                            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(berita.id)}
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
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Tidak ada data berita yang ditemukan.
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
                Tambah Berita Baru
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi berita yang akan ditambahkan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="judul"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Berita
                </label>
                <input
                  id="judul"
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Masukkan judul berita"
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
                  <option value="Umum">Umum</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Infrastruktur">Infrastruktur</option>
                  <option value="Pertanian">Pertanian</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="Draft">Draft</option>
                  <option value="Dipublikasi">Dipublikasi</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="ringkasan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ringkasan
                </label>
                <textarea
                  id="ringkasan"
                  value={formData.ringkasan}
                  onChange={(e) =>
                    setFormData({ ...formData, ringkasan: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[80px]"
                  placeholder="Ringkasan singkat berita"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="konten"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Konten Berita
                </label>
                <textarea
                  id="konten"
                  value={formData.konten}
                  onChange={(e) =>
                    setFormData({ ...formData, konten: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[200px]"
                  placeholder="Isi konten berita lengkap"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="upload-gambar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Gambar (Opsional)
                </label>
                <input
                  id="upload-gambar"
                  type="file"
                  accept="image/*"
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
              <h3 className="text-xl font-bold text-gray-800">Edit Berita</h3>
              <p className="text-gray-600 text-sm">Ubah informasi berita</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="edit-judul"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Berita
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
                  <option value="Umum">Umum</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Infrastruktur">Infrastruktur</option>
                  <option value="Pertanian">Pertanian</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="Draft">Draft</option>
                  <option value="Dipublikasi">Dipublikasi</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-ringkasan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ringkasan
                </label>
                <textarea
                  id="edit-ringkasan"
                  value={formData.ringkasan}
                  onChange={(e) =>
                    setFormData({ ...formData, ringkasan: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[80px]"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="edit-konten"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Konten Berita
                </label>
                <textarea
                  id="edit-konten"
                  value={formData.konten}
                  onChange={(e) =>
                    setFormData({ ...formData, konten: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[200px]"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="edit-upload-gambar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Gambar Baru (Opsional)
                </label>
                <input
                  id="edit-upload-gambar"
                  type="file"
                  accept="image/*"
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
                Apakah Anda yakin ingin menghapus berita "{currentItem?.judul}"?
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
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                <FaNewspaper className="inline-block mr-2 text-purple-500" />
                Preview Berita
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
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <FaNewspaper className="text-gray-300 text-5xl" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentItem?.judul}
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    currentItem?.kategori
                  )}`}
                >
                  <FaTags className="inline-block mr-1" />
                  {currentItem?.kategori}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <FaCalendarAlt className="inline-block mr-1" />
                  {currentItem?.tanggal &&
                    new Date(currentItem.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <FaUser className="inline-block mr-1" />
                  {currentItem?.penulis}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    currentItem?.status
                  )}`}
                >
                  {currentItem?.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 mb-4">
                <p className="font-medium">Ringkasan:</p>
                <p>{currentItem?.ringkasan}</p>
              </div>

              <div className="text-gray-700">
                <p className="font-medium mb-2">Konten Lengkap:</p>
                {currentItem?.konten ? (
                  <div className="prose max-w-none">{currentItem.konten}</div>
                ) : (
                  <p className="text-gray-500 italic">Konten belum tersedia.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              {currentItem?.status === "Draft" && (
                <button
                  onClick={() => {
                    const updatedData = beritaData.map((item) =>
                      item.id === currentItem.id
                        ? { ...item, status: "Dipublikasi" }
                        : item
                    );
                    setBeritaData(updatedData);
                    setShowPreviewModal(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <FaNewspaper className="text-white" />
                  <span>Publikasikan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeritaAdmin;

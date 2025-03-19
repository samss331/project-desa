"use client";

import { useState } from "react";
import {
  FaImage,
  FaVideo,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaChartBar,
} from "react-icons/fa";

const MediaAdmin = () => {
  // Expanded dummy data with more details
  const [mediaData, setMediaData] = useState([
    {
      id: 1,
      nama: "Foto Kegiatan Gotong Royong",
      tipe: "Foto",
      tanggal: "2023-05-15",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      nama: "Video Peresmian Balai Desa",
      tipe: "Video",
      tanggal: "2023-06-22",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      nama: "Dokumen Anggaran Desa 2023",
      tipe: "Dokumen",
      tanggal: "2023-04-10",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      nama: "Foto Kegiatan Posyandu",
      tipe: "Foto",
      tanggal: "2023-07-05",
      url: "/placeholder.svg?height=200&width=300",
    },
  ]);

  // State for active tab/filter
  const [activeTab, setActiveTab] = useState("semua");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    tipe: "Foto",
    tanggal: "",
    url: "",
  });

  // Filter data based on active tab
  const filteredData =
    activeTab === "semua"
      ? mediaData
      : mediaData.filter((item) => item.tipe.toLowerCase() === activeTab);

  // Count by type
  const countFoto = mediaData.filter((item) => item.tipe === "Foto").length;
  const countVideo = mediaData.filter((item) => item.tipe === "Video").length;
  const countDokumen = mediaData.filter(
    (item) => item.tipe === "Dokumen"
  ).length;

  // Handle actions
  const handleAdd = () => {
    setFormData({
      nama: "",
      tipe: "Foto",
      tanggal: new Date().toISOString().split("T")[0],
      url: "",
    });
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    const item = mediaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setFormData({
        nama: item.nama,
        tipe: item.tipe,
        tanggal: item.tanggal,
        url: item.url,
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = (id) => {
    const item = mediaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowDeleteModal(true);
    }
  };

  const handlePreview = (id) => {
    const item = mediaData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowPreviewModal(true);
    }
  };

  const saveNewItem = () => {
    const newItem = {
      id: Math.max(...mediaData.map((item) => item.id), 0) + 1,
      ...formData,
    };
    setMediaData([...mediaData, newItem]);
    setShowAddModal(false);
  };

  const saveEditedItem = () => {
    const updatedData = mediaData.map((item) =>
      item.id === currentItem.id ? { ...item, ...formData } : item
    );
    setMediaData(updatedData);
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    const updatedData = mediaData.filter((item) => item.id !== currentItem.id);
    setMediaData(updatedData);
    setShowDeleteModal(false);
  };

  // Get icon based on media type
  const getMediaIcon = (type) => {
    switch (type.toLowerCase()) {
      case "foto":
        return <FaImage className="text-blue-500" />;
      case "video":
        return <FaVideo className="text-red-500" />;
      case "dokumen":
        return <FaFileAlt className="text-yellow-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  // Table columns with actions
  const columns = ["ID", "Nama", "Tipe", "Tanggal", "Aksi"];

  // Prepare data for TableAdmin
  const tableData = filteredData.map((item) => ({
    ID: item.id,
    Nama: (
      <div className="flex items-center gap-2">
        {getMediaIcon(item.tipe)}
        <span>{item.nama}</span>
      </div>
    ),
    Tipe: item.tipe,
    Tanggal: item.tanggal,
    Aksi: (
      <div className="flex justify-end gap-2">
        <button
          onClick={() => handlePreview(item.id)}
          className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
          title="Pratinjau"
        >
          <FaEye className="text-blue-600" />
        </button>
        <button
          onClick={() => handleEdit(item.id)}
          className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          title="Edit"
        >
          <FaEdit className="text-gray-600" />
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="p-1.5 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
          title="Hapus"
        >
          <FaTrash className="text-red-600" />
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <FaChartBar className="text-purple-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Media</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Media
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaFileAlt className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mediaData.length}
            </div>
            <p className="text-sm text-gray-600">Item media tersimpan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Foto</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaImage className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countFoto}
            </div>
            <p className="text-sm text-gray-600">Foto tersimpan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Video</h3>
              <div className="bg-red-100 p-2 rounded-lg">
                <FaVideo className="text-red-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countVideo}
            </div>
            <p className="text-sm text-gray-600">Video tersimpan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Dokumen</h3>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaFileAlt className="text-yellow-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countDokumen}
            </div>
            <p className="text-sm text-gray-600">Dokumen tersimpan</p>
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
              <span>Semua Media</span>
            </button>
            <button
              onClick={() => setActiveTab("foto")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "foto"
                  ? "bg-blue-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaImage
                className={
                  activeTab === "foto" ? "text-white" : "text-blue-500"
                }
              />
              <span>Foto</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "video"
                  ? "bg-red-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaVideo
                className={
                  activeTab === "video" ? "text-white" : "text-red-500"
                }
              />
              <span>Video</span>
            </button>
            <button
              onClick={() => setActiveTab("dokumen")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "dokumen"
                  ? "bg-yellow-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaFileAlt
                className={
                  activeTab === "dokumen" ? "text-white" : "text-yellow-500"
                }
              />
              <span>Dokumen</span>
            </button>
          </div>
        </div>

        {/* Media Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Daftar Media</h2>
              <p className="text-gray-600 text-sm">
                Kelola media yang tersedia di website desa
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <FaPlus className="text-white" />
              <span>Tambah Media</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-tl-lg">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tipe
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 rounded-tr-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        {getMediaIcon(item.tipe)}
                        <span>{item.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.tipe}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.tanggal}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handlePreview(item.id)}
                          className="p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                          title="Pratinjau"
                        >
                          <FaEye className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                          title="Hapus"
                        >
                          <FaTrash className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                Tambah Media Baru
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi media yang akan ditambahkan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Media
                </label>
                <input
                  id="nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Nama media"
                />
              </div>

              <div>
                <label
                  htmlFor="tipe"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tipe Media
                </label>
                <select
                  id="tipe"
                  value={formData.tipe}
                  onChange={(e) =>
                    setFormData({ ...formData, tipe: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Foto">Foto</option>
                  <option value="Video">Video</option>
                  <option value="Dokumen">Dokumen</option>
                </select>
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
                  htmlFor="upload-file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Media
                </label>
                <input
                  id="upload-file"
                  type="file"
                  accept={
                    formData.tipe === "Foto"
                      ? "image/*"
                      : formData.tipe === "Video"
                      ? "video/*"
                      : ".pdf,.doc,.docx"
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Atau masukkan URL media di bawah:
                </p>
              </div>

              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  URL Media
                </label>
                <input
                  id="url"
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="URL media"
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
              <h3 className="text-xl font-bold text-gray-800">Edit Media</h3>
              <p className="text-gray-600 text-sm">
                Ubah informasi media atau upload media baru
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Nama Media */}
              <div>
                <label
                  htmlFor="edit-nama"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Media
                </label>
                <input
                  id="edit-nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Tipe Media */}
              <div>
                <label
                  htmlFor="edit-tipe"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tipe Media
                </label>
                <select
                  id="edit-tipe"
                  value={formData.tipe}
                  onChange={(e) =>
                    setFormData({ ...formData, tipe: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Foto">Foto</option>
                  <option value="Video">Video</option>
                  <option value="Dokumen">Dokumen</option>
                </select>
              </div>

              {/* Tanggal */}
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

              {/* URL Media */}
              <div>
                <label
                  htmlFor="edit-url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  URL Media (Opsional)
                </label>
                <input
                  id="edit-url"
                  type="text"
                  value={formData.url}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        url: e.target.value,
                        file: null,
                      }) // reset file jika isi URL
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com/media.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Isi jika ingin menggunakan URL. Kosongkan jika ingin upload
                  file.
                </p>
              </div>

              {/* Upload Media */}
              <div>
                <label
                  htmlFor="edit-file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Media (Opsional)
                </label>
                <input
                  id="edit-file"
                  type="file"
                  accept={
                    formData.tipe === "Foto"
                      ? "image/*"
                      : formData.tipe === "Video"
                      ? "video/*"
                      : ".pdf,.doc,.docx"
                  }
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        file: e.target.files[0],
                        url: "",
                      }) // reset URL jika pilih file
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Kosongkan jika menggunakan URL.
                </p>
              </div>
            </div>

            {/* Tombol Aksi */}
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
                Apakah Anda yakin ingin menghapus media "{currentItem?.nama}"?
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
                {getMediaIcon(currentItem?.tipe)} {currentItem?.nama}
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

            <div className="mb-4">
              {currentItem?.tipe === "Foto" && (
                <img
                  src={currentItem?.url || "/placeholder.svg"}
                  alt={currentItem?.nama}
                  className="w-full h-auto rounded-lg"
                />
              )}
              {currentItem?.tipe === "Video" && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaVideo className="text-red-500 text-5xl" />
                  <p className="text-gray-500 mt-4">Video Preview</p>
                </div>
              )}
              {currentItem?.tipe === "Dokumen" && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <FaFileAlt className="text-yellow-500 text-5xl" />
                  <p className="text-gray-500 mt-4">Dokumen Preview</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Tipe</p>
                <p className="font-medium">{currentItem?.tipe}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal</p>
                <p className="font-medium">{currentItem?.tanggal}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaAdmin;

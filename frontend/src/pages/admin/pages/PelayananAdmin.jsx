"use client";

import { useState } from "react";
import {
  FaLink,
  FaPlus,
  FaEdit,
  FaTrash,
  FaIdCard,
  FaUsers,
  FaFileAlt,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

const PelayananAdmin = () => {
  // Initial data for services
  const [layananData, setLayananData] = useState([
    {
      id: 1,
      nama: "Pembuatan KTP",
      kategori: "Dokumen Identitas",
      link: "https://forms.gle/example1",
      deskripsi: "Layanan pembuatan Kartu Tanda Penduduk baru atau penggantian",
    },
    {
      id: 2,
      nama: "Pembuatan Surat Pindah",
      kategori: "Kependudukan",
      link: "https://forms.gle/example2",
      deskripsi: "Layanan pembuatan surat keterangan pindah domisili",
    },
    {
      id: 3,
      nama: "Pembuatan Akta Kelahiran",
      kategori: "Pencatatan Sipil",
      link: "https://forms.gle/example3",
      deskripsi: "Layanan pembuatan akta kelahiran",
    },
    {
      id: 4,
      nama: "Pembuatan Akta Kematian",
      kategori: "Pencatatan Sipil",
      link: "https://forms.gle/example4",
      deskripsi: "Layanan pembuatan akta kematian",
    },
    {
      id: 5,
      nama: "Pembuatan Kartu Keluarga",
      kategori: "Dokumen Identitas",
      link: "https://forms.gle/example5",
      deskripsi: "Layanan pembuatan Kartu Keluarga baru",
    },
    {
      id: 6,
      nama: "Perubahan Data Kartu Keluarga",
      kategori: "Dokumen Identitas",
      link: "https://forms.gle/example6",
      deskripsi: "Layanan perubahan data pada Kartu Keluarga",
    },
    {
      id: 7,
      nama: "Pembuatan Surat Keterangan Domisili",
      kategori: "Kependudukan",
      link: "https://forms.gle/example7",
      deskripsi: "Layanan pembuatan surat keterangan domisili",
    },
  ]);

  // State for active tab/filter
  const [activeTab, setActiveTab] = useState("semua");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "Dokumen Identitas",
    link: "",
    deskripsi: "",
  });

  // Filter data based on active tab
  const filteredData =
    activeTab === "semua"
      ? layananData
      : layananData.filter((item) =>
          item.kategori.toLowerCase().includes(activeTab.toLowerCase())
        );

  // Count by category
  const countDokumenIdentitas = layananData.filter(
    (item) => item.kategori === "Dokumen Identitas"
  ).length;
  const countKependudukan = layananData.filter(
    (item) => item.kategori === "Kependudukan"
  ).length;
  const countPencatatanSipil = layananData.filter(
    (item) => item.kategori === "Pencatatan Sipil"
  ).length;

  // Handle actions
  const handleAdd = () => {
    setFormData({
      nama: "",
      kategori: "Dokumen Identitas",
      link: "",
      deskripsi: "",
    });
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    const item = layananData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setFormData({
        nama: item.nama,
        kategori: item.kategori,
        link: item.link,
        deskripsi: item.deskripsi,
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = (id) => {
    const item = layananData.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item);
      setShowDeleteModal(true);
    }
  };

  const saveNewItem = () => {
    const newItem = {
      id: Math.max(...layananData.map((item) => item.id), 0) + 1,
      ...formData,
    };
    setLayananData([...layananData, newItem]);
    setShowAddModal(false);
  };

  const saveEditedItem = () => {
    const updatedData = layananData.map((item) =>
      item.id === currentItem.id ? { ...item, ...formData } : item
    );
    setLayananData(updatedData);
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    const updatedData = layananData.filter(
      (item) => item.id !== currentItem.id
    );
    setLayananData(updatedData);
    setShowDeleteModal(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link berhasil disalin!");
  };

  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Dokumen Identitas":
        return <FaIdCard className="text-blue-500" />;
      case "Kependudukan":
        return <FaUsers className="text-green-500" />;
      case "Pencatatan Sipil":
        return <FaFileAlt className="text-purple-500" />;
      default:
        return <FaLink className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FaLink className="text-blue-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Pelayanan
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Layanan
              </h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaLink className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {layananData.length}
            </div>
            <p className="text-sm text-gray-600">Jenis layanan tersedia</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Dokumen Identitas
              </h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaIdCard className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countDokumenIdentitas}
            </div>
            <p className="text-sm text-gray-600">Layanan identitas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Kependudukan
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaUsers className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countKependudukan}
            </div>
            <p className="text-sm text-gray-600">Layanan kependudukan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Pencatatan Sipil
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaFileAlt className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {countPencatatanSipil}
            </div>
            <p className="text-sm text-gray-600">Layanan pencatatan sipil</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("semua")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "semua"
                  ? "bg-blue-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaLink
                className={
                  activeTab === "semua" ? "text-white" : "text-blue-500"
                }
              />
              <span>Semua Layanan</span>
            </button>
            <button
              onClick={() => setActiveTab("dokumen")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "dokumen"
                  ? "bg-blue-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaIdCard
                className={
                  activeTab === "dokumen" ? "text-white" : "text-blue-500"
                }
              />
              <span>Dokumen Identitas</span>
            </button>
            <button
              onClick={() => setActiveTab("kependudukan")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "kependudukan"
                  ? "bg-green-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaUsers
                className={
                  activeTab === "kependudukan" ? "text-white" : "text-green-500"
                }
              />
              <span>Kependudukan</span>
            </button>
            <button
              onClick={() => setActiveTab("pencatatan")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === "pencatatan"
                  ? "bg-purple-500 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaFileAlt
                className={
                  activeTab === "pencatatan" ? "text-white" : "text-purple-500"
                }
              />
              <span>Pencatatan Sipil</span>
            </button>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Daftar Layanan
              </h2>
              <p className="text-gray-600 text-sm">
                Kelola layanan administrasi desa yang tersedia untuk warga
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="text-white" />
              <span>Tambah Layanan</span>
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
                    Nama Layanan
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Kategori
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Link Google Form
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
                      <div className="flex flex-col">
                        <div className="font-medium">{item.nama}</div>
                        <div className="text-xs text-gray-500">
                          {item.deskripsi}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.kategori)}
                        <span>{item.kategori}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[200px]">
                          {item.link}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.link)}
                          className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                          title="Salin Link"
                        >
                          <FaCopy className="text-gray-600 text-xs" />
                        </button>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                          title="Buka Link"
                        >
                          <FaExternalLinkAlt className="text-blue-600 text-xs" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
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
                Tambah Layanan Baru
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi layanan yang akan ditambahkan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Layanan
                </label>
                <input
                  id="nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama layanan"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Dokumen Identitas">Dokumen Identitas</option>
                  <option value="Kependudukan">Kependudukan</option>
                  <option value="Pencatatan Sipil">Pencatatan Sipil</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link Google Form
                </label>
                <input
                  id="link"
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://forms.gle/example"
                />
              </div>
              <div>
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deskripsi singkat layanan"
                  rows={3}
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
              <h3 className="text-xl font-bold text-gray-800">Edit Layanan</h3>
              <p className="text-gray-600 text-sm">Ubah informasi layanan</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="edit-nama"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Layanan
                </label>
                <input
                  id="edit-nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Dokumen Identitas">Dokumen Identitas</option>
                  <option value="Kependudukan">Kependudukan</option>
                  <option value="Pencatatan Sipil">Pencatatan Sipil</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="edit-link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link Google Form
                </label>
                <input
                  id="edit-link"
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-deskripsi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi
                </label>
                <textarea
                  id="edit-deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                Apakah Anda yakin ingin menghapus layanan "{currentItem?.nama}"?
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
    </div>
  );
};

export default PelayananAdmin;

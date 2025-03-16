"use client";

import { useState, useEffect } from "react";
import {
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaPray,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserPlus,
  FaListAlt,
  FaHome,
} from "react-icons/fa";

// Ubah import PopupForm untuk mengarah ke file .jsx bukan .tsx
import PopupForm from "./PopupForm.jsx";

export default function Penduduk() {
  // Data penduduk individual
  const [pendudukData, setPendudukData] = useState([
    {
      id: 1,
      nama: "Ahmad Suparjo",
      nik: "3507012505780001",
      alamat: "Jl. Mawar No. 10",
      tanggalLahir: "1978-05-25",
      jenisKelamin: "Laki-laki",
      agama: "Islam",
      kepalaKeluarga: true,
    },
    {
      id: 2,
      nama: "Siti Aminah",
      nik: "3507016708820002",
      alamat: "Jl. Mawar No. 10",
      tanggalLahir: "1982-08-27",
      jenisKelamin: "Perempuan",
      agama: "Islam",
      kepalaKeluarga: false,
    },
    {
      id: 3,
      nama: "Budi Santoso",
      nik: "3507010102900003",
      alamat: "Jl. Melati No. 5",
      tanggalLahir: "1990-02-01",
      jenisKelamin: "Laki-laki",
      agama: "Kristen",
      kepalaKeluarga: true,
    },
    // Tambahkan data dummy lainnya sesuai kebutuhan
  ]);

  // Data agregat (yang ditampilkan di tabel)
  const [totalPenduduk, setTotalPenduduk] = useState([
    { kategori: "Laki-laki", total: 0 },
    { kategori: "Perempuan", total: 0 },
    { kategori: "Kepala Keluarga", total: 0 },
    { kategori: "Total Penduduk", total: 0 },
  ]);

  const [pendudukUsia, setPendudukUsia] = useState([
    { kategori: "0-17 Tahun", total: 0 },
    { kategori: "18-40 Tahun", total: 0 },
    { kategori: "41-65 Tahun", total: 0 },
    { kategori: "65+ Tahun", total: 0 },
  ]);

  const [pendudukPekerjaan, setPendudukPekerjaan] = useState([
    { kategori: "Pelajar", total: 0 },
    { kategori: "Petani", total: 0 },
    { kategori: "Pegawai", total: 0 },
    { kategori: "Wirausaha", total: 0 },
  ]);

  const [pendudukKeyakinan, setPendudukKeyakinan] = useState([
    { kategori: "Islam", total: 0 },
    { kategori: "Kristen", total: 0 },
    { kategori: "Hindu", total: 0 },
    { kategori: "Budha", total: 0 },
    { kategori: "Lainnya", total: 0 },
  ]);

  const [pendudukDusun, setPendudukDusun] = useState([
    { kategori: "Dusun 1", total: 110 },
    { kategori: "Dusun 2", total: 95 },
    { kategori: "Dusun 3", total: 75 },
  ]);

  // State untuk form dan UI
  const [showForm, setShowForm] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    nama: "",
    nik: "",
    alamat: "",
    tanggalLahir: "",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    kepalaKeluarga: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [editTP, setEditTP] = useState(null);
  const [editUsia, setEditUsia] = useState(null);
  const [editPekerjaan, setEditPekerjaan] = useState(null);
  const [editKeyakinan, setEditKeyakinan] = useState(null);
  const [editDusun, setEditDusun] = useState(null);

  // Ubah state activeSection untuk mengelola tampilan halaman
  const [activeSection, setActiveSection] = useState("dashboard"); // "dashboard" atau "manage"

  // Hitung umur berdasarkan tanggal lahir
  const hitungUmur = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Tentukan kategori umur
  const getKategoriUmur = (umur) => {
    if (umur <= 17) return "0-17 Tahun";
    if (umur <= 40) return "18-40 Tahun";
    if (umur <= 65) return "41-65 Tahun";
    return "65+ Tahun";
  };

  // Update data agregat berdasarkan data penduduk individual
  useEffect(() => {
    // Reset semua data agregat
    const newTotalPenduduk = [
      { kategori: "Laki-laki", total: 0 },
      { kategori: "Perempuan", total: 0 },
      { kategori: "Kepala Keluarga", total: 0 },
      { kategori: "Total Penduduk", total: 0 },
    ];

    const newPendudukUsia = [
      { kategori: "0-17 Tahun", total: 0 },
      { kategori: "18-40 Tahun", total: 0 },
      { kategori: "41-65 Tahun", total: 0 },
      { kategori: "65+ Tahun", total: 0 },
    ];

    const newPendudukKeyakinan = [
      { kategori: "Islam", total: 0 },
      { kategori: "Kristen", total: 0 },
      { kategori: "Hindu", total: 0 },
      { kategori: "Budha", total: 0 },
      { kategori: "Lainnya", total: 0 },
    ];

    // Hitung data berdasarkan penduduk individual
    pendudukData.forEach((penduduk) => {
      // Jenis kelamin
      if (penduduk.jenisKelamin === "Laki-laki") {
        newTotalPenduduk[0].total++;
      } else {
        newTotalPenduduk[1].total++;
      }

      // Kepala keluarga
      if (penduduk.kepalaKeluarga) {
        newTotalPenduduk[2].total++;
      }

      // Umur
      const umur = hitungUmur(penduduk.tanggalLahir);
      const kategoriUmur = getKategoriUmur(umur);
      const idxUsia = newPendudukUsia.findIndex(
        (item) => item.kategori === kategoriUmur
      );
      if (idxUsia !== -1) {
        newPendudukUsia[idxUsia].total++;
      }

      // Agama
      const idxAgama = newPendudukKeyakinan.findIndex(
        (item) => item.kategori === penduduk.agama
      );
      if (idxAgama !== -1) {
        newPendudukKeyakinan[idxAgama].total++;
      } else {
        // Jika agama tidak ada dalam kategori, masukkan ke "Lainnya"
        newPendudukKeyakinan[4].total++;
      }
    });

    // Total penduduk
    newTotalPenduduk[3].total = pendudukData.length;

    // Update state
    setTotalPenduduk(newTotalPenduduk);
    setPendudukUsia(newPendudukUsia);
    setPendudukKeyakinan(newPendudukKeyakinan);
  }, [pendudukData]);

  // Auto update Total Penduduk
  // useEffect(() => {
  //   const totalSum = totalPenduduk[0].total + totalPenduduk[1].total + totalPenduduk[2].total
  //   setTotalPenduduk((prev) => {
  //     const updated = [...prev]
  //     updated[3].total = totalSum
  //     return updated
  //   })
  // }, [totalPenduduk[0].total, totalPenduduk[1].total, totalPenduduk[2].total])

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing data
      setPendudukData(
        pendudukData.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
    } else {
      // Add new data
      const newId =
        pendudukData.length > 0
          ? Math.max(...pendudukData.map((item) => item.id)) + 1
          : 1;
      setPendudukData([...pendudukData, { ...formData, id: newId }]);
    }

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = (closeForm = true) => {
    setFormData({
      id: 0,
      nama: "",
      nik: "",
      alamat: "",
      tanggalLahir: "",
      jenisKelamin: "Laki-laki",
      agama: "Islam",
      kepalaKeluarga: false,
    });
    setIsEditing(false);
    if (closeForm) {
      setShowForm(false);
    }
  };

  // Edit data
  const handleEdit = (id) => {
    const dataToEdit = pendudukData.find((item) => item.id === id);
    if (dataToEdit) {
      setFormData({ ...dataToEdit });
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Delete data
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setPendudukData(pendudukData.filter((item) => item.id !== id));
    }
  };

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

  // Render summary cards
  const renderSummaryCards = () => {
    const totalSum = totalPenduduk[3].total;

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
        title: "Laki-laki",
        value: totalPenduduk[0].total,
        icon: <FaUsers className="text-indigo-500" size={24} />,
        color: "from-indigo-500 to-indigo-600",
      },
      {
        title: "Perempuan",
        value: totalPenduduk[1].total,
        icon: <FaUsers className="text-pink-500" size={24} />,
        color: "from-pink-500 to-pink-600",
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

  // Render reusable table
  const renderTable = (title, data, icon) => {
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
                      {title === "Total Penduduk" && idx === data.length - 1 ? (
                        <span className="text-blue-600 font-medium">
                          {row.total}
                        </span>
                      ) : (
                        row.total
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {title === "Total Penduduk" && idx === data.length - 1 ? (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render form
  const renderForm = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaUserPlus className="text-blue-500" size={20} />
            </div>
            <h2 className="font-semibold text-xl text-gray-800">
              {isEditing ? "Edit Data Penduduk" : "Tambah Data Penduduk"}
            </h2>
          </div>
          <button
            onClick={resetForm}
            className="text-gray-500 hover:text-gray-700"
            title="Tutup"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIK
              </label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agama
              </label>
              <select
                name="agama"
                value={formData.agama}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="kepalaKeluarga"
                name="kepalaKeluarga"
                checked={formData.kepalaKeluarga}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="kepalaKeluarga"
                className="ml-2 block text-sm text-gray-700"
              >
                Kepala Keluarga
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => resetForm()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render data list
  const renderDataList = () => {
    const filteredData = pendudukData.filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik.includes(searchTerm) ||
        item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaListAlt className="text-blue-500" size={20} />
            </div>
            <h2 className="font-semibold text-xl text-gray-800">
              Daftar Penduduk
            </h2>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan nama, NIK, atau alamat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Nama</th>
                  <th className="px-4 py-3 text-left font-medium">NIK</th>
                  <th className="px-4 py-3 text-left font-medium">Alamat</th>
                  <th className="px-4 py-3 text-center font-medium">Umur</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Jenis Kelamin
                  </th>
                  <th className="px-4 py-3 text-center font-medium">Agama</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Kepala Keluarga
                  </th>
                  <th className="px-4 py-3 text-center font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{item.nama}</td>
                    <td className="px-4 py-3">{item.nik}</td>
                    <td className="px-4 py-3">{item.alamat}</td>
                    <td className="px-4 py-3 text-center">
                      {hitungUmur(item.tanggalLahir)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.jenisKelamin}
                    </td>
                    <td className="px-4 py-3 text-center">{item.agama}</td>
                    <td className="px-4 py-3 text-center">
                      {item.kepalaKeluarga ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Tidak ada data yang sesuai dengan pencarian
                    </td>
                  </tr>
                )}
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
        {/* Ubah bagian tombol di header utama, hapus tombol "Tambah Penduduk" */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Data Kependudukan
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveSection("manage");
              }}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaListAlt size={16} />
              <span>Kelola Data</span>
            </button>
          </div>
        </div>

        {/* Ubah bagian main return untuk menampilkan section yang berbeda berdasarkan activeSection */}
        {activeSection === "dashboard" ? (
          <>
            {renderSummaryCards()}

            <div className="mt-8 space-y-6">
              {renderTable(
                "Total Penduduk",
                totalPenduduk,
                <FaUsers className="text-blue-500" size={20} />
              )}

              {renderTable(
                "Jumlah Penduduk Berdasarkan Usia",
                pendudukUsia,
                <FaUsers className="text-green-500" size={20} />
              )}

              {renderTable(
                "Jumlah Penduduk Berdasarkan Pekerjaan",
                pendudukPekerjaan,
                <FaBriefcase className="text-purple-500" size={20} />
              )}

              {renderTable(
                "Jumlah Penduduk Berdasarkan Keyakinan",
                pendudukKeyakinan,
                <FaPray className="text-orange-500" size={20} />
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Kelola Data Penduduk
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaHome size={16} />
                  <span>Kembali ke Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    resetForm(false); // Reset form tanpa menutupnya
                    setShowForm(true); // Pastikan form ditampilkan
                  }}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaUserPlus size={16} />
                  <span>Tambah Penduduk</span>
                </button>
              </div>
            </div>

            {/* Ubah bagian showForm untuk menggunakan PopupForm */}
            {showForm && (
              <PopupForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                resetForm={resetForm}
                isEditing={isEditing}
              />
            )}

            {renderDataList()}
          </div>
        )}
      </div>
    </div>
  );
}

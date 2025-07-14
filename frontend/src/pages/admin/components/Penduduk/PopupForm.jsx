"use client";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import PendudukService from "../../services/PendudukService";

const PopupForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  resetForm,
  isEditing,
  kepalaKeluargaList = [],
  fetchKepalaKeluarga, // pastikan prop ini diteruskan dari parent
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingKepalaKeluarga, setPendingKepalaKeluarga] = useState(null);

  // Handler untuk checkbox kepala keluarga
  const handleKepalaKeluargaChange = (e) => {
    const checked = e.target.checked;
    // Jika sedang edit dan uncheck, tampilkan konfirmasi
    if (isEditing && formData.kepalaKeluarga && !checked) {
      setPendingKepalaKeluarga(false);
      setShowConfirm(true);
    } else {
      handleInputChange({ target: { name: "kepalaKeluarga", value: checked } });
    }
  };

  // Konfirmasi perubahan status
  const handleConfirm = async (confirm) => {
    setShowConfirm(false);
    if (confirm) {
      // Hapus data kepala keluarga dari tabel kepala keluarga
      try {
        await PendudukService.deleteKepalaKeluargaByNik(formData.nik);
        if (fetchKepalaKeluarga) fetchKepalaKeluarga(); // refetch dropdown
      } catch (err) {
        alert("Gagal menghapus data kepala keluarga!");
      }
      handleInputChange({ target: { name: "kepalaKeluarga", value: false } });
    } else {
      handleInputChange({ target: { name: "kepalaKeluarga", value: true } });
    }
    setPendingKepalaKeluarga(null);
  };

  return (
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
                onChange={handleKepalaKeluargaChange}
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

          {/* Tambahkan dropdown kepala keluarga jika bukan kepala keluarga */}
          {!formData.kepalaKeluarga && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Kepala Keluarga
              </label>
              <select
                name="selectedKK"
                value={formData.selectedKK}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="">-- Pilih Kepala Keluarga --</option>
                {kepalaKeluargaList.map((kk) => (
                  <option key={kk.id} value={kk.id}>
                    {kk.nama} ({kk.nik})
                  </option>
                ))}
              </select>
            </div>
          )}

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
        {/* Modal konfirmasi */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">
                Konfirmasi Perubahan Status
              </h2>
              <p className="mb-4">
                Anda yakin ingin mengubah status menjadi anggota keluarga? Data
                kepala keluarga akan dihapus dan tidak bisa dikembalikan.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleConfirm(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Ya, Ubah
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupForm;

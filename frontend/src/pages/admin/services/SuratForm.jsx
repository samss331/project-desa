"use client";

import { useState } from "react";
import { FaSpinner, FaUpload, FaExclamationCircle } from "react-icons/fa";

const SuratForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEdit,
  currentItem,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [fileName, setFileName] = useState(
    currentItem?.file_surat ? currentItem.file_surat.split("/").pop() : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(null);

    if (file) {
      // Check file type
      if (file.type !== "application/pdf") {
        setFileError("Hanya file PDF yang diperbolehkan");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError("Ukuran file maksimal 5MB");
        return;
      }

      setFormData({ ...formData, file });
      setFileName(file.name);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
            disabled={isEdit} // Can't change type when editing
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
            placeholder="Nomor surat"
            required
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
            placeholder="Perihal surat"
            required
          />
        </div>

        <div>
          <label
            htmlFor="pengirim"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {formData.jenis === "Surat Masuk" ? "Pengirim" : "Penerima"}
          </label>
          <input
            id="pengirim"
            type="text"
            value={formData.pengirim}
            onChange={(e) =>
              setFormData({ ...formData, pengirim: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
            placeholder={
              formData.jenis === "Surat Masuk"
                ? "Nama pengirim"
                : "Nama penerima"
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="tanggal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {formData.jenis === "Surat Masuk"
              ? "Tanggal Terima"
              : "Tanggal Kirim"}
          </label>
          <input
            id="tanggal"
            type="date"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
            required
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
          >
            {formData.jenis === "Surat Masuk" ? (
              <>
                <option value="Diterima">Diterima</option>
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
              </>
            ) : (
              <>
                <option value="Terkirim">Terkirim</option>
                <option value="Diterima">Diterima</option>
                <option value="Dibaca">Dibaca</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Surat (PDF)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#6CABCA] hover:text-[#5DE1C4] focus-within:outline-none"
                >
                  <span>Upload file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">atau drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF hingga 5MB</p>

              {fileName && (
                <div className="mt-2 text-sm text-gray-800 bg-gray-100 p-2 rounded-lg">
                  {fileName}
                </div>
              )}

              {fileError && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <FaExclamationCircle />
                  <span>{fileError}</span>
                </div>
              )}

              {isEdit && !formData.file && currentItem?.file_surat && (
                <div className="mt-2 text-xs text-gray-600">
                  File saat ini akan tetap digunakan jika tidak ada file baru
                  yang diunggah.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          disabled={isSubmitting}
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#B9FF66] text-gray-800 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
          disabled={isSubmitting || fileError}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <span>{isEdit ? "Simpan Perubahan" : "Simpan"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SuratForm;

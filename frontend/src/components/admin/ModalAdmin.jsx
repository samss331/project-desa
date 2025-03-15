import { useState, useEffect } from "react";
import FormPenduduk from "../../pages/admin/components/FormPenduduk";
import FormAPBDes from "../../pages/admin/components/FormAPBDes";
import FormFasilitas from "../../pages/admin/components/FormFasilitas";

export default function ModalAdmin({
  title,
  isOpen,
  onClose,
  onSave,
  activeTab,
  initialData = {},
}) {
  const [formData, setFormData] = useState({});

  // Sync initialData when modal opened
  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    setFormData(data); // Update local formData when form changes
  };

  const handleSave = () => {
    onSave(formData); // Send formData when click Simpan
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div>
          {activeTab === "penduduk" && (
            <FormPenduduk data={formData} onSubmit={handleFormSubmit} />
          )}
          {activeTab === "apbdes" && (
            <FormAPBDes data={formData} onSubmit={handleFormSubmit} />
          )}
          {activeTab === "fasilitas" && (
            <FormFasilitas data={formData} onSubmit={handleFormSubmit} />
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 text-white"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import TableAdmin from "../../../components/admin/TableAdmin";

export default function InfografisAdmin() {
  const [activeTab, setActiveTab] = useState("penduduk");

  // Data state
  const [pendudukData, setPendudukData] = useState([]);
  const [apbdesData, setApbdesData] = useState([]);
  const [fasilitasData, setFasilitasData] = useState([]);

  // Modal Control
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalData, setModalData] = useState(null);

  // Handle CRUD
  const handleAdd = () => {
    setModalMode("create");
    setModalData(null);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setModalMode("edit");
    const data = getActiveData()[index];
    setModalData({ ...data, index });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedData = getActiveData().filter((_, i) => i !== index);
    setActiveData(updatedData);
  };

  const handleSubmit = (formData) => {
    if (modalMode === "create") {
      setActiveData([...getActiveData(), formData]);
    } else if (modalMode === "edit") {
      const updatedData = getActiveData().map((item, i) =>
        i === modalData.index ? formData : item
      );
      setActiveData(updatedData);
    }
    setShowModal(false);
  };

  // Helpers to get & set data based on tab
  const getActiveData = () => {
    if (activeTab === "penduduk") return pendudukData;
    if (activeTab === "apbdes") return apbdesData;
    return fasilitasData;
  };

  const setActiveData = (data) => {
    if (activeTab === "penduduk") setPendudukData(data);
    else if (activeTab === "apbdes") setApbdesData(data);
    else setFasilitasData(data);
  };

  // Column per tab
  const getColumns = () => {
    if (activeTab === "penduduk") return ["Kategori", "Jumlah"];
    if (activeTab === "apbdes") return ["Kategori", "Jumlah (Rp)"];
    return ["Nama Fasilitas", "Jumlah"];
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6 space-y-6">
        <HeaderAdmin title="Manajemen Infografis" />

        {/* TAB NAVIGATION */}
        <div className="flex gap-4">
          {["penduduk", "apbdes", "fasilitas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab ? "bg-lime-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TOMBOL TAMBAH */}
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-lime-500 text-white px-4 py-2 rounded-lg"
          >
            Tambah Data
          </button>
        </div>

        {/* TABEL DATA */}
        <TableAdmin
          columns={getColumns()}
          data={getActiveData()}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* MODAL FORM */}
        {showModal && (
          <ModalForm
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={modalData}
            mode={modalMode}
          />
        )}
      </div>
    </div>
  );
}

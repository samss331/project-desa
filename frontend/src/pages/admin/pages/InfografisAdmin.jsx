// src/pages/admin/pages/InfografisAdmin.jsx
import React from "react";
import TableAdmin from "../../../components/admin/TableAdmin";

const InfografisAdmin = () => {
  const dataDummy = [
    { id: 1, judul: "Infografis APBDes 2024", kategori: "APBDes" },
    { id: 2, judul: "Infografis Penduduk", kategori: "Penduduk" },
  ];

  const columns = ["ID", "Judul", "Kategori"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manajemen Infografis</h2>
      <TableAdmin data={dataDummy} columns={columns} />
    </div>
  );
};

export default InfografisAdmin;

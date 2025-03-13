// src/pages/admin/pages/BeritaAdmin.jsx
import React from "react";
import TableAdmin from "../../../components/admin/TableAdmin";

const BeritaAdmin = () => {
  const dataDummy = [
    { id: 1, judul: "Berita 1", tanggal: "2024-01-01" },
    { id: 2, judul: "Berita 2", tanggal: "2024-01-02" },
  ];

  const columns = ["ID", "Judul", "Tanggal"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manajemen Berita</h2>
      <TableAdmin data={dataDummy} columns={columns} />
    </div>
  );
};

export default BeritaAdmin;

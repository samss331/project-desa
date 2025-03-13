// src/pages/admin/pages/PengumumanAdmin.jsx
import React from "react";
import TableAdmin from "../../../components/admin/TableAdmin";

const PengumumanAdmin = () => {
  const dataDummy = [
    { id: 1, judul: "Pengumuman 1", tanggal: "2024-01-05" },
    { id: 2, judul: "Pengumuman 2", tanggal: "2024-01-06" },
  ];

  const columns = ["ID", "Judul", "Tanggal"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manajemen Pengumuman</h2>
      <TableAdmin data={dataDummy} columns={columns} />
    </div>
  );
};

export default PengumumanAdmin;

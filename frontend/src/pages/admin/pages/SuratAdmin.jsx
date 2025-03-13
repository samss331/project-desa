// src/pages/admin/pages/SuratAdmin.jsx
import React from "react";
import TableAdmin from "../../../components/admin/TableAdmin";

const SuratAdmin = () => {
  const dataDummy = [
    { id: 1, jenis: "Surat Masuk", tanggal: "2024-02-01" },
    { id: 2, jenis: "Surat Keluar", tanggal: "2024-02-05" },
  ];

  const columns = ["ID", "Jenis", "Tanggal"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manajemen Surat</h2>
      <TableAdmin data={dataDummy} columns={columns} />
    </div>
  );
};

export default SuratAdmin;

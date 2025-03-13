// src/pages/admin/pages/MediaAdmin.jsx
import React from "react";
import TableAdmin from "../../../components/admin/TableAdmin";

const MediaAdmin = () => {
  const dataDummy = [
    { id: 1, nama: "Foto Kegiatan 1", tipe: "Foto" },
    { id: 2, nama: "Video Kegiatan 2", tipe: "Video" },
  ];

  const columns = ["ID", "Nama", "Tipe"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manajemen Media</h2>
      <TableAdmin data={dataDummy} columns={columns} />
    </div>
  );
};

export default MediaAdmin;

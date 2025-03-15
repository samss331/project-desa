import TableAdmin from "../../../components/admin/TableAdmin";

export default function BeritaAdmin() {
  const columns = ["Judul", "Tanggal", "Penulis"];
  const data = [
    { Judul: "Berita 1", Tanggal: "2024-01-01", Penulis: "Admin" },
    { Judul: "Berita 2", Tanggal: "2024-01-02", Penulis: "Admin" },
  ];

  const handleEdit = (row) => console.log("Edit", row);
  const handleDelete = (row) => console.log("Delete", row);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manajemen Berita</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Tambah Berita
      </button>
      <TableAdmin
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

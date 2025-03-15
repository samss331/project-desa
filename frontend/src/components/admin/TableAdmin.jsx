import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function TableAdmin({ columns, data, onEdit, onDelete }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRow({ ...data[index] });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedRow({});
  };

  const handleSave = () => {
    onEdit(editIndex, editedRow);
    setEditIndex(null);
    setEditedRow({});
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    const updatedRow = { ...editedRow, [field]: value };

    // Khusus untuk otomatis hitung Total (contoh: Total Penduduk)
    if (
      "Laki-laki" in updatedRow &&
      "Perempuan" in updatedRow &&
      "Kepala Keluarga" in updatedRow
    ) {
      const total =
        (parseInt(updatedRow["Laki-laki"]) || 0) +
        (parseInt(updatedRow["Perempuan"]) || 0) +
        (parseInt(updatedRow["Kepala Keluarga"]) || 0);
      updatedRow["Total"] = total;
    }

    setEditedRow(updatedRow);
  };

  return (
    <table className="min-w-full border rounded-lg overflow-hidden shadow">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="p-3 border text-center">
              {col}
            </th>
          ))}
          <th className="p-3 border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center p-4">
              Tidak ada data.
            </td>
          </tr>
        ) : (
          data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col, i) => (
                <td key={i} className="p-3 border text-center">
                  {editIndex === idx ? (
                    col === "Total" ? (
                      <span>{editedRow[col]}</span> // Total hanya read
                    ) : (
                      <input
                        type={typeof item[col] === "number" ? "number" : "text"}
                        value={editedRow[col]}
                        onChange={(e) => handleChange(e, col)}
                        className="border p-1 rounded w-full text-center"
                      />
                    )
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
              <td className="p-3 border flex gap-2 justify-center">
                {editIndex === idx ? (
                  <>
                    <button onClick={handleSave} className="text-green-500">
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} className="text-yellow-500">
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(idx)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(idx)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

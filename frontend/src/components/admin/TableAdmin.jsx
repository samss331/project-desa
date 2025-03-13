import { FaEdit, FaTrash } from "react-icons/fa";

export default function TableAdmin({ columns, data, onEdit, onDelete }) {
  return (
    <table className="min-w-full border rounded-lg overflow-hidden shadow">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="p-3 border">
              {col}
            </th>
          ))}
          <th className="p-3 border">Aksi</th>
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
              {Object.values(item).map((val, i) => (
                <td key={i} className="p-3 border">
                  {val}
                </td>
              ))}
              <td className="p-3 border flex gap-2">
                <button onClick={() => onEdit(idx)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(idx)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

import React, { useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const initialForm = {
  id: null,
  nama: '',
  jabatan: '',
  nip: '',
  nohp: '',
  aktif: true,
  foto: '', // url atau base64
};

const dummyAparat = [
  {
    id: 1,
    nama: 'Budi Santoso',
    jabatan: 'Kepala Desa',
    nip: '1234567890',
    nohp: '08123456789',
    aktif: true,
    foto: '',
  },
  {
    id: 2,
    nama: 'Siti Aminah',
    jabatan: 'Sekretaris Desa',
    nip: '0987654321',
    nohp: '08129876543',
    aktif: true,
    foto: '',
  },
];

export default function AparatAdmin() {
  const [form, setForm] = useState(initialForm);
  const [aparatList, setAparatList] = useState(dummyAparat);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  // Handler
  const handleInput = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      // Untuk preview foto
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({ ...form, foto: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.jabatan || !form.nip || !form.nohp) return;
    if (isEditing) {
      setAparatList(aparatList.map((a) => (a.id === form.id ? { ...form } : a)));
    } else {
      setAparatList([
        ...aparatList,
        { ...form, id: Date.now() },
      ]);
    }
    setForm(initialForm);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (aparat) => {
    setForm(aparat);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus aparat ini?')) {
      setAparatList(aparatList.filter((a) => a.id !== id));
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setIsEditing(false);
    setShowForm(false);
  };

  // Filter list
  const filteredAparat = aparatList.filter(
    (a) =>
      a.nama.toLowerCase().includes(search.toLowerCase()) ||
      a.jabatan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FaUserPlus className="text-blue-500 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Aparat Desa</h1>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input type="text" name="nama" value={form.nama} onChange={handleInput} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input type="text" name="jabatan" value={form.jabatan} onChange={handleInput} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIP/NIK</label>
                  <input type="text" name="nip" value={form.nip} onChange={handleInput} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                  <input type="text" name="nohp" value={form.nohp} onChange={handleInput} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="aktif" checked={form.aktif} onChange={handleInput} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="block text-sm text-gray-700">Aktif</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto (opsional)</label>
                  <input type="file" name="foto" accept="image/*" onChange={handleInput} className="w-full border border-gray-300 rounded-lg p-2" />
                  {form.foto && (
                    <img src={form.foto} alt="Preview" className="mt-2 w-16 h-16 object-cover rounded-lg border" />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">{isEditing ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        )}

        {/* Tombol Tambah & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <button onClick={() => { setShowForm(true); setIsEditing(false); setForm(initialForm); }} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            <FaUserPlus /> <span>Tambah Aparat</span>
          </button>
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Cari nama/jabatan..." value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
          </div>
        </div>

        {/* List Aparat */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 bg-blue-50 rounded-tl-lg">Foto</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 bg-blue-50">Nama</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 bg-blue-50">Jabatan</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 bg-blue-50">NIP/NIK</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 bg-blue-50">No. HP</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700 bg-blue-50">Status</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700 bg-blue-50 rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAparat.length > 0 ? filteredAparat.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3">
                      {a.foto ? (
                        <img src={a.foto} alt={a.nama} className="w-10 h-10 object-cover rounded-full border" />
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-400 font-bold">{a.nama.charAt(0)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{a.nama}</td>
                    <td className="px-4 py-3">{a.jabatan}</td>
                    <td className="px-4 py-3">{a.nip}</td>
                    <td className="px-4 py-3">{a.nohp}</td>
                    <td className="px-4 py-3 text-center">
                      {a.aktif ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"><FaCheckCircle className="text-green-500" /> Aktif</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"><FaTimesCircle className="text-red-500" /> Tidak Aktif</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleEdit(a)} className="text-blue-500 hover:text-blue-700 mr-2"><FaEdit /></button>
                      <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-400">Belum ada data aparat.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

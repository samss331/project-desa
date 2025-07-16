import supabase from "../config/database.js";

const getAllPenduduk = async () => {
  const { data, error } = await supabase
    .from("penduduk")
    .select(
      "id, nama, nik, alamat, tanggal_lahir, jenis_kelamin, agama, id_kepala_keluarga, kepala_keluarga:nama, kepala_keluarga:nik"
    )
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const getPendudukByNik = async (nik) => {
  const { data, error } = await supabase
    .from("penduduk")
    .select(
      "id, nama, nik, alamat, tanggal_lahir, jenis_kelamin, agama, id_kepala_keluarga, kepala_keluarga:nama, kepala_keluarga:nik"
    )
    .eq("nik", nik)
    .single();
  if (error || !data) return null;
  return data;
};

const getPendudukById = async (id) => {
  const { data, error } = await supabase
    .from("penduduk")
    .select(
      "id, nama, nik, alamat, tanggal_lahir, jenis_kelamin, agama, id_kepala_keluarga, kepala_keluarga:nama, kepala_keluarga:nik"
    )
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const addPenduduk = async (
  nama,
  nik,
  alamat,
  tanggal_lahir,
  jenis_kelamin,
  agama,
  id_kepala_keluarga
) => {
  const { data, error } = await supabase
    .from("penduduk")
    .insert([
      {
        nama,
        nik,
        alamat,
        tanggal_lahir,
        jenis_kelamin,
        agama,
        id_kepala_keluarga,
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updateDataPenduduk = async (
  oldNik,
  nama,
  newNik,
  alamat,
  tanggal_lahir,
  jenis_kelamin,
  agama,
  id_kepala_keluarga
) => {
  const { error, data } = await supabase
    .from("penduduk")
    .update({
      nama,
      nik: newNik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      id_kepala_keluarga,
    })
    .eq("nik", oldNik);
  if (error) throw new Error(error.message);
  return data;
};

const deleteDataPenduduk = async (nik) => {
  const { error, data } = await supabase
    .from("penduduk")
    .delete()
    .eq("nik", nik);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const getTotalPenduduk = async () => {
  const { count, error } = await supabase
    .from("penduduk")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count;
};

const getTotalKepalaKeluarga = async () => {
  const { count, error } = await supabase
    .from("kepala_keluarga")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count;
};

const getTotalLakiLaki = async () => {
  const { count, error } = await supabase
    .from("penduduk")
    .select("id", { count: "exact", head: true })
    .eq("jenis_kelamin", "Laki-laki");
  if (error) throw new Error(error.message);
  return count;
};

const getTotalPerempuan = async () => {
  const { count, error } = await supabase
    .from("penduduk")
    .select("id", { count: "exact", head: true })
    .eq("jenis_kelamin", "Perempuan");
  if (error) throw new Error(error.message);
  return count;
};

const getPendudukByAgama = async () => {
  const { data, error } = await supabase.from("penduduk").select("agama");
  if (error) throw new Error(error.message);
  // Group by agama in JS
  const result = {};
  data.forEach((row) => {
    if (!result[row.agama]) result[row.agama] = 0;
    result[row.agama]++;
  });
  return Object.entries(result).map(([agama, total]) => ({ agama, total }));
};

const getPendudukByUmur = async () => {
  const { data, error } = await supabase
    .from("penduduk")
    .select("tanggal_lahir");
  if (error) throw new Error(error.message);
  // Group by umur kategori in JS
  const now = new Date();
  const kategori = {
    "Anak-anak": 0,
    Remaja: 0,
    "Dewasa Muda": 0,
    Dewasa: 0,
    Lansia: 0,
  };
  data.forEach((row) => {
    const tgl = new Date(row.tanggal_lahir);
    let umur = now.getFullYear() - tgl.getFullYear();
    const m = now.getMonth() - tgl.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < tgl.getDate())) umur--;
    if (umur <= 12) kategori["Anak-anak"]++;
    else if (umur <= 19) kategori["Remaja"]++;
    else if (umur <= 35) kategori["Dewasa Muda"]++;
    else if (umur <= 59) kategori["Dewasa"]++;
    else kategori["Lansia"]++;
  });
  return Object.entries(kategori).map(([kategori, total]) => ({
    kategori,
    total,
  }));
};

const getPendudukByKepalaKeluarga = async (id_kepala_keluarga) => {
  const { data, error } = await supabase
    .from("penduduk")
    .select(
      "id, nama, nik, alamat, tanggal_lahir, jenis_kelamin, agama, id_kepala_keluarga, kepala_keluarga:nama, kepala_keluarga:nik"
    )
    .eq("id_kepala_keluarga", id_kepala_keluarga)
    .order("nama", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const searchPendudukByKepalaKeluarga = async (searchTerm) => {
  // Supabase tidak support join + like, jadi fetch semua lalu filter di JS
  const { data, error } = await supabase
    .from("penduduk")
    .select(
      "id, nama, nik, alamat, tanggal_lahir, jenis_kelamin, agama, id_kepala_keluarga, kepala_keluarga:nama, kepala_keluarga:nik"
    );
  if (error) throw new Error(error.message);
  const filtered = data.filter(
    (row) =>
      (row.kepala_keluarga_nama &&
        row.kepala_keluarga_nama
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (row.kepala_keluarga_nik && row.kepala_keluarga_nik.includes(searchTerm))
  );
  // Sort by kk.nama, p.nama
  filtered.sort((a, b) => {
    if (a.kepala_keluarga_nama === b.kepala_keluarga_nama) {
      return a.nama.localeCompare(b.nama);
    }
    return (a.kepala_keluarga_nama || "").localeCompare(
      b.kepala_keluarga_nama || ""
    );
  });
  return filtered;
};

export default {
  getAllPenduduk,
  getPendudukByNik,
  getPendudukById,
  addPenduduk,
  updateDataPenduduk,
  deleteDataPenduduk,
  getPendudukByAgama,
  getPendudukByUmur,
  getTotalKepalaKeluarga,
  getTotalLakiLaki,
  getTotalPenduduk,
  getTotalPerempuan,
  getPendudukByKepalaKeluarga,
  searchPendudukByKepalaKeluarga,
};

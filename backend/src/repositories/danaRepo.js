import supabase from "../config/database.js";

const addDanaMasuk = async (tahun, bulan, jumlah, sumber, keterangan) => {
  const { data, error } = await supabase
    .from("dana_masuk")
    .insert([{ tahun, bulan, jumlah, sumber, keterangan }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const addDanaKeluar = async (tahun, bulan, jumlah, kategori, keterangan) => {
  const { data, error } = await supabase
    .from("dana_keluar")
    .insert([{ tahun, bulan, jumlah, kategori, keterangan }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const getAllDanaMasuk = async () => {
  const { data, error } = await supabase
    .from("dana_masuk")
    .select("*")
    .order("bulan", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const getAllDanaKeluar = async () => {
  const { data, error } = await supabase
    .from("dana_keluar")
    .select("*")
    .order("bulan", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const getDanaMasukById = async (id) => {
  const { data, error } = await supabase
    .from("dana_masuk")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const getDanaKeluarById = async (id) => {
  const { data, error } = await supabase
    .from("dana_keluar")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const getSummaryByYear = async (tahun) => {
  // Ambil semua data pemasukan dan pengeluaran tahun tsb, lalu agregasi di JS
  const { data: pemasukan, error: err1 } = await supabase
    .from("dana_masuk")
    .select("tahun, jumlah")
    .eq("tahun", tahun);
  if (err1) throw new Error(err1.message);
  const { data: pengeluaran, error: err2 } = await supabase
    .from("dana_keluar")
    .select("tahun, jumlah")
    .eq("tahun", tahun);
  if (err2) throw new Error(err2.message);
  const totalPemasukan = pemasukan.reduce(
    (sum, row) => sum + (row.jumlah || 0),
    0
  );
  const totalPengeluaran = pengeluaran.reduce(
    (sum, row) => sum + (row.jumlah || 0),
    0
  );
  return [
    { tipe: "Pemasukan", tahun, total: totalPemasukan },
    { tipe: "Pengeluaran", tahun, total: totalPengeluaran },
  ];
};

const getDetailByYear = async (tahun) => {
  // Ambil semua data pemasukan dan pengeluaran tahun tsb, lalu group by bulan di JS
  const { data: pendapatan, error: err1 } = await supabase
    .from("dana_masuk")
    .select("bulan, jumlah")
    .eq("tahun", tahun);
  if (err1) throw new Error(err1.message);
  const { data: pengeluaran, error: err2 } = await supabase
    .from("dana_keluar")
    .select("bulan, jumlah")
    .eq("tahun", tahun);
  if (err2) throw new Error(err2.message);
  // Group by bulan
  const groupByBulan = (arr) => {
    const result = {};
    arr.forEach((row) => {
      if (!result[row.bulan]) result[row.bulan] = 0;
      result[row.bulan] += row.jumlah || 0;
    });
    // Convert ke array
    return Object.entries(result).map(([bulan, total]) => ({
      bulan: parseInt(bulan),
      total,
    }));
  };
  return {
    pendapatan: groupByBulan(pendapatan),
    pengeluaran: groupByBulan(pengeluaran),
  };
};

const updateDanaMasuk = async (
  id,
  tahun,
  bulan,
  jumlah,
  sumber,
  keterangan
) => {
  const { error, data } = await supabase
    .from("dana_masuk")
    .update({ tahun, bulan, jumlah, sumber, keterangan })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const updateDanaKeluar = async (
  id,
  tahun,
  bulan,
  jumlah,
  kategori,
  keterangan
) => {
  const { error, data } = await supabase
    .from("dana_keluar")
    .update({ tahun, bulan, jumlah, kategori, keterangan })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteDanaMasuk = async (id) => {
  const { error, data } = await supabase
    .from("dana_masuk")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteDanaKeluar = async (id) => {
  const { error, data } = await supabase
    .from("dana_keluar")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  addDanaMasuk,
  addDanaKeluar,
  getAllDanaKeluar,
  getAllDanaMasuk,
  getSummaryByYear,
  getDetailByYear,
  getDanaKeluarById,
  getDanaMasukById,
  updateDanaKeluar,
  updateDanaMasuk,
  deleteDanaKeluar,
  deleteDanaMasuk,
};

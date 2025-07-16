import supabase from "../config/database.js";

const addSuratMasuk = async (
  nomor_surat,
  pengirim,
  perihal,
  tanggal_terima,
  file
) => {
  const { data, error } = await supabase
    .from("surat_masuk")
    .insert([{ nomor_surat, pengirim, perihal, tanggal_terima, file }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const addSuratKeluar = async (
  nomor_surat,
  penerima,
  perihal,
  tanggal_kirim,
  file
) => {
  const { data, error } = await supabase
    .from("surat_keluar")
    .insert([{ nomor_surat, penerima, perihal, tanggal_kirim, file }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const getAllSuratMasuk = async () => {
  const { data, error } = await supabase
    .from("surat_masuk")
    .select("*")
    .order("tanggal_terima", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getAllSuratKeluar = async () => {
  const { data, error } = await supabase
    .from("surat_keluar")
    .select("*")
    .order("tanggal_kirim", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getSuratMasukById = async (id) => {
  const { data, error } = await supabase
    .from("surat_masuk")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const getSuratKeluarById = async (id) => {
  const { data, error } = await supabase
    .from("surat_keluar")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const updateSuratMasuk = async (
  id,
  nomor_surat,
  pengirim,
  perihal,
  tanggal_terima,
  file
) => {
  const { error, data } = await supabase
    .from("surat_masuk")
    .update({ nomor_surat, pengirim, perihal, tanggal_terima, file })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const updateSuratKeluar = async (
  id,
  nomor_surat,
  penerima,
  perihal,
  tanggal_kirim,
  file
) => {
  const { error, data } = await supabase
    .from("surat_keluar")
    .update({ nomor_surat, penerima, perihal, tanggal_kirim, file })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteSuratMasuk = async (id) => {
  const { error, data } = await supabase
    .from("surat_masuk")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteSuratKeluar = async (id) => {
  const { error, data } = await supabase
    .from("surat_keluar")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  addSuratMasuk,
  getAllSuratMasuk,
  updateSuratMasuk,
  deleteSuratMasuk,
  getSuratMasukById,
  addSuratKeluar,
  getAllSuratKeluar,
  updateSuratKeluar,
  deleteSuratKeluar,
  getSuratKeluarById,
};

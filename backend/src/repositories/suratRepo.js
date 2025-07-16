import supabase from "../config/database.js";

const addSuratMasuk = async (
  nomorSurat,
  pengirim,
  perihal,
  tanggalTerima,
  file
) => {
  const { data, error } = await supabase
    .from("suratmasuk")
    .insert([{ nomorSurat, pengirim, perihal, tanggalTerima, file }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const addSuratKeluar = async (
  nomorSurat,
  penerima,
  perihal,
  tanggalKirim,
  file
) => {
  const { data, error } = await supabase
    .from("suratkeluar")
    .insert([{ nomorSurat, penerima, perihal, tanggalKirim, file }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const getAllSuratMasuk = async () => {
  const { data, error } = await supabase
    .from("suratmasuk")
    .select("*")
    .order("tanggalTerima", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getAllSuratKeluar = async () => {
  const { data, error } = await supabase
    .from("suratkeluar")
    .select("*")
    .order("tanggalKirim", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getSuratMasukById = async (id) => {
  const { data, error } = await supabase
    .from("suratmasuk")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const getSuratKeluarById = async (id) => {
  const { data, error } = await supabase
    .from("suratkeluar")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const updateSuratMasuk = async (
  id,
  nomorSurat,
  pengirim,
  perihal,
  tanggalTerima,
  file
) => {
  const { error, data } = await supabase
    .from("suratmasuk")
    .update({ nomorSurat, pengirim, perihal, tanggalTerima, file })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const updateSuratKeluar = async (
  id,
  nomorSurat,
  penerima,
  perihal,
  tanggalKirim,
  file
) => {
  const { error, data } = await supabase
    .from("suratkeluar")
    .update({ nomorSurat, penerima, perihal, tanggalKirim, file })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteSuratMasuk = async (id) => {
  const { error, data } = await supabase
    .from("suratmasuk")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteSuratKeluar = async (id) => {
  const { error, data } = await supabase
    .from("suratkeluar")
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

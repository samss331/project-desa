import supabase from "../config/database.js";

const addPelayanan = async (
  nama_layanan,
  kategori,
  deskripsi,
  link_google_form
) => {
  const { data, error } = await supabase
    .from("pelayanan")
    .insert([{ nama_layanan, kategori, deskripsi, link_google_form }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const getAllPelayanan = async () => {
  const { data, error } = await supabase
    .from("pelayanan")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getPelayananById = async (id) => {
  const { data, error } = await supabase
    .from("pelayanan")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const updatePelayanan = async (
  id,
  nama_layanan,
  kategori,
  deskripsi,
  link_google_form
) => {
  const { error, data } = await supabase
    .from("pelayanan")
    .update({ nama_layanan, kategori, deskripsi, link_google_form })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deletePelayanan = async (id) => {
  const { error, data } = await supabase
    .from("pelayanan")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  addPelayanan,
  getAllPelayanan,
  getPelayananById,
  updatePelayanan,
  deletePelayanan,
};

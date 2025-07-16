import supabase from "../config/database.js";

const getAllBerita = async () => {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("tanggalTerbit", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getBeritaByStatus = async (status) => {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("status", status)
    .order("tanggalTerbit", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getBeritaById = async (id) => {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const addBerita = async (judul, foto, isi, tanggalTerbit, penulis, status) => {
  const { data, error } = await supabase
    .from("berita")
    .insert([{ judul, foto, isi, tanggalTerbit, penulis, status }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updateBerita = async (
  id,
  judul,
  foto,
  isi,
  tanggalTerbit,
  penulis,
  status
) => {
  let updateObj = { judul, isi, tanggalTerbit, penulis, status };
  if (foto) updateObj.foto = foto;
  const { error, data } = await supabase
    .from("berita")
    .update(updateObj)
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteBerita = async (id) => {
  const { error, data } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  getAllBerita,
  getBeritaById,
  getBeritaByStatus,
  addBerita,
  updateBerita,
  deleteBerita,
};

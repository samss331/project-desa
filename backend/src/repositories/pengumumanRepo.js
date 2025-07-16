import supabase from "../config/database.js";

const getAllPengumuman = async () => {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .order("tanggal_mulai", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getPengumumanById = async (id) => {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const addPengumuman = async (judul, isi, tanggal_mulai, tanggal_selesai) => {
  const { data, error } = await supabase
    .from("pengumuman")
    .insert([{ judul, isi, tanggal_mulai, tanggal_selesai }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updatePengumuman = async (
  id,
  judul,
  isi,
  tanggal_mulai,
  tanggal_selesai
) => {
  const { error, data } = await supabase
    .from("pengumuman")
    .update({ judul, isi, tanggal_mulai, tanggal_selesai })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deletePengumuman = async (id) => {
  const { error, data } = await supabase
    .from("pengumuman")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  getAllPengumuman,
  getPengumumanById,
  addPengumuman,
  updatePengumuman,
  deletePengumuman,
};

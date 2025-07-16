import supabase from "../config/database.js";

const getAllKepalaKeluarga = async () => {
  const { data, error } = await supabase
    .from("kepala_keluarga")
    .select("id, nama, nik")
    .order("nama", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const getKepalaKeluargaById = async (id) => {
  const { data, error } = await supabase
    .from("kepala_keluarga")
    .select("id, nama, nik")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const getKepalaKeluargaByNik = async (nik) => {
  const { data, error } = await supabase
    .from("kepala_keluarga")
    .select("id, nama, nik")
    .eq("nik", nik)
    .single();
  if (error || !data) return null;
  return data;
};

const addKepalaKeluarga = async (nama, nik) => {
  const { data, error } = await supabase
    .from("kepala_keluarga")
    .insert([{ nama, nik }])
    .select("id, nama, nik")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updateKepalaKeluarga = async (id, nama, nik) => {
  const { error, data } = await supabase
    .from("kepala_keluarga")
    .update({ nama, nik })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteKepalaKeluarga = async (id) => {
  const { error, data } = await supabase
    .from("kepala_keluarga")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  getAllKepalaKeluarga,
  getKepalaKeluargaById,
  getKepalaKeluargaByNik,
  addKepalaKeluarga,
  updateKepalaKeluarga,
  deleteKepalaKeluarga,
};

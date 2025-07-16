import supabase from "../config/database.js";

const addMedia = async (nama, tipe, file, deskripsi, thumbnail) => {
  const { data, error } = await supabase
    .from("media")
    .insert([{ nama, tipe, file, deskripsi, thumbnail }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const getAllMedia = async () => {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const getMediaById = async (id) => {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
};

const updateMedia = async (id, nama, tipe, file, deskripsi, thumbnail) => {
  const { error, data } = await supabase
    .from("media")
    .update({ nama, tipe, file, deskripsi, thumbnail })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const deleteMedia = async (id) => {
  const { error, data } = await supabase.from("media").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

export default {
  addMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

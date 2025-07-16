import supabase from "../config/database.js";

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("user")
    .select("id, nama, email, password, role, last_login")
    .eq("email", email)
    .single();
  if (error || !data) return null;
  const { id, nama, password, role, last_login } = data;
  return { id, nama, email, password, role, last_login };
};

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("user")
    .select("id, nama, email, role, last_login");
  if (error) throw new Error(error.message);
  return data;
};

const deleteUserById = async (id) => {
  const { error, data } = await supabase.from("user").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const updateUserRole = async (id, role) => {
  const { error, data } = await supabase
    .from("user")
    .update({ role })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const updateLastLogin = async (id, datetime) => {
  const { error, data } = await supabase
    .from("user")
    .update({ last_login: datetime })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const transferSuperadmin = async (fromId, toId) => {
  let res1 = await supabase
    .from("user")
    .update({ role: "admin" })
    .eq("id", fromId);
  if (res1.error) throw new Error(res1.error.message);
  let res2 = await supabase
    .from("user")
    .update({ role: "superadmin" })
    .eq("id", toId);
  if (res2.error) throw new Error(res2.error.message);
  return true;
};

const updateUserByEmail = async (nama, email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User dengan email tersebut tidak ditemukan!");
  const { error, data } = await supabase
    .from("user")
    .update({ nama, password })
    .eq("email", email);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const resetPasswordByEmail = async (email, newPassword) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User dengan email tersebut tidak ditemukan!");
  const { error, data } = await supabase
    .from("user")
    .update({ password: newPassword })
    .eq("email", email);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
};

const addUser = async (nama, email, password, role = "admin") => {
  const existing = await getUserByEmail(email);
  if (existing) throw new Error("Email sudah terdaftar!");
  const { data, error } = await supabase
    .from("user")
    .insert([{ nama, email, password, role }])
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id;
};

export default {
  getUserByEmail,
  getAllUsers,
  deleteUserById,
  updateUserRole,
  updateLastLogin,
  transferSuperadmin,
  updateUserByEmail,
  resetPasswordByEmail,
  addUser,
};

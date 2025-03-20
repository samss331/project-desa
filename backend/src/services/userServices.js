import tokenHelpers from "../helpers/token.js";
import passHelpers from "../helpers/pass.js";
import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import { UserDTO } from "../dto/dto.js";

const loginAdmin = async (email, password) => {
  const user = await userRepositories.getUserByEmail(email);
  if (!user) throw new Error("Email tidak ditemukan!");

  const pwMatch = await passHelpers.comparePw(password, user.password);
  if (!pwMatch) throw new Error("Password salah!");

  // Buat token
  const token = tokenHelpers.generateToken({ id: user.id, email: user.email });

  // Pastikan token dikirim dalam response
  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    token, // Token harus ada di dalam objek ini
  };
};

const updateAdmin = async (nama, email, password) => {
  const hashedPw = await passHelpers.hashPw(password);

  const updated = await userRepositories.updateUserByEmail(
    nama,
    email,
    hashedPw
  );
  if (!updated) throw new Error("Gagal memperbarui data admin!");

  const user = await userRepositories.getUserByEmail(email);
  return new UserDTO(user.id, user.nama, user.email, null);
};

const resetPassword = async (email) => {
    const newPassword = "Bahontobungku123"; 
    const hashedPassword = await passHelpers.hashPw(newPassword)

    const success = await repo.resetPasswordByEmail(email, hashedPassword);
    if (!success) throw new Error("Gagal mereset password!");

    return { message: "Password berhasil direset ke default." };
};

export default { loginAdmin, updateAdmin , resetPassword };

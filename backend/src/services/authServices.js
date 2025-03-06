import tokenHelpers from "../helpers/token.js";
import passHelpers from "../helpers/pass.js";
import userRepositories from "../repositories/userRepositories.js";
import hashPw from "../helpers/pass.js"


const loginAdmin = async (email, password) => {
    const user = await userRepositories.getUserByEmail(email);

    if (!user) throw new Error ("Email tidak ditemukan!");

    const pwMatch = await passHelpers.comparePw(password, user.password);
    if(!pwMatch) throw new Error ("Password Salah")

    const token = tokenHelpers.generateToken({id: user.id, email: user.email})
    
    console.log("Generated Token:", token);

    return {token};
}   

const updateAdmin = async (nama, email, password) => {
    const hashedPw = await hashPw.hashPw(password)

    const updated = await userRepositories.updateUserByEmail(nama, email, hashedPw)
    if(!updated) throw new Error ("Gagal memperbarui data admin!");
    return {message: "Data admin berhasil diperbarui"}
}

export default {loginAdmin, updateAdmin};
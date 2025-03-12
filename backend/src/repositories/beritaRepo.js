import db from "../config/database.js";

const getAllBerita = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM berita ORDER BY tanggalTerbit DESC");
        return results;
    } catch (error) {
        throw error;
    }
};

const getBeritaById = async (id) => {
    try {
        const [result] = await db.promise().query("SELECT * FROM berita WHERE id = ?", [id]);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    }
};

const addBerita = async (judul, isi, tanggalTerbit, penulis) => {
    try {
        const [result] = await db.promise().query(
            "INSERT INTO berita (judul, isi, tanggalTerbit, penulis) VALUES (?, ?, ?, ?)",
            [judul, isi, tanggalTerbit, penulis]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const updateBerita = async (id, judul, isi, tanggalTerbit, penulis) => {
    try {
        const [result] = await db.promise().query(
            "UPDATE berita SET judul = ?, isi = ?, tanggalTerbit = ?, penulis = ? WHERE id = ?",
            [judul, isi, tanggalTerbit, penulis, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

const deleteBerita = async (id) => {
    try {
        const [result] = await db.promise().query("DELETE FROM berita WHERE id = ?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

export default { getAllBerita, getBeritaById, addBerita, updateBerita, deleteBerita };
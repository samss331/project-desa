import db from "../config/database.js";

const getAllPengumuman = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM pengumuman ORDER BY tanggalMulai DESC");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPengumumanById = async (id) => {
    try {
        const [result] = await db.promise().query(
            "SELECT * from pengumuman where id = ?", [id]);
        return result.length > 0? result[0] : null;
    } catch (error) {
        throw error
    }
}

const addPengumuman = async (judul, isi, tanggalMulai, tanggalSelesai) => {
    try {
        const [result] = await db.promise().query(
            "INSERT INTO pengumuman (judul, isi, tanggalMulai, tanggalSelesai) VALUES (?, ?, ?, ?)",
            [judul, isi, tanggalMulai, tanggalSelesai]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const updatePengumuman = async (id, judul, isi, tanggalMulai, tanggalSelesai) => {
    try {
        const [result] = await db.promise().query(
            "UPDATE  pengumuman SET judul = ?, isi = ?, tanggalMulai = ?, tanggalSelesai = ? where id = ?", [judul, isi, tanggalMulai, tanggalSelesai, id] 
        );
        console.log("SQL Query:", result, [judul, isi, tanggalMulai, tanggalSelesai]);
        return result.affectedRows > 0;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const deletePengumuman = async (id) => {
    try {
        const [result] = await db.promise().query(
            "DELETE from pengumuman where id = ?", [id])
        return result.affectedRows > 0;
    } catch (error) {
        throw error
    }
}

export default { getAllPengumuman, getPengumumanById, addPengumuman, updatePengumuman, deletePengumuman };
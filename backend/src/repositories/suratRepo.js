import db from "../config/database.js";

const addSuratMasuk = async (nomor_surat, perihal, file_surat) => {
    try {
        const [result] = await db.promise().query(
            "INSERT INTO surat_masuk (nomor_surat, perihal, file_surat) VALUES (?, ?, ?)",
            [nomor_surat, perihal, file_surat]);
            return result;
    } catch (error) {
        throw error;
    }
};

const addSuratKeluar = async (nomor_surat, perihal, file_surat) => {
    try {
        const [result] = await db.promise().query(
            "INSERT INTO surat_keluar (nomor_surat, perihal, file_surat) VALUES (?, ?, ?)",
            [nomor_surat, perihal, file_surat]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const getAllSuratMasuk = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM surat_masuk ORDER BY created_at DESC");
        return results;
    } catch (error) {
        throw error;
    }
}; 

const getAllSuratKeluar = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM surat_keluar ORDER BY created_at DESC");
        return results;
    } catch (error) {
        throw error;
    }
};

export default { addSuratMasuk, addSuratKeluar, getAllSuratMasuk, getAllSuratKeluar };
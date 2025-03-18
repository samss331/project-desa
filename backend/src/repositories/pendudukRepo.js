import db from "../config/database.js";

const getAllPenduduk = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPendudukByNik = async (nik) => {
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK WHERE nik =?", [nik]);
        return results.length ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

const addPenduduk = async (nama, nik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga) => {
    try {
        const [results] = await db.
        promise().
        query("INSERT INTO PENDUDUK (nama, nik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga) VALUES (?, ?, ?, ?, ?, ?, ?)", [nama, nik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga]);
        return {id: results.insertId, nama, nik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga};
    } catch (error) {   
        throw error;   
    }
};

const updateDataPenduduk = async (oldNik, nama, newNik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga) => {
    try {
        const [results] = await db.promise().query("UPDATE PENDUDUK SET nama = ?, nik = ?, alamat = ?, tanggalLahir = ?, jenisKelamin = ?, agama = ?, kepalaKeluarga = ? where nik =?", 
            [nama, newNik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga, oldNik]);
        return results;
    } catch (error) {
        throw error;
    }
}

const deleteDataPenduduk = async (nik) => {
    try {
        const [results] = await db.promise().query("DELETE FROM PENDUDUK WHERE nik = ?", [nik])
        return results.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}

const getTotalPenduduk = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK");
        return results[0].total;
    } catch (error) {
        throw error;
    }
}

const getTotalKepalaKeluarga = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK WHERE kepalaKeluarga = 1");
        return results[0].total;
    } catch (error) {
        throw error;
    }
};

const getTotalLakiLaki = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK WHERE jenisKelamin = 'laki-laki'");
        return results[0].total;
    } catch (error) {
        throw error;
    }
};

const getTotalPerempuan = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK WHERE jenisKelamin = 'perempuan'");
        return results[0].total;
    } catch (error) {
        throw error;
    }
};

const getPendudukByAgama = async () => {
    try {
        const [results] = await db.promise().query("SELECT agama, COUNT(*) AS total FROM PENDUDUK GROUP BY agama");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPendudukByUmur = async () => {
    try {
        const [results] = await db.promise().query(`
            SELECT 
                CASE 
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 12 THEN 'Anak-anak'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 19 THEN 'Remaja'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 35 THEN 'Dewasa Muda'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 59 THEN 'Dewasa'
                    ELSE 'Lansia'
                END AS kategori,
                COUNT(*) AS total
            FROM PENDUDUK
            GROUP BY kategori
        `);
        return results;
    } catch (error) {
        throw error;
    }
};

export default {getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk, getPendudukByAgama, getPendudukByUmur, getTotalKepalaKeluarga, getTotalLakiLaki, getTotalPenduduk, getTotalPerempuan};
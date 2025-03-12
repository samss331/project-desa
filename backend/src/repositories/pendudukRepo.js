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

const addPenduduk = async (nama, nik, alamat, tanggalLahir) => {
    try {
        const [results] = await db.
        promise().
        query("INSERT INTO PENDUDUK (nama, nik, alamat, tanggalLahir) VALUES (?, ?, ?, ?)", [nama, nik, alamat, tanggalLahir]);
        return {id: results.insertId, nama, nik, alamat, tanggalLahir};
    } catch (error) {   
        throw error;   
    }
};

const updateDataPenduduk = async (oldNik, nama, newNik, alamat, tanggalLahir) => {
    try {
        const [results] = await db.promise().query("UPDATE PENDUDUK SET nama = ?, nik = ?, alamat = ?, tanggalLahir = ? where nik =?", [nama, newNik, alamat, tanggalLahir, oldNik]);
        return results;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const deleteDataPenduduk = async (nik) => {
    try {
        console.log(nik)
        const [results] = await db.promise().query("DELETE FROM PENDUDUK WHERE nik = ?", [nik])
        return results.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}

export default {getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk};
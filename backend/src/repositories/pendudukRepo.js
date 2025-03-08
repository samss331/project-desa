import db from "../config/database.js";

const getAllPenduduk = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPendudukById = async (id) => {
    console.log("repo : ", id);
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK WHERE id =?", [id]);
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

const updateDataPenduduk = async (id, nama, nik, alamat, tanggalLahir) => {
    try {
        const [results] = await db.promise().query("UPDATE PENDUDUK SET nama = ?, nik = ?, alamat = ?, tanggalLahir = ? where id =?", [nama, nik, alamat, tanggalLahir, id]);
        return {id: results.id, nama, nik, alamat, tanggalLahir};
    } catch (error) {
        throw error;
    }
}

const deleteDataPenduduk = async (id) => {
    try {
        const [results] = await db.promise().query("DELETE FROM PENDUDUK WHERE id = ?", [id])
        return results.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}

export default {getAllPenduduk, getPendudukById, addPenduduk, updateDataPenduduk, deleteDataPenduduk};

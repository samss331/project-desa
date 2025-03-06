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
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK WHERE nik = ?", [nik]);
        return results.length ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

const addPenduduk = async (nama, nik, alamat) => {
    try {
        const [results] = await db.
        promise().
        query("INSERT INTO PENDUDUK (nama, nik, alamat) VALUES (?, ?, ?)", [nama, nik, alamat]);
        return results;
    } catch (error) {   
        throw error;   
    }
};

const updateDataPenduduk = async (nama, nik, alamat) => {
    try {
        const [results] = await db.promise().query("UPDATE PENDUDUK SET nama = ?, nik = ?, alamat = ? where nik = ?", [nama, nik, alamat, nik]);
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

export default {getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk};

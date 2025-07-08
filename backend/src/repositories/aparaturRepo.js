import db from "../config/database.js";

const getAllAparatur = async () => {
  try {
    const [results] = await db.promise().query("SELECT * FROM aparatur ORDER BY nama ASC");
    return results;
  } catch (error) {
    throw error;
  }
}

const getAparaturById = async (id) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM aparatur WHERE id = ?", [id]);
    return results[0];
  } catch (error) {
    throw error;
  }
}

const getAparaturByNip = async (nip) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM aparatur WHERE nip = ?", [nip]);
    return results[0];
  } catch (error) {
    throw error;
  }
}

const addAparatur = async (nama, nip, jabatan, foto = null, status = null) => {
  try {
    const [result] = await db.promise().query("INSERT INTO aparatur (nama, nip, jabatan, foto, status) VALUES (?, ?, ?, ?, ?)", [nama, nip, jabatan, foto, status]);
    return { id: result.insertId, nama, nip, jabatan, foto, status };
  } catch (error) {
    throw error;
  }
}

const updateAparatur = async (id, nama, nip, jabatan, foto = null, status = null) => {
  try {
    await db.promise().query("UPDATE aparatur SET nama = ?, nip = ?, jabatan = ?, foto = ?, status = ? WHERE id = ?", [nama, nip, jabatan, foto, status, id]);
    return getAparaturById(id);
  } catch (error) {
    throw error;
  }
}

const deleteAparatur = async (id) => {
  try {
    const result = await db.promise().query("DELETE FROM aparatur WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}

export default {
  getAllAparatur,
  getAparaturById,
  getAparaturByNip,
  addAparatur,
  updateAparatur,
  deleteAparatur
};

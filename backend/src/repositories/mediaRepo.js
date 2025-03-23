import db from "../config/database.js";

const addMedia = async (nama, tipe, file, deskripsi, thumbnail) => {
  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO Media (nama, tipe, file, deskripsi, thumbnail) VALUES (?, ?, ?, ?, ?)",
        [nama, tipe, file, deskripsi, thumbnail]
      );
    return { id: result.insertId, nama, tipe, file, deskripsi, thumbnail };
  } catch (error) {
    console.log("repo", error);
  }
};

const getAllMedia = async () => {
  const [results] = await db
    .promise()
    .query("SELECT * FROM Media ORDER BY id DESC");
  return results;
};

const getMediaById = async (id) => {
  const [result] = await db
    .promise()
    .query("SELECT * FROM Media WHERE id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

const updateMedia = async (id, nama, tipe, file, deskripsi, thumbnail) => {
  const [result] = await db
    .promise()
    .query(
      "UPDATE Media SET nama = ?, tipe = ?, file = ?, deskripsi = ?, thumbnail = ? WHERE id = ?",
      [nama, tipe, file, deskripsi, thumbnail, id]
    );
  return result.affectedRows > 0;
};

const deleteMedia = async (id) => {
  const [result] = await db
    .promise()
    .query("DELETE FROM Media WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export default {
  addMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

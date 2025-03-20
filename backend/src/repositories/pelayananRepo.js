import db from "../config/database.js";

const addPelayanan = async (nama_layanan, kategori, deskripsi, link_google_form) => {
    const [result] = await db.promise().query(
        "INSERT INTO Pelayanan (nama_layanan, kategori, deskripsi, link_google_form) VALUES (?, ?, ?, ?)",
        [nama_layanan, kategori, deskripsi, link_google_form]
    );
    return { id: result.insertId, nama_layanan, kategori, deskripsi, link_google_form };
};

const getAllPelayanan = async () => {
    const [results] = await db.promise().query("SELECT * FROM Pelayanan ORDER BY id DESC");
    return results;
};

const getPelayananById = async (id) => {
    const [result] = await db.promise().query("SELECT * FROM Pelayanan WHERE id = ?", [id]);
    return result.length > 0 ? result[0] : null;
};

const updatePelayanan = async (id, nama_layanan, kategori, deskripsi, link_google_form) => {
    const [result] = await db.promise().query(
        "UPDATE Pelayanan SET nama_layanan = ?, kategori = ?, deskripsi = ?, link_google_form = ? WHERE id = ?",
        [nama_layanan, kategori, deskripsi, link_google_form, id]
    );
    return result.affectedRows > 0;
};

const deletePelayanan = async (id) => {
    const [result] = await db.promise().query("DELETE FROM Pelayanan WHERE id = ?", [id]);
    return result.affectedRows > 0;
};

export default { addPelayanan, getAllPelayanan, getPelayananById, updatePelayanan, deletePelayanan };

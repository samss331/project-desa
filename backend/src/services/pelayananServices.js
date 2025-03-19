import pelayananRepo from "../repositories/pelayananRepo.js";

const addPelayanan = async (nama_layanan, kategori, deskripsi, link_google_form) => {
    if (!nama_layanan || !kategori || !deskripsi || !link_google_form) {
        throw new Error("Semua data wajib diisi!");
    }

    return await pelayananRepo.addPelayanan(nama_layanan, kategori, deskripsi, link_google_form);
};

const getAllPelayanan = async () => {
    return await pelayananRepo.getAllPelayanan();
};

const getPelayananById = async (id) => {
    const result = await pelayananRepo.getPelayananById(id);
    if (!result) {
        throw new Error("Pelayanan tidak ditemukan!");
    }
    return result;
};

const updatePelayanan = async (id, nama_layanan, kategori, deskripsi, link_google_form) => {
    const updated = await pelayananRepo.updatePelayanan(id, nama_layanan, kategori, deskripsi, link_google_form);
    if (!updated) throw new Error("Pelayanan tidak ditemukan!");
    return updated;
};

const deletePelayanan = async (id) => {
    const existing = await pelayananRepo.getPelayananById(id);
    if (!existing) {
        throw new Error("Pelayanan tidak ditemukan!");
    }

    return await pelayananRepo.deletePelayanan(id);
};

export default { addPelayanan, getAllPelayanan, getPelayananById,updatePelayanan, deletePelayanan };

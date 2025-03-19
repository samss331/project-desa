import mediaRepo from "../repositories/mediaRepo.js";

const allowedTypes = {
    foto: ["image/jpeg", "image/png", "image/jpg"],
    video: ["video/mp4", "video/mkv", "video/webm"],
    dokumen: ["application/pdf"]
};

const addMedia = async (nama, tipe, file, deskripsi) => {

    if (!nama || !tipe || !file || !deskripsi) {
        throw new Error("Semua data wajib diisi!");
    }

    if (!allowedTypes[tipe]){
        throw new Error("Tipe media yang ditambahkan tidak valid!")
    }
    
    if(!allowedTypes[tipe].includes(file.mimetype)){
        throw new Error(`Format file yang ditambahkan tidak didukung untuk tipe ${tipe}`)
    }

    return await mediaRepo.addMedia(nama, tipe, file.filename, deskripsi);
};

const getAllMedia = async () => {
    return await mediaRepo.getAllMedia();
};

const getMediaById = async (id) => {
    const result = await mediaRepo.getMediaById(id);
    if (!result) {
        throw new Error("Media tidak ditemukan!");
    }
    return result;
};

const updateMedia = async (id, nama, tipe, file, deskripsi) => {
    const updated = await mediaRepo.updateMedia(id, nama, tipe, file ? file.filename : existing.file , deskripsi);
    const existing = await mediaRepo.getMediaById(id);
    if (!existing) throw new Error("Media tidak ditemukan!");
    if (file && !allowedTypes[tipe].includes(file.mimetype)) {
        throw new Error(`Format file tidak didukung untuk tipe ${tipe}!`);
    }

    return updated
};

const deleteMedia = async (id) => {
    const existing = await mediaRepo.getMediaById(id);
    if (!existing) {
        throw new Error("Media tidak ditemukan!");
    }

    return await mediaRepo.deleteMedia(id);
};

export default { addMedia, getAllMedia, getMediaById, updateMedia, deleteMedia };

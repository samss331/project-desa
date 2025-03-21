import mediaRepo from "../repositories/mediaRepo.js";
import {MediaDTO} from "../dto/dto.js" 

const allowedTypes = {
    foto: ["image/jpeg", "image/png", "image/jpg"],
    video: ["video/mp4", "video/mkv", "video/webm"],
    dokumen: ["application/pdf"]
};

const addMedia = async (nama, tipe, file, deskripsi) => {
    if (!nama || !tipe || !file || !deskripsi) {
        throw new Error("Semua data wajib diisi!");
    }

    if (!allowedTypes[tipe]) {
        throw new Error("Tipe media yang ditambahkan tidak valid!");
    }
    
    if (!allowedTypes[tipe].includes(file.mimetype)) {
        throw new Error(`Format file yang ditambahkan tidak didukung untuk tipe ${tipe}`);
    }

    const result = await mediaRepo.addMedia(nama, tipe, file.filename, deskripsi);
    return new MediaDTO(result.id, result.nama, result.tipe, result.file, result.deskripsi);
};

const getAllMedia = async () => {
    const results = await mediaRepo.getAllMedia();
    return results.map(media => new MediaDTO(media.id, media.nama, media.tipe, media.file, media.deskripsi));
};

const getMediaById = async (id) => {
    const result = await mediaRepo.getMediaById(id);
    if (!result) {
        throw new Error("Media tidak ditemukan!");
    }
    return new MediaDTO(result.id, result.nama, result.tipe, result.file, result.deskripsi);
};

const updateMedia = async (id, nama, tipe, file, deskripsi) => {
    const existing = await mediaRepo.getMediaById(id);
    if (!existing) throw new Error("Media tidak ditemukan!");
    if (file && !allowedTypes[tipe].includes(file.mimetype)) {
        throw new Error(`Format file tidak didukung untuk tipe ${tipe}!`);
    }
    
    const updated = await mediaRepo.updateMedia(id, nama, tipe, file ? file.filename : existing.file, deskripsi);
    return new MediaDTO(updated.id, updated.nama, updated.tipe, updated.file, updated.deskripsi);
};

const deleteMedia = async (id) => {
    const existing = await mediaRepo.getMediaById(id);
    if (!existing) {
        throw new Error("Media tidak ditemukan!");
    }
    return await mediaRepo.deleteMedia(id);
};

export default { addMedia, getAllMedia, getMediaById, updateMedia, deleteMedia };

import beritaRepository from "../repositories/beritaRepo.js";
import { BeritaDTO } from "../dto/dto.js";

const addBerita = async (judul, isi, tanggalTerbit, penulis) => {
    if (!judul || !isi || !tanggalTerbit || !penulis) {
        throw new Error("Semua data wajib diisi!");
    }

    const result = await beritaRepository.addBerita(judul, isi, tanggalTerbit, penulis);
    return new BeritaDTO(result.id, judul, isi, tanggalTerbit, penulis);
};

const getAllBerita = async () => {
    const result = await beritaRepository.getAllBerita();
    return result.map((b) => new BeritaDTO(b.id, b.judul, b.isi, b.tanggalTerbit, b.penulis));
};

const getBeritaById = async (id) => {
    const result = await beritaRepository.getBeritaById(id);
    if (!result) {
        throw new Error("Berita tidak ditemukan");
    }
    return new BeritaDTO(result.id, result.judul, result.isi, result.tanggalTerbit, result.penulis);
};

const updateBerita = async (id, judul, isi, tanggalTerbit, penulis) => {
    const existing = await beritaRepository.getBeritaById(id);
    if (!existing) {
        return false;
    }

    return await beritaRepository.updateBerita(id, judul, isi, tanggalTerbit, penulis);
};

const deleteBerita = async (id) => {
    const existing = await beritaRepository.getBeritaById(id);
    if (!existing) {
        return false;
    }
    return await beritaRepository.deleteBerita(id);
};

export default { addBerita, getAllBerita, getBeritaById, updateBerita, deleteBerita };

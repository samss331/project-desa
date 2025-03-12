import pengumumanRepository from "../repositories/pengumumanRepo.js";
import { PengumumanDTO } from "../dto/dto.js";

const addPengumuman = async (judul, isi, tanggalMulai, tanggalSelesai) => {
    if(!judul || !isi || !tanggalMulai || !tanggalSelesai){
        throw new Error("Semua data wajib diisi!");
    }

    const result = await pengumumanRepository.addPengumuman(judul, isi, tanggalMulai, tanggalSelesai);
    return new PengumumanDTO(result.id, judul, isi, tanggalMulai, tanggalSelesai);
}

const getAllPengumuman = async () => {
    const result = await pengumumanRepository.getAllPengumuman();
    return result.map(p => new PengumumanDTO(p.id, p.judul, p.isi, p.tanggalMulai, p.tanggalSelesai))
}

const getPengumumanById = async (id) => {
    const result = await pengumumanRepository.getPengumumanById(id);
    if(!result){
        throw new Error("Pengumuman tidak ditemukan")
    }
    return new PengumumanDTO(result.id, result.judul, result.isi, result.tanggalMulai, result.tanggalSelesai);
}

const updatePengumuman = async (id, judul, isi, tanggalMulai, tanggalSelesai) => {
    const existing = await pengumumanRepository.getPengumumanById(id)
    if(!existing){
        return false;
    }

    const updated = await pengumumanRepository.updatePengumuman(id, judul, isi, tanggalMulai, tanggalSelesai);
    return updated;
}

const deletePengumuman = async (id) => {
    const existing = await pengumumanRepository.getPengumumanById(id);
    if(!existing){
        return false;
    }
    return await pengumumanRepository.deletePengumuman(id);
}

export default {addPengumuman, getAllPengumuman, getPengumumanById, updatePengumuman, deletePengumuman};
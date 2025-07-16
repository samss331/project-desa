import pengumumanRepository from "../repositories/pengumumanRepo.js";
import { pengumumanDTO } from "../dto/dto.js";

const addPengumuman = async (judul, isi, tanggal_mulai, tanggal_selesai) => {
  if (!judul || !isi || !tanggal_mulai || !tanggal_selesai) {
    throw new Error("Semua data wajib diisi!");
  }

  const result = await pengumumanRepository.addPengumuman(
    judul,
    isi,
    tanggal_mulai,
    tanggal_selesai
  );
  return new pengumumanDTO(
    result.id,
    judul,
    isi,
    tanggal_mulai,
    tanggal_selesai
  );
};

const getAllPengumuman = async () => {
  const result = await pengumumanRepository.getAllPengumuman();
  return result.map(
    (p) =>
      new pengumumanDTO(
        p.id,
        p.judul,
        p.isi,
        p.tanggal_mulai,
        p.tanggal_selesai
      )
  );
};

const getPengumumanById = async (id) => {
  const result = await pengumumanRepository.getPengumumanById(id);
  if (!result) {
    throw new Error("Pengumuman tidak ditemukan");
  }
  return new pengumumanDTO(
    result.id,
    result.judul,
    result.isi,
    result.tanggal_mulai,
    result.tanggal_selesai
  );
};

const updatePengumuman = async (
  id,
  judul,
  isi,
  tanggal_mulai,
  tanggal_selesai
) => {
  const existing = await pengumumanRepository.getPengumumanById(id);
  if (!existing) {
    return false;
  }

  const updated = await pengumumanRepository.updatePengumuman(
    id,
    judul,
    isi,
    tanggal_mulai,
    tanggal_selesai
  );
  return updated;
};

const deletePengumuman = async (id) => {
  const existing = await pengumumanRepository.getPengumumanById(id);
  if (!existing) {
    return false;
  }
  return await pengumumanRepository.deletePengumuman(id);
};

export default {
  addPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman,
};

import aparaturRepo from "../repositories/aparaturRepo.js";
import { AparaturDTO } from "../dto/dto.js";

const getAllAparatur = async () => {
  try {
    const results = await aparaturRepo.getAllAparatur();
    return results.map(
      (a) => new AparaturDTO(a.id, a.nama, a.nip, a.jabatan, a.foto, a.status)
    );
  } catch (error) {
    throw new Error("Gagal mengambil data aparatur: " + error.message);
  }
}

const getAparaturById = async (id) => {
  try {
    const result = await aparaturRepo.getAparaturById(id);
    if (!result) {
      return null;
    }
    return new AparaturDTO(result.id, result.nama, result.nip, result.jabatan, result.foto, result.status);
  } catch (error) {
    throw new Error("Gagal mengambil data aparatur berdasarkan ID");
  }
}

const getAparaturByNip = async (nip) => {
  try {
    const result = await aparaturRepo.getAparaturByNip(nip);
    if (!result) {
      return null;
    }
    return new AparaturDTO(result.id, result.nama, result.nip, result.jabatan, result.foto, result.status);
  } catch (error) {
    throw new Error("Gagal mengambil data aparatur berdasarkan NIP");
  }
}

const addAparatur = async (nama, nip, jabatan, foto = null, status = null) => {
  if (!nama || !nip || !jabatan) {
    throw new Error("Nama, NIP, dan Jabatan aparatur wajib diisi!");
  }

  const existing = await aparaturRepo.getAparaturByNip(nip);
  if (existing) {
    throw new Error("NIP aparatur sudah terdaftar!");
  }

  try {
    const result = await aparaturRepo.addAparatur(nama, nip, jabatan, foto, status);
    return new AparaturDTO(result.id, result.nama, result.nip, result.jabatan, result.foto, result.status);
  } catch (error) {
    throw new Error("Gagal menambahkan data aparatur");
  }
}

const updateAparatur = async (id, nama, nip, jabatan, foto = null, status = null) => {
  const existingById = await aparaturRepo.getAparaturById(id);
  if (!existingById) {
    throw new Error("Data aparatur tidak ditemukan");
  }

  if (!nama || !nip || !jabatan) {
    throw new Error("Nama, NIP, dan Jabatan aparatur wajib diisi!");
  }

  const existingByNip = await aparaturRepo.getAparaturByNip(nip);
  if (existingByNip && existingByNip.id !== id) {
    throw new Error("NIP aparatur sudah terdaftar!");
  }

  try {
    const updatedAparatur = await aparaturRepo.updateAparatur(id, nama, nip, jabatan, foto, status);
    return new AparaturDTO(updatedAparatur.id, updatedAparatur.nama, updatedAparatur.nip, updatedAparatur.jabatan, updatedAparatur.foto, updatedAparatur.status);
  } catch (error) {
    throw new Error("Gagal memperbarui data aparatur");
  }
}

const deleteAparatur = async (id) => {
  const existing = await aparaturRepo.getAparaturById(id);
  if (!existing) {
    throw new Error("Data aparatur tidak ditemukan");
  }

  try {
    const result = await aparaturRepo.deleteAparatur(id);
    return result;
  } catch (error) {
    throw new Error("Gagal menghapus data aparatur");
  }
}

export default {
  getAllAparatur,
  getAparaturById,
  getAparaturByNip,
  addAparatur,
  updateAparatur,
  deleteAparatur,
};


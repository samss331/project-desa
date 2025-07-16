import beritaRepository from "../repositories/beritaRepo.js";
import { beritaDTO } from "../dto/dto.js";
import fs from "fs";
import path from "path";

const addBerita = async (
  judul,
  foto,
  isi,
  tanggal_terbit,
  penulis,
  status = "Draft"
) => {
  if (!judul || !isi || !tanggal_terbit || !penulis) {
    throw new Error("Judul, isi, tanggal terbit, dan penulis wajib diisi!");
  }

  // Foto bisa null/undefined
  const fotoPath = foto ? foto.filename : null;

  const result = await beritaRepository.addBerita(
    judul,
    fotoPath,
    isi,
    tanggal_terbit,
    penulis,
    status
  );
  return new beritaDTO(
    result.id,
    result.judul,
    result.foto,
    result.isi,
    result.tanggal_terbit,
    result.penulis,
    result.status,
    result.kategori
  );
};

const getAllBerita = async () => {
  const result = await beritaRepository.getAllBerita();
  return result.map(
    (b) =>
      new beritaDTO(
        b.id,
        b.judul,
        b.foto,
        b.isi,
        b.tanggal_terbit,
        b.penulis,
        b.status,
        b.kategori
      )
  );
};

const getBeritaByStatus = async (status) => {
  const result = await beritaRepository.getBeritaByStatus(status);
  return result.map(
    (b) =>
      new beritaDTO(
        b.id,
        b.judul,
        b.foto,
        b.isi,
        b.tanggal_terbit,
        b.penulis,
        b.status,
        b.kategori
      )
  );
};

const getBeritaById = async (id) => {
  const result = await beritaRepository.getBeritaById(id);
  if (!result) {
    throw new Error("Berita tidak ditemukan");
  }
  return new beritaDTO(
    result.id,
    result.judul,
    result.foto,
    result.isi,
    result.tanggal_terbit,
    result.penulis,
    result.status,
    result.kategori
  );
};

const updateBerita = async (
  id,
  judul,
  foto,
  isi,
  tanggal_terbit,
  penulis,
  status
) => {
  const existing = await beritaRepository.getBeritaById(id);
  if (!existing) {
    return false;
  }

  // Jika ada foto baru, hapus foto lama jika ada
  let fotoPath = existing.foto;
  if (foto) {
    // Hapus foto lama jika ada
    if (existing.foto) {
      try {
        const oldFilePath = path.join("public", existing.foto);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (error) {
        console.error("Error deleting old file:", error);
      }
    }

    // Set path foto baru
    fotoPath = `/uploads/berita/${foto.filename}`;
  }

  return await beritaRepository.updateBerita(
    id,
    judul,
    fotoPath,
    isi,
    tanggal_terbit,
    penulis,
    status
  );
};

const deleteBerita = async (id) => {
  const existing = await beritaRepository.getBeritaById(id);
  if (!existing) {
    return false;
  }

  // Hapus file foto jika ada
  if (existing.foto) {
    try {
      const filePath = path.join("public", existing.foto);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return await beritaRepository.deleteBerita(id);
};

export default {
  addBerita,
  getAllBerita,
  getBeritaById,
  getBeritaByStatus,
  updateBerita,
  deleteBerita,
};

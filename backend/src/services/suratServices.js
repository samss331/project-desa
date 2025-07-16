import suratRepo from "../repositories/suratRepo.js";
import { surat_masukDTO, surat_keluarDTO } from "../dto/dto.js";

const addSuratMasuk = async (
  nomor_surat,
  pengirim,
  perihal,
  tanggal_terima,
  file
) => {
  if (!nomor_surat || !pengirim || !perihal || !tanggal_terima) {
    throw new Error("Semua data wajib diisi!");
  }

  const result = await suratRepo.addSuratMasuk(
    nomor_surat,
    pengirim,
    perihal,
    tanggal_terima,
    file.filename
  );
  return new surat_masukDTO(
    result.id,
    result.nomor_surat,
    result.pengirim,
    result.perihal,
    result.tanggal_terima,
    result.file
  );
};

const addSuratKeluar = async (
  nomor_surat,
  penerima,
  perihal,
  tanggal_kirim,
  file
) => {
  if (!nomor_surat || !penerima || !perihal || !tanggal_kirim) {
    throw new Error("Semua data wajib diisi!");
  }

  const result = await suratRepo.addSuratKeluar(
    nomor_surat,
    penerima,
    perihal,
    tanggal_kirim,
    file.filename
  );
  return new surat_keluarDTO(
    result.id,
    result.nomor_surat,
    result.penerima,
    result.perihal,
    result.tanggal_kirim,
    result.file
  );
};

const getAllSuratMasuk = async () => {
  const results = await suratRepo.getAllSuratMasuk();
  return results.map(
    (s) =>
      new surat_masukDTO(
        s.id,
        s.nomor_surat,
        s.pengirim,
        s.perihal,
        s.tanggal_terima,
        s.file
      )
  );
};

const getAllSuratKeluar = async () => {
  const results = await suratRepo.getAllSuratKeluar();
  return results.map(
    (s) =>
      new surat_keluarDTO(
        s.id,
        s.nomor_surat,
        s.penerima,
        s.perihal,
        s.tanggal_kirim,
        s.file
      )
  );
};

const getSuratMasukById = async (id) => {
  const result = await suratRepo.getSuratMasukById(id);
  if (!result) {
    throw new Error("Surat masuk tidak ditemukan!");
  }
  return new surat_masukDTO(
    result.id,
    result.nomor_surat,
    result.pengirim,
    result.perihal,
    result.tanggal_terima,
    result.file
  );
};

const getSuratKeluarById = async (id) => {
  const result = await suratRepo.getSuratKeluarById(id);
  if (!result) {
    throw new Error("Surat keluar tidak ditemukan!");
  }
  return new surat_keluarDTO(
    result.id,
    result.nomor_surat,
    result.penerima,
    result.perihal,
    result.tanggal_kirim,
    result.file
  );
};

const updateSuratMasuk = async (
  id,
  nomor_surat,
  pengirim,
  perihal,
  tanggal_terima,
  file
) => {
  const existing = await suratRepo.getSuratMasukById(id);
  if (!existing) {
    return new Error("Surat tidak ditemukan");
  }

  const updated = await suratRepo.updateSuratMasuk(
    id,
    nomor_surat,
    pengirim,
    perihal,
    tanggal_terima,
    file.filename
  );
  return updated;
};

const updateSuratKeluar = async (
  id,
  nomor_surat,
  penerima,
  perihal,
  tanggal_kirim,
  file
) => {
  const existing = await suratRepo.getSuratKeluarById(id);
  if (!existing) {
    return new Error("Surat tidak ditemukan");
  }

  const updated = await suratRepo.updateSuratKeluar(
    id,
    nomor_surat,
    penerima,
    perihal,
    tanggal_kirim,
    file.filename
  );
  return updated;
};

const deleteSuratMasuk = async (id) => {
  const existing = await suratRepo.getSuratMasukById(id);
  if (!existing) {
    return false;
  }

  return await suratRepo.deleteSuratMasuk(id);
};

const deleteSuratKeluar = async (id) => {
  const existing = await suratRepo.getSuratKeluarById(id);
  if (!existing) {
    return false;
  }

  return await suratRepo.deleteSuratKeluar(id);
};

export default {
  addSuratMasuk,
  getAllSuratMasuk,
  updateSuratMasuk,
  deleteSuratMasuk,
  getSuratMasukById,
  addSuratKeluar,
  getAllSuratKeluar,
  updateSuratKeluar,
  deleteSuratKeluar,
  getSuratKeluarById,
};

import suratRepo from "../repositories/suratRepo.js";
import { SuratMasukDTO, SuratKeluarDTO } from "../dto/dto.js";

const addSuratMasuk = async (nomorSurat, pengirim, perihal, tanggalTerima, file) => {
    if (!nomorSurat || !pengirim || !perihal || !tanggalTerima) {
        throw new Error("Semua data wajib diisi!");
    }

    const result = await suratRepo.addSuratMasuk(nomorSurat, pengirim, perihal, tanggalTerima, file);
    return new SuratMasukDTO(result.id, result.nomorSurat, result.pengirim, result.perihal, result.tanggalTerima);
};

const addSuratKeluar = async (nomorSurat, penerima, perihal, tanggalKirim, file) => {
    if (!nomorSurat || !penerima || !perihal || !tanggalKirim) {
        throw new Error("Semua data wajib diisi!");
    }

    const result = await suratRepo.addSuratKeluar(nomorSurat, penerima, perihal, tanggalKirim, file);
    return new SuratKeluarDTO(result.id, result.nomorSurat, result.penerima, result.perihal, result.tanggalKirim);
};

const getAllSuratMasuk = async () => {
    const results = await suratRepo.getAllSuratMasuk();
    return results.map(s => new SuratMasukDTO(s.id, s.nomorSurat, s.pengirim, s.perihal, s.tanggalTerima));
};

const getAllSuratKeluar = async () => {
    const results = await suratRepo.getAllSuratKeluar();
    return results.map(s => new SuratKeluarDTO(s.id, s.nomorSurat, s.penerima, s.perihal, s.tanggalKirim));
};

const getSuratMasukById = async (id) => {
    const result = await suratRepo.getSuratMasukById(id);
    if (!result) {
        throw new Error("Surat masuk tidak ditemukan!");
    }
    return new SuratMasukDTO(result.id, result.nomorSurat, result.pengirim, result.perihal, result.tanggalTerima);
};

const getSuratKeluarById = async (id) => {
    const result = await suratRepo.getSuratKeluarById(id);
    if (!result) {
        throw new Error("Surat keluar tidak ditemukan!");
    }
    return new SuratKeluarDTO(result.id, result.nomorSurat, result.penerima, result.perihal, result.tanggalKirim);
};

const updateSuratMasuk = async (id, nomorSurat, pengirim, perihal, tanggalTerima, file) => {
    const existing = await suratRepo.getSuratMasukById(id);
    if (!existing) {
        return false;
    }

    const updated = await suratRepo.updateSuratMasuk(id, nomorSurat, pengirim, perihal, tanggalTerima, file);
    return updated;
};

const updateSuratKeluar = async (id, nomorSurat, penerima, perihal, tanggalKirim, file) => {
    const existing = await suratRepo.getSuratKeluarById(id);
    if (!existing) {
        return false;
    }

    const updated = await suratRepo.updateSuratKeluar(id, nomorSurat, penerima, perihal, tanggalKirim, file);
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
    addSuratMasuk, getAllSuratMasuk, updateSuratMasuk, deleteSuratMasuk, getSuratMasukById,
    addSuratKeluar, getAllSuratKeluar, updateSuratKeluar, deleteSuratKeluar, getSuratKeluarById
};
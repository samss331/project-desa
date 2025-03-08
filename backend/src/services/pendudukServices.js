import pendudukRepo from "../repositories/pendudukRepo.js";
import { PendudukDTO } from "../dto/dto.js";

const getAllPenduduk = async () => {
    try {
        const results = await pendudukRepo.getAllPenduduk();
        return results.map(p => new PendudukDTO(p.id, p.nama, p.nik, p.alamat, p.tanggalLahir));
    } catch (error) {
        throw new Error("Gagal mengambil data semua penduduk");
    }
};

const getPendudukById = async (id) => {
    console.log("service : ", id);
    try {
        const result = await pendudukRepo.getPendudukById(id);
        if (!result) {
            return { success: false, message: "Data tidak ditemukan" };
        }
        return new PendudukDTO(result.id, result.nama, result.nik, result.alamat, result.tanggalLahir);
    } catch (error) {
        throw new Error("Gagal mengambil data penduduk berdasarkan NIK");
    }
};

const addPenduduk = async (nama, nik, alamat, tanggalLahir) => {
    if (!nama || !nik || !alamat || !tanggalLahir) {
        throw new Error("Semua data wajib diisi!");
    }
    try {
        const result = await pendudukRepo.addPenduduk(nama, nik, alamat, tanggalLahir);
        console.log(result);
        return new PendudukDTO(result.id, result.nama, result.nik, result.alamat, result.tanggalLahir);;
    } catch (error) {
        throw new Error("Gagal menambahkan data penduduk");
    }
};

const updateDataPenduduk = async (id, nama, nik, alamat, tanggalLahir) => {
    try {
        console.log("service : ", id);
        const existing = await pendudukRepo.getPendudukById(id);
        if (!existing) {
            return { success: false, message: "Data dengan NIK tersebut tidak ditemukan" };
        }
        const result = await pendudukRepo.updateDataPenduduk(id, nama, nik, alamat, tanggalLahir);
        return new PendudukDTO(result.id, result.nama, result.nik, result.alamat, result.tanggalLahir);
    } catch (error) {
        throw error;
    }
};

const deleteDataPenduduk = async (id) => {
    try {
        const existing = await pendudukRepo.getPendudukById(id);
        if (!existing) {
            return { success: false, message: "Data dengan NIK tersebut tidak ditemukan" };
        }
        const isDeleted = await pendudukRepo.deleteDataPenduduk(id);
        if (!isDeleted) {
            return { success: false, message: "Gagal menghapus data" };
        }
        return { success: true, message: "Data berhasil dihapus" };
    } catch (error) {
        throw error;
    }
};

export default { getAllPenduduk, getPendudukById, addPenduduk, updateDataPenduduk, deleteDataPenduduk };

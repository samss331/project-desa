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

const getPendudukByNik = async (nik) => {
    try {
        const result = await pendudukRepo.getPendudukByNik(nik);
        if (!result) {
            return { success: false, message: "Data tidak ditemukan" };
        }
        return new PendudukDTO(result.id, result.nama, result.nik, result.alamat, result.tanggalLahir);
    } catch (error) {
        console.log(error)
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

const updateDataPenduduk = async (oldNik, nama, newNik, alamat, tanggalLahir) => {
    const existingPenduduk = await pendudukRepo.getPendudukByNik(oldNik);
    if (!existingPenduduk) {
        throw new Error("Data dengan NIK tersebut tidak ditemukan");
    }

    if (newNik !== oldNik) {
        const nikExists = await pendudukRepo.getPendudukByNik(newNik);
        if (nikExists) {
            throw new Error("NIK baru sudah digunakan oleh penduduk lain");
        }
    }

    await pendudukRepo.updateDataPenduduk(oldNik, nama, newNik, alamat, tanggalLahir);
    return { success: true, message: "Data berhasil diperbarui", nama, newNik, alamat, tanggalLahir };
};

const deleteDataPenduduk = async (nik) => {
    try {
        const existingPenduduk = await pendudukRepo.getPendudukByNik(nik);
        if (!existingPenduduk) {
            return { success: false, message: "Data dengan NIK tersebut tidak ditemukan" };
        }
        const isDeleted = await pendudukRepo.deleteDataPenduduk(nik);
        console.log(nik)
        if (!isDeleted) {
            return { success: false, message: "Gagal menghapus data" };
        }
        return { success: true, message: "Data berhasil dihapus" };
    } catch (error) {
        throw error;
    }
};

export default { getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk };

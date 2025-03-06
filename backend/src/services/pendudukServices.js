import pendudukRepo from "../repositories/pendudukRepo.js";

const getAllPenduduk = async () => {
    try {
        const results = await pendudukRepo.getAllPenduduk();
        return results;
    } catch (error) {
        throw new Error('Gagal mengambil data semua penduduk');
    }
};

const getPendudukByNik = async (nik) => {
    try {
        const results = await pendudukRepo.getPendudukByNik(nik);
        if(!results){
            return {success: false, message: "Data tidak ditemukan"};
        }
        return results;
    } catch (error) {
        throw new Error("Gagal mengambil data penduduk berdasarkan nik")
    }
};

const addPenduduk = async (nama, nik, alamat) => {
    if (!nama || !nik || !alamat){
        throw new Error("Nama dan alamat wajib diisi!");
    } 
    try {
        const results = await pendudukRepo.addPenduduk(nama, nik, alamat);
        return results 
    } catch (error) {
        throw new Error("Gagal menambahkan data penduduk")
    }
};

const updateDataPenduduk = async (nama, nik, alamat) => {
    try {
        const existing = await pendudukRepo.getPendudukByNik(nik);
        if(!existing){
            return {success: false, message: "Data dengan Nik tersebut tidak ditemukan"};
        }
        const results = await pendudukRepo.updateDataPenduduk(nama, nik, alamat);
        return results;
    } catch (error) {
        throw error;
    }
}

const deleteDataPenduduk = async (nik) => {
    try {
        const existing = await pendudukRepo.getPendudukByNik(nik);
        if(!existing){
            return {success: false, message: "Data dengan Nik tersebut tidak ditemukan"};
        }
        const isDeleted = await pendudukRepo.deleteDataPenduduk(nik);
        if (!isDeleted) {
            return { success: false, message: "Gagal menghapus data" };
        }
        return { success: true, message: "Data berhasil dihapus" };
    } catch (error) {
        throw error;
    }
}

export default { getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk };

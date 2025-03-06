import suratRepo from "../repositories/suratRepo.js";

const addSuratMasuk = async(nomor_surat, perihal, file_surat) => {
    if(!nomor_surat || !perihal || !file_surat){
        throw new Error("Semua Data Harus Disi!");
    }

    return await suratRepo.addSuratMasuk(nomor_surat, perihal, file_surat);
}

const addSuratKeluar = async(nomor_surat, perihal, file_surat) =>{
    if(!nomor_surat || !perihal || !file_surat){
        throw new Error("Semua Data Harus Disi!");
    }

    return await suratRepo.addSuratKeluar(nomor_surat, perihal, file_surat);
}

const getAllSuratMasuk = async () => {
    return await suratRepo.getAllSuratMasuk();
};

const getAllSuratKeluar = async () => {
    return await suratRepo.getAllSuratKeluar();
};

export default {addSuratMasuk, addSuratKeluar, getAllSuratMasuk, getAllSuratKeluar};
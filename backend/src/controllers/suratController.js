import suratServices from "../services/suratServices.js";

console.log("Endpoint addSuratMasuk dipanggil");

const addSuratMasuk = async (req, res) => {
    try {
        const {nomor_surat, perihal} = req.body;
        const file_surat = req.file ? req.file.filename : null;

        console.log("Data yang diterima dari request:", { nomor_surat, perihal, file_surat });

        const result = await suratServices.addSuratMasuk(nomor_surat, perihal, file_surat);
        console.log("Hasil query MySQL:", result);
        res.status(201).json({succes: true, message: "Surat berhasil di tambahkan"});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
}

const addSuratKeluar = async (req, res) => {
    try {
        const {nomor_surat, perihal} = req.body;
        const file_surat = req.file ? req.file.filename : null;

        await suratServices.addSuratKeluar(nomor_surat, perihal, file_surat);
        res.status(201).json({succes: true, message: "Surat berhasil ditambahkan"})
    } catch (error) {
        res.status(400).json({succes: false, message: "Semua data harus diisi!"})
    }
}

const getAllSuratMasuk = async (req, res) => {
    try {
        const data = await suratServices.getAllSuratMasuk()
        res.status(200).json({succes: true, message: data});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message})
    }
};

const getAllSuratKeluar = async (req, res) => {
    try {
        const data = await suratServices.getAllSuratKeluar()
        res.status(200).json({succes: true, message: data});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message})
    }
};

export default {addSuratMasuk, addSuratKeluar, getAllSuratMasuk, getAllSuratKeluar};
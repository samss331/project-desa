import pengumumanServices from "../services/pengumumanServices.js"

const addPengumuman = async (req, res) =>  {
    try {
        const {judul, isi, tanggalMulai, tanggalSelesai} = req.body
        const result = await pengumumanServices.addPengumuman(judul, isi, tanggalMulai, tanggalSelesai) 
        res.status(201).json({success: true, message: "Pengumuman berhasil ditambahkan", data: result})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message});
    }
}

const getAllPengumuman = async (req, res) => {
    try {
        const data = await pengumumanServices.getAllPengumuman();
        res.json({success: true, data})
    } catch (error) {
        throw error;
    }
}

const getPengumumanById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pengumumanServices.getPengumumanById(id)
        if(!result) {
            return res.status(404).json({success: true, message: "Data tidak ditemukan"})
        }
        res.json({success: true, data: result})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const updatePengumuman = async (req, res) => {
    try {
        const {id} = req.params;
        const {judul, isi, tanggalMulai, tanggalSelesai} = req.body;
        const result = await pengumumanServices.updatePengumuman(id, judul, isi, tanggalMulai, tanggalSelesai);
        res.json({success: true, message: "Data berhasil diperbarui!"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
};

const deletePengumuman = async (req, res) => {
    try {
        const {id} = req.params
        const result = await pengumumanServices.deletePengumuman(id);
        if(!result){
            return res.status(404).json(result)
        }
        res.json({success: true, message: "Data berhasil dihapus"})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export default {addPengumuman, getAllPengumuman, getPengumumanById, updatePengumuman, deletePengumuman}
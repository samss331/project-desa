import pendudukServices from "../services/pendudukServices.js"

const getAllPenduduk  = async (req, res) =>{
    try {
        const results = await pendudukServices.getAllPenduduk();
        res.json({success: true, data: results});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const getPendudukByNik = async (req, res) => {
    const {nik} = req.params;
    try {
        const results = await pendudukServices.getPendudukByNik(nik);
        res.status(201).json({success: true, data: results});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const addPenduduk = async (req, res) =>{
    const {nama, nik, alamat} = req.body;

    try {
        const results = await pendudukServices.addPenduduk(nama, nik, alamat);
        res.status(201).json({success: true, message: "Data berhasil ditambahkan", data: results});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

const updateDataPenduduk = async (req, res) => {
    const {nama, nik, alamat} = req.body;
    try {
        const results = await pendudukServices.updateDataPenduduk(nama, nik, alamat);
        res.status(201).json({success: true, message: "Data berhasil diperbarui", data: results});
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
};  

const deleteDataPenduduk = async (req, res) => {
    const {nik} = req.params;
    try {
        const results = await pendudukServices.deleteDataPenduduk(nik);
        if (!results.success) {
            return res.status(404).json(result); // Jika tidak ditemukan, kirim 404
        }
        res.status(200).json({success : true, message: "Data berhasil dihapus"})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export default {getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk};
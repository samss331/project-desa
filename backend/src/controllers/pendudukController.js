import pendudukServices from "../services/pendudukServices.js";

const getAllPenduduk = async (req, res) => {
    try {
        const results = await pendudukServices.getAllPenduduk();
        res.json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPendudukById = async (req, res) => {
    console.log("controller : ", req.params);
    const { id } = req.params;
    console.log("controller : ", id);
    try {
        const result = await pendudukServices.getPendudukById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addPenduduk = async (req, res) => {
    const { nama, nik, alamat, tanggalLahir } = req.body;
    try {
        const result = await pendudukServices.addPenduduk(nama, nik, alamat, tanggalLahir);
        console.log(result);
        res.status(201).json({ success: true, message: "Data berhasil ditambahkan", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateDataPenduduk = async (req, res) => {
    const {id} = req.params;
    const { nama, nik, alamat, tanggalLahir } = req.body;
    try {
        const result = await pendudukServices.updateDataPenduduk(id, nama, nik, alamat, tanggalLahir);
        console.log("dalam controller : ", result);
        res.json({ success: true, message: "Data berhasil diperbarui", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteDataPenduduk = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pendudukServices.deleteDataPenduduk(id);
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default { getAllPenduduk, getPendudukById, addPenduduk, updateDataPenduduk, deleteDataPenduduk };
import pendudukServices from "../services/pendudukServices.js";

const getAllPenduduk = async (req, res) => {
    try {
        const results = await pendudukServices.getAllPenduduk();
        res.json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPendudukByNik = async (req, res) => {
    const { nik } = req.params;
    try {
        const result = await pendudukServices.getPendudukByNik(nik);
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
    const { oldNik, newNik, nama, alamat, tanggalLahir } = req.body;
    try {
        const result = await pendudukServices.updateDataPenduduk(oldNik, nama, newNik, alamat, tanggalLahir);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteDataPenduduk = async (req, res) => {
    const { nik } = req.params;
    console.log(nik, "a")
    try {
        const result = await pendudukServices.deleteDataPenduduk(nik);
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default { getAllPenduduk, getPendudukByNik, addPenduduk, updateDataPenduduk, deleteDataPenduduk };
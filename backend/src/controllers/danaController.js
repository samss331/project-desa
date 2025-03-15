import danaServices from "../services/danaServices.js";

const addDanaMasuk = async (req, res) => {
    try {
        const { tahun, bulan, jumlah, sumber, keterangan } = req.body;
        const result = await danaServices.addDanaMasuk(tahun, bulan, jumlah, sumber, keterangan);
        res.status(201).json({ success: true, message: "Data pemasukan berhasil ditambahkan", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const addDanaKeluar = async (req, res) => {
    try {
        const { tahun, bulan, jumlah, kategori, keterangan } = req.body;
        const result = await danaServices.addDanaKeluar(tahun, bulan, jumlah, kategori, keterangan);
        res.status(201).json({ success: true, message: "Data pengeluaran berhasil ditambahkan", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllDanaMasuk = async (req, res) => {
    try {
        const data = await danaServices.getAllDanaMasuk();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllDanaKeluar = async (req, res) => {
    try {
        const data = await danaServices.getAllDanaKeluar();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDanaMasukById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await danaServices.getDanaMasukById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDanaKeluarById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await danaServices.getDanaKeluarById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAPBDESSummary = async (req, res) => {
    try {
        const { tahun } = req.params;
        const result = await danaServices.getSummaryByYear(tahun);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getDetailByYear = async (req, res) => {
    try {
        const { tahun } = req.params;
        const result = await danaServices.getDetailByYear(tahun);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateDanaMasuk = async (req, res) => {
    try {
        const {id} = req.params;
        const {tahun, bulan, jumlah, sumber, keterangan} = req.body;
        const result = await danaServices.updateDanaMasuk(id, tahun, bulan, jumlah, sumber, keterangan)
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil diperbarui!", data: result});
    } catch (error) {
        throw error
    }
}

const updateDanaKeluar = async (req, res) => {
    try {
        const {id} = req.params;
        const {tahun, bulan, jumlah, kategori, keterangan} = req.body;
        const result = await danaServices.updateDanaKeluar(id, tahun, bulan, jumlah, kategori, keterangan)
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil diperbarui!" , data: result});
    } catch (error) {
        throw error
    }
}

const deleteDanaMasuk = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await danaServices.deleteDanaMasuk(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteDanaKeluar = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await danaServices.deleteDanaKeluar(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default { addDanaMasuk, addDanaKeluar, 
    getAllDanaKeluar, getAllDanaMasuk,
    getAPBDESSummary, getDetailByYear, 
    getDanaKeluarById, getDanaMasukById, 
    updateDanaKeluar, updateDanaMasuk,
    deleteDanaKeluar, deleteDanaMasuk };

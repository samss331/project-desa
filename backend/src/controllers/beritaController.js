import beritaService from "../services/beritaServices.js";

const addBerita = async (req, res) => {
    try {
        const { judul, isi, tanggalTerbit, penulis } = req.body;
        const result = await beritaService.addBerita(judul, isi, tanggalTerbit, penulis);
        res.status(201).json({ success: true, message: "Berita berhasil ditambahkan", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllBerita = async (req, res) => {
    try {
        const data = await beritaService.getAllBerita();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBeritaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await beritaService.getBeritaById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBerita = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi, tanggalTerbit, penulis } = req.body;
        const result = await beritaService.updateBerita(id, judul, isi, tanggalTerbit, penulis);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil diperbarui!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteBerita = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await beritaService.deleteBerita(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default { addBerita, getAllBerita, getBeritaById, updateBerita, deleteBerita };

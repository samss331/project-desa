import pelayananService from "../services/pelayananServices.js";

const addPelayanan = async (req, res) => {
    try {
        const { nama_layanan, kategori, deskripsi, link_google_form } = req.body;

        const result = await pelayananService.addPelayanan(nama_layanan, kategori, deskripsi, link_google_form);
        res.status(201).json({ success: true, message: "Pelayanan berhasil ditambahkan", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllPelayanan = async (req, res) => {
    try {
        const data = await pelayananService.getAllPelayanan();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPelayananById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pelayananService.getPelayananById(id);
        res.json({ success: true, data });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const updatePelayanan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_layanan, kategori, deskripsi, link_google_form } = req.body;
        await pelayananService.updatePelayanan(id, nama_layanan, kategori, deskripsi, link_google_form);
        res.json({ success: true, message: "Pelayanan berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deletePelayanan = async (req, res) => {
    try {
        const { id } = req.params;
        await pelayananService.deletePelayanan(id);
        res.json({ success: true, message: "Pelayanan berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export default { addPelayanan, getAllPelayanan, getPelayananById, updatePelayanan, deletePelayanan };

import beritaService from "../services/beritaServices.js";

const addBerita = async (req, res) => {
  try {
    const { judul, isi, tanggal_terbit, penulis, status } = req.body;
    const foto = req.file;
    const result = await beritaService.addBerita(
      judul,
      foto,
      isi,
      tanggal_terbit,
      penulis,
      status || "Draft"
    );
    res.status(201).json({
      success: true,
      message: "Berita berhasil ditambahkan",
      data: result,
    });
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

const getBeritaByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const data = await beritaService.getBeritaByStatus(status);
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
      return res
        .status(404)
        .json({ success: false, message: "Data tidak ditemukan" });
    }
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi, tanggal_terbit, penulis, status } = req.body;
    const foto = req.file;
    const result = await beritaService.updateBerita(
      id,
      judul,
      foto,
      isi,
      tanggal_terbit,
      penulis,
      status
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Data tidak ditemukan" });
    }
    res.json({ success: true, message: "Data berhasil diperbarui!", result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await beritaService.deleteBerita(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Data tidak ditemukan" });
    }
    res.json({ success: true, message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default {
  addBerita,
  getAllBerita,
  getBeritaById,
  getBeritaByStatus,
  updateBerita,
  deleteBerita,
};

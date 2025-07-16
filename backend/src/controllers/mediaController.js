import mediaService from "../services/mediaServices.js";

const addMedia = async (req, res) => {
  try {
    const { nama, tipe, deskripsi } = req.body;
    const file = req.files && req.files.file ? req.files.file[0] : null;
    const thumbnail =
      req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;

    const result = await mediaService.addMedia(
      nama,
      tipe,
      file,
      deskripsi,
      thumbnail
    );
    res.status(201).json({
      success: true,
      message: "Media berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    "controller", error;
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const data = await mediaService.getAllMedia();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await mediaService.getMediaById(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, tipe, deskripsi } = req.body;
    const file = req.files && req.files.file ? req.files.file[0] : null;
    const thumbnail =
      req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;
    const updated = await mediaService.updateMedia(
      id,
      nama,
      tipe,
      file,
      deskripsi,
      thumbnail
    );
    res.json({ success: true, message: "Media berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    await mediaService.deleteMedia(id);
    res.json({ success: true, message: "Media berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export default {
  addMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

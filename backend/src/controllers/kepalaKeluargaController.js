import kepalaKeluargaService from "../services/kepalaKeluargaServices.js"

const addKepalaKeluarga = async (req, res) => {
  try {
    const { nama, nik } = req.body
    const result = await kepalaKeluargaService.addKepalaKeluarga(nama, nik)
    res.status(201).json({
      success: true,
      message: "Kepala keluarga berhasil ditambahkan",
      data: result,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getAllKepalaKeluarga = async (req, res) => {
  try {
    const data = await kepalaKeluargaService.getAllKepalaKeluarga()
    res.json({ success: true, data })
  } catch (error) {
    console.error("Error in getAllKepalaKeluarga:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const getKepalaKeluargaById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await kepalaKeluargaService.getKepalaKeluargaById(id)
    if (!result) {
      return res.status(404).json({ success: false, message: "Kepala keluarga tidak ditemukan" })
    }
    res.json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getKepalaKeluargaByNik = async (req, res) => {
  const { nik } = req.params
  try {
    const result = await kepalaKeluargaService.getKepalaKeluargaByNik(nik)
    if (!result) {
      return res.status(404).json({ success: false, message: "Kepala keluarga tidak ditemukan" })
    }
    res.json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateKepalaKeluarga = async (req, res) => {
  try {
    const { id } = req.params
    const { nama, nik } = req.body
    const result = await kepalaKeluargaService.updateKepalaKeluarga(id, nama, nik)
    if (!result) {
      return res.status(404).json({ success: false, message: "Kepala keluarga tidak ditemukan" })
    }
    res.json({ success: true, message: "Data kepala keluarga berhasil diperbarui!", data: result })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteKepalaKeluarga = async (req, res) => {
  try {
    const { id } = req.params
    const result = await kepalaKeluargaService.deleteKepalaKeluarga(id)
    if (!result) {
      return res.status(404).json({ success: false, message: "Kepala keluarga tidak ditemukan" })
    }
    res.json({ success: true, message: "Data kepala keluarga berhasil dihapus" })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export default {
  addKepalaKeluarga,
  getAllKepalaKeluarga,
  getKepalaKeluargaById,
  getKepalaKeluargaByNik,
  updateKepalaKeluarga,
  deleteKepalaKeluarga,
}

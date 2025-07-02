import express from "express"
import kepalaKeluargaController from "../controllers/kepalaKeluargaController.js"
import authAdmin from "../middleware/authAdmin.js"

const router = express.Router()

// Pastikan route yang lebih spesifik di atas route yang umum
router.get("/nik/:nik", authAdmin, kepalaKeluargaController.getKepalaKeluargaByNik)
router.get("/:id", authAdmin, kepalaKeluargaController.getKepalaKeluargaById)
router.get("/", authAdmin, kepalaKeluargaController.getAllKepalaKeluarga)
router.post("/", authAdmin, kepalaKeluargaController.addKepalaKeluarga)
router.put("/:id", authAdmin, kepalaKeluargaController.updateKepalaKeluarga)
router.delete("/:id", authAdmin, kepalaKeluargaController.deleteKepalaKeluarga)

export default router

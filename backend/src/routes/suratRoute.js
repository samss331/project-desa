import express from "express";
import upload from "../middleware/upload.js";
import suratController from "../controllers/suratController.js";

const router = express.Router();

router.post("/addSuratMasuk", upload.single("file_surat"), suratController.addSuratMasuk);
router.post("/addSuratKeluar", upload.single("file_surat"), suratController.addSuratKeluar);
router.get("/suratMasuk", suratController.getAllSuratMasuk);
router.get("/suratKeluar", suratController.getAllSuratKeluar);
router.get("/surat-masuk/:id", suratController.getSuratMasukById);
router.get("/surat-keluar/:id", suratController.getSuratKeluarById);
router.put("/update-surat-masuk/:id", upload.single("file_surat"), suratController.updateSuratMasuk);
router.put("/update-surat-keluar/:id", upload.single("file_surat"), suratController.updateSuratKeluar);
router.delete("/delete-surat-masuk/:id", suratController.deleteSuratMasuk);
router.delete("/delete-surat-keluar/:id", suratController.deleteSuratKeluar);
export default router;

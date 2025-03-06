import express from "express";
import upload from "../middleware/upload.js";
import suratController from "../controllers/suratController.js";

const router = express.Router();

router.post("/addSuratMasuk", upload.single("file_surat"), suratController.addSuratMasuk);
router.post("/addSuratKeluar", upload.single("file_surat"), suratController.addSuratKeluar);
router.get("/suratMasuk", suratController.getAllSuratMasuk);
router.get("/suratKeluar", suratController.getAllSuratKeluar);

export default router;

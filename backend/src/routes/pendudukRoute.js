import express from "express";
import pendudukController from "../controllers/pendudukController.js";

const router = express.Router();

router.get("/", pendudukController.getAllPenduduk);
router.get("/nik/:nik", pendudukController.getPendudukByNik);
router.post("/", pendudukController.addPenduduk);
router.put("/update", pendudukController.updateDataPenduduk);
router.delete("/delete/:nik", pendudukController.deleteDataPenduduk);

router.get("/stats/total", pendudukController.getTotalPenduduk);
router.get("/stats/kepala-keluarga", pendudukController.getTotalKepalaKeluarga);
router.get("/stats/pria", pendudukController.getTotalLakiLaki);
router.get("/stats/wanita", pendudukController.getTotalPerempuan);
router.get("/stats/agama", pendudukController.getPendudukByAgama);
router.get("/stats/umur", pendudukController.getPendudukByUmur);

export default router;

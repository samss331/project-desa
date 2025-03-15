import express from "express";
import danaController from "../controllers/danaController.js";

const router = express.Router();
router.post("/apbdes/dana-masuk", danaController.addDanaMasuk);
router.post("/apbdes/dana-keluar", danaController.addDanaKeluar);
router.get("/apbdes/summary/:tahun", danaController.getAPBDESSummary);
router.get("/apbdes/dana-masuk", danaController.getAllDanaMasuk);
router.get("/apbdes/dana-keluar", danaController.getAllDanaKeluar);
router.get("/apbdes/dana-masuk/:id", danaController.getDanaMasukById);
router.get("/apbdes/dana-keluar/:id", danaController.getDanaKeluarById);
router.get("/apbdes/detail/:tahun", danaController.getDetailByYear);
router.put("/apbdes/dana-masuk/:id", danaController.updateDanaMasuk);
router.put("/apbdes/dana-keluar/:id", danaController.updateDanaKeluar);
router.delete("/apbdes/dana-masuk/:id", danaController.deleteDanaMasuk);
router.delete("/apbdes/dana-keluar/:id", danaController.deleteDanaKeluar);

export default router;

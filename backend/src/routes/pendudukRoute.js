import express from "express";
import pendudukController from "../controllers/pendudukController.js";

const router = express.Router();

router.get("/", pendudukController.getAllPenduduk);
router.get("/nik/:nik", pendudukController.getPendudukByNik);
router.post("/", pendudukController.addPenduduk);
router.put("/update/:nik", pendudukController.updateDataPenduduk);
router.delete("/delete/:nik", pendudukController.deleteDataPenduduk);

export default router;

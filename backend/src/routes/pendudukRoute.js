import express from "express";
import pendudukController from "../controllers/pendudukController.js";

const router = express.Router();

router.get("/", pendudukController.getAllPenduduk);
router.get("/nik/:nik", pendudukController.getPendudukById);
router.post("/", pendudukController.addPenduduk);
router.put("/update/:id", pendudukController.updateDataPenduduk);
router.delete("/delete/:id", pendudukController.deleteDataPenduduk);

export default router;

import express from "express";
import pengumumanController from "../controllers/pengumumanController.js";

const router = express.Router();

router.post("/", pengumumanController.addPengumuman)
router.get("/", pengumumanController.getAllPengumuman)
router.get("/:id", pengumumanController.getPengumumanById)
router.put("/:id", pengumumanController.updatePengumuman)
router.delete("/:id", pengumumanController.deletePengumuman)
export default router;
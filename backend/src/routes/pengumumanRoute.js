import express from "express";
import pengumumanController from "../controllers/pengumumanController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/", authAdmin, pengumumanController.addPengumuman)
router.get("/", pengumumanController.getAllPengumuman)
router.get("/:id", pengumumanController.getPengumumanById)
router.put("/:id", authAdmin, pengumumanController.updatePengumuman)
router.delete("/:id", authAdmin, pengumumanController.deletePengumuman)
export default router;
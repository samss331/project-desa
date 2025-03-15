import express from "express";
import beritaController from "../controllers/beritaController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/",  beritaController.getAllBerita);
router.get("/:id", beritaController.getBeritaById);
router.post("/", authAdmin, beritaController.addBerita);
router.put("/:id", authAdmin, beritaController.updateBerita);
router.delete("/:id", authAdmin, beritaController.deleteBerita);

export default router;

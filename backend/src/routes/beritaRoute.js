import express from "express";
import beritaController from "../controllers/beritaController.js";

const router = express.Router();

router.get("/", beritaController.getAllBerita);
router.get("/:id", beritaController.getBeritaById);
router.post("/", beritaController.addBerita);
router.put("/:id", beritaController.updateBerita);
router.delete("/:id", beritaController.deleteBerita);

export default router;

import express from "express";
import beritaController from "../controllers/beritaController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get("/",  beritaController.getAllBerita);
router.get("/:id", beritaController.getBeritaById);
router.post("/", authAdmin, upload.single("foto"), beritaController.addBerita);
router.put("/:id", authAdmin, upload.single("foto"), beritaController.updateBerita);
router.delete("/:id", authAdmin, upload.single("foto"), beritaController.deleteBerita);

export default router;

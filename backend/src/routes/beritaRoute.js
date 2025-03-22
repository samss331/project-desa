import express from "express";
import beritaController from "../controllers/beritaController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Endpoint publik
router.get("/", beritaController.getAllBerita);
router.get("/:id", beritaController.getBeritaById);

// Endpoint baru untuk filter berdasarkan status
router.get("/status/:status", beritaController.getBeritaByStatus);

// Endpoint yang memerlukan autentikasi admin
router.post("/", authAdmin, upload.single("foto"), beritaController.addBerita);
router.put(
  "/:id",
  authAdmin,
  upload.single("foto"),
  beritaController.updateBerita
);
router.delete("/:id", authAdmin, beritaController.deleteBerita);

export default router;

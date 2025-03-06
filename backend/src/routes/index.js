import express from "express";
import pendudukRoutes from "./pendudukRoute.js";
import suratRoutes from "./suratRoute.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Selamat Datang di WebDesa API");
});

// Gunakan semua route yang ada
router.use("/auth", authRoutes)
router.use("/penduduk", pendudukRoutes);
router.use("/surat", suratRoutes);

export default router;

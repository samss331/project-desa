import express from "express";
import pendudukRoutes from "./pendudukRoute.js";
import suratRoutes from "./suratRoute.js";
import authRoutes from "./userRoutes.js";
import pengumumanRoutes from "./pengumumanRoute.js"
import beritaRoutes from "./beritaRoute.js"
import danaRoute from "./danaRoute.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Selamat Datang di WebDesa API");
});

// Gunakan semua route yang ada
router.use("/auth", authRoutes)
router.use("/penduduk", pendudukRoutes);
router.use("/surat", suratRoutes);
router.use("/pengumuman", pengumumanRoutes)
router.use("/berita", beritaRoutes)
router.use("/dana", danaRoute)

export default router;

import express from "express";
import authController from "../controllers/userController.js";
import authAdmin from "../middleware/userAdmin.js";

const router = express.Router();

// Route login admin
router.post("/login", authController.login)

// Route update admin berdasarkan email (hanya bisa diakses admin)
router.put("/update", authAdmin, authController.update)

export default router;

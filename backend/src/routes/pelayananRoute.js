import express from "express";
import pelayananController from "../controllers/pelayananController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/",  pelayananController.getAllPelayanan);
router.get("/:id", pelayananController.getPelayananById);
router.post("/", authAdmin, pelayananController.addPelayanan);
router.put("/:id", authAdmin, pelayananController.updatePelayanan);
router.delete("/:id", authAdmin, pelayananController.deletePelayanan);

export default router;

import express from "express";
import mediaController from "../controllers/mediaController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get("/",  mediaController.getAllMedia);
router.get("/:id", mediaController.getMediaById);
router.post("/", authAdmin, upload.single("file"), mediaController.addMedia);
router.put("/:id", authAdmin, upload.single("file"), mediaController.updateMedia);
router.delete("/:id", authAdmin, upload.single("file"), mediaController.deleteMedia);

export default router;

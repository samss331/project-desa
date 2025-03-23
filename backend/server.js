import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import "dotenv/config";
import path from "path"; // ✅ Pastikan path di-import

const app = express();
const port = 3000;

// Middleware untuk akses folder uploads
app.use("/uploads", express.static(path.resolve("uploads"))); // ✅ Gunakan path.resolve()

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => `Server berjalan di port ${port}`);

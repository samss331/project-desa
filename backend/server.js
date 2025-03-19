import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import "dotenv/config";

const app = express();
const port = 3000;

// Konfigurasi CORS
const corsOptions = {
  origin: "http://localhost:5173", // Sesuaikan dengan alamat frontend
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions)); // Menggunakan cors

app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server berjalan di port ${port}`));

// Route testing
app.get("/test", (req, res) => {
  res.send("Route bekerja!");
});

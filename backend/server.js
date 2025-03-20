import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import "dotenv/config";

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
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

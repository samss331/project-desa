import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config(); // Load .env sebelum digunakan

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
    return;
  }
  ("Terhubung ke Database");
});

export default db;

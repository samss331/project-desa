import express from "express";
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

app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server berjalan di port ${port}`));

app.get("/test", (req, res) => {
  res.send("Route bekerja!");
});

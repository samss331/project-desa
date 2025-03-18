import { error } from "console";
import multer from "multer";
import path from "path";

console.log("File upload middleware dijalankan");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/PROJECT/SATUDUA/backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new error("Hanya file PDF yang diperbolehkan!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

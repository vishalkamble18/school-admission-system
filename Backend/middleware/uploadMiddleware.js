import multer from "multer";
import fs from "fs";

const uploadDir = "uploads";


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;

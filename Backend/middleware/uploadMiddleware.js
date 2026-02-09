// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "leaders",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "admissions",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadAdmission = multer({ storage });

export default uploadAdmission;

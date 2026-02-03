import express from "express";
import { protect } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { submitAdmission, myAdmission } from "../controllers/admissionController.js";
import { updateProfile } from "../controllers/admissionController.js";
import { updatePhoto } from "../controllers/admissionController.js";
import { updateBirthCertificate } from "../controllers/admissionController.js";

const router = express.Router();

router.post(
  "/submit",
  protect,
  upload.fields([{ name: "photo" }, { name: "birthCertificate" }]),
  submitAdmission
);

router.get("/me", protect, myAdmission);
router.put("/update/:id", protect, updateProfile);
router.put(
  "/update-photo/:id",
  protect,
  upload.single("photo"),
  updatePhoto
);

router.put(
  "/update-certificate/:id",
  protect,
  upload.single("birthCertificate"),
  updateBirthCertificate
);

export default router;

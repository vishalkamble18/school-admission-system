import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  submitAdmission,
  myAdmission,
  updateProfile,
  updatePhoto,
  updateCertificate
} from "../controllers/admissionController.js";

const router = express.Router();

/* Submit admission */
router.post(
  "/submit",
  protect,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
  ]),
  submitAdmission
);

/* Get my admission */
router.get("/me", protect, myAdmission);

/* Update text fields */
router.put("/update/:id", protect, updateProfile);

/* ✅ UPDATE PROFILE PHOTO */
router.put(
  "/update-photo/:id",
  protect,
  upload.single("photo"),
  updatePhoto
);

/* ✅ UPDATE BIRTH CERTIFICATE */
router.put(
  "/update-certificate/:id",
  protect,
  upload.single("birthCertificate"),
  updateCertificate
);

export default router;

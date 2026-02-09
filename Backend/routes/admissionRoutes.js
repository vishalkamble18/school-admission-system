import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  submitAdmission,
  myAdmission,
  updateProfile
} from "../controllers/admissionController.js";

const router = express.Router();

/* ================= SUBMIT ADMISSION ================= */
router.post(
  "/submit",
  protect,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
  ]),
  submitAdmission
);

/* ================= GET MY ADMISSION ================= */
router.get("/me", protect, myAdmission);

/* ================= UPDATE PROFILE (TEXT ONLY) ================= */
router.put("/update/:id", protect, updateProfile);

export default router;

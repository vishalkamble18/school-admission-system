import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  submitAdmission,
  myAdmission,
  updateProfile
} from "../controllers/admissionController.js";


const router = express.Router();

/* Submit admission with GridFS files */
router.post(
  "/submit",
  protect,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
  ]),
  submitAdmission
);

/* Get logged-in student's admission */
router.get("/me", protect, myAdmission);

/* Update only text fields (no files) */
router.put("/update/:id", protect, updateProfile);

export default router;

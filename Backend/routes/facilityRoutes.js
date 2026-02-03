import express from "express";
import Facility from "../models/Facility.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";



const router = express.Router();

/* ================= PUBLIC ================= */

// Get all facilities
router.get("/", async (req, res) => {
  const facilities = await Facility.find().sort({ createdAt: -1 });
  res.json(facilities);
});

// Get single facility
router.get("/:id", async (req, res) => {
  const facility = await Facility.findById(req.params.id);
  res.json(facility);
});

/* ================= ADMIN ================= */

// Create facility
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 6),
  async (req, res) => {
    const images = req.files.map(file => file.path);

    const facility = await Facility.create({
      title: req.body.title,
      description: req.body.description,
      images
    });

    res.json(facility);
  }
);

// Delete facility
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Facility.findByIdAndDelete(req.params.id);
  res.json({ message: "Facility deleted" });
});

export default router;

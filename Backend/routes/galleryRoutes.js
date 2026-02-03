import express from "express";
import Gallery from "../models/Gallery.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

/**
 * PUBLIC - Get all gallery images
 */
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN - Upload image
 */
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const image = await Gallery.create({
        imageUrl: req.file.path
      });
      res.json(image);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/**
 * ADMIN - Delete image
 */
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

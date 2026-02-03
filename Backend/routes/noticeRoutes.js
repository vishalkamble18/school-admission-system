import express from "express";
import Notice from "../models/Notice.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * PUBLIC - Get all notices
 */
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN - Create notice
 */
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.json(notice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * ADMIN - Update notice
 */
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(notice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * ADMIN - Delete notice
 */
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

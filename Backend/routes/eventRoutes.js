import express from "express";
import Event from "../models/Event.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * PUBLIC - Get all events
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN - Create event
 */
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * ADMIN - Update event
 */
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * ADMIN - Delete event
 */
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

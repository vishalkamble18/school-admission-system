import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  addOrUpdateLeader,
  getLeaders,
  deleteLeader
} from "../controllers/leadershipController.js";

const router = express.Router();

// GET
router.get("/", getLeaders);

// POST (IMPORTANT)
router.post(
  "/",
  (req, res, next) => {
    upload.single("photo")(req, res, function (err) {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  addOrUpdateLeader
);


// DELETE
router.delete("/:id", deleteLeader);

export default router;

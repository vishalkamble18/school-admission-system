import express from "express";
import { addOrUpdateLeader, getLeaders , deleteLeader } from "../controllers/leadershipController.js";
// import upload from "../middleware/uploadMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get("/", getLeaders);
router.post("/", upload.single("image"), addOrUpdateLeader);
router.delete("/:id", deleteLeader);

export default router;

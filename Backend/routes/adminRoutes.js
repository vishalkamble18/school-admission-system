import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { allAdmissions, updateStatus, deleteAdmission, createAdmin, updateAdminLimit } from "../controllers/adminController.js";

const router = express.Router();

router.get("/admissions", protect, isAdmin, allAdmissions);
router.put("/admission/:id", protect, isAdmin, updateStatus);
router.delete("/admission/:id", protect, isAdmin, deleteAdmission);
router.post("/create-admin", protect, isAdmin, createAdmin);
router.put("/admin-limit", protect, isAdmin, updateAdminLimit);


export default router;

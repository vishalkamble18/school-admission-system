import express from "express";
import mongoose from "mongoose";
import { gfsBucket } from "../config/gridfs.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  const fileId = new mongoose.Types.ObjectId(req.params.id);
  gfsBucket.openDownloadStream(fileId).pipe(res);
});

export default router;

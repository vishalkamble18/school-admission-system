import mongoose from "mongoose";

export default mongoose.model("Gallery", new mongoose.Schema({
  imageUrl: String,
  uploadedAt: { type: Date, default: Date.now }
}));

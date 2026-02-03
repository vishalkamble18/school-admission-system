import mongoose from "mongoose";

export default mongoose.model("Notice", new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
}));

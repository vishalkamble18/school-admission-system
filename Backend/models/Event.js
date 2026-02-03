import mongoose from "mongoose";

export default mongoose.model("Event", new mongoose.Schema({
  title: String,
  date: String,
  description: String
}));

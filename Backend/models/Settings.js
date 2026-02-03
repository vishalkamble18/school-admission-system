import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  adminLimit: {
    type: Number,
    default: 3
  }
});

export default mongoose.model("Settings", settingsSchema);

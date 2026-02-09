import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String } // 👈 REQUIRED
});

export default mongoose.model("Leadership", leadershipSchema);

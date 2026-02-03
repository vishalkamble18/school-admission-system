import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String 
});

export default mongoose.model("Leadership", leadershipSchema);

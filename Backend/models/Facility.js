import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  images: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Facility", facilitySchema);

import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fullName: String,
  mobile: String,
  dob: String,
  gender: String,
  classApplying: String,
  guardianName: String,
  address: String,

  photo: String,
  birthCertificate: String,


  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Admission", admissionSchema);

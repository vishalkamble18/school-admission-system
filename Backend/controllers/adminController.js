import Admission from "../models/Admission.js";
import { sendMail } from "../utils/mailer.js";

import User from "../models/User.js";
import Settings from "../models/Settings.js";
export const allAdmissions = async (req, res) => {
  const data = await Admission.find().populate("studentId", "name email");
  res.json(data);
};

export const updateStatus = async (req, res) => {
  const admission = await Admission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  ).populate("studentId", "email name");
  res.json({ message: "Status updated & Email sent" });
};
// ✅ DELETE ADMISSION
export const deleteAdmission = async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ adminLimit: 3 });
    }

    const adminCount = await User.countDocuments({ role: "admin" });

    if (adminCount >= settings.adminLimit) {
      return res.status(403).json({
        message: "Admin limit reached"
      });
    }

    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin"
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Admin creation failed" });
  }
};

/* ================= UPDATE ADMIN LIMIT ================= */
export const updateAdminLimit = async (req, res) => {
  const { adminLimit } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({ adminLimit });
  } else {
    settings.adminLimit = adminLimit;
    await settings.save();
  }

  res.json({ message: "Admin limit updated", adminLimit });
};

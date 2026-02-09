import Admission from "../models/Admission.js";

/* ================= SUBMIT ADMISSION ================= */
export const submitAdmission = async (req, res) => {
  try {
    if (!req.files?.photo || !req.files?.birthCertificate) {
      return res.status(400).json({ message: "Files missing" });
    }

    const admission = await Admission.create({
      studentId: req.user.id,
      ...req.body,
      photo: req.files.photo[0].path,              // ✅ Cloudinary URL
      birthCertificate: req.files.birthCertificate[0].path, // ✅ Cloudinary URL
    });

    res.json({ message: "Admission submitted", admission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET MY ADMISSION ================= */
export const myAdmission = async (req, res) => {
  try {
    const admission = await Admission.findOne({ studentId: req.user.id });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE PROFILE (NO FILES) ================= */
export const updateProfile = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

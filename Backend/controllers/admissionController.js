import Admission from "../models/Admission.js";

/* ================= SUBMIT ADMISSION ================= */
export const submitAdmission = async (req, res) => {
  try {

    if (!req.files?.photo || !req.files?.birthCertificate) {
      return res.status(400).json({ message: "Photo or Birth Certificate missing" });
    }

    const admission = await Admission.create({
      studentId: req.user.id,
      ...req.body,
      photo: req.files.photo[0].path,                // ✅ Cloudinary URL
      birthCertificate: req.files.birthCertificate[0].path // ✅ Cloudinary URL
    });

    return res.status(201).json({
      message: "Admission submitted successfully",
      admission
    });

  } catch (error) {
    console.error("ADMISSION ERROR:", error);
    return res.status(500).json({ message: error.message });
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
/* ================= UPDATE PHOTO ================= */
export const updatePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo missing" });
    }

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { photo: req.file.path }, // Cloudinary URL
      { new: true }
    );

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE CERTIFICATE ================= */
export const updateCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Certificate missing" });
    }

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { birthCertificate: req.file.path }, // Cloudinary URL
      { new: true }
    );

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



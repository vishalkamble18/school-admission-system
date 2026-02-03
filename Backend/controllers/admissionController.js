import Admission from "../models/Admission.js";

export const submitAdmission = async (req, res) => {
  const exists = await Admission.findOne({ studentId: req.user.id });
  if (exists) return res.status(400).json({ message: "Already submitted" });

  const admission = await Admission.create({
    studentId: req.user.id,
    ...req.body,
    photo: req.files.photo[0].path,
    birthCertificate: req.files.birthCertificate[0].path
  });

  res.json(admission);
};

export const myAdmission = async (req, res) => {
  const admission = await Admission.findOne({ studentId: req.user.id });
  res.json(admission);
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { photo: req.file.path },
      { new: true }
    );
    res.json(admission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBirthCertificate = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { birthCertificate: req.file.path },
      { new: true }
    );

    res.json(admission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


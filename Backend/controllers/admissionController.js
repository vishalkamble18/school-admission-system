import Admission from "../models/Admission.js";
import { gfsBucket } from "../config/gridfs.js";
import { Readable } from "stream";

// submit admission
export const submitAdmission = async (req, res) => {
  try {
    if (!req.files?.photo || !req.files?.birthCertificate) {
      return res.status(400).json({ message: "Files missing" });
    }

    const uploadToGridFS = (file) => {
      return new Promise((resolve, reject) => {
        const readableStream = Readable.from(file.buffer);

        const uploadStream = gfsBucket.openUploadStream(
          file.originalname,
          { contentType: file.mimetype }
        );

        readableStream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", () => resolve(uploadStream.id));
      });
    };

    const photoId = await uploadToGridFS(req.files.photo[0]);
    const certId = await uploadToGridFS(req.files.birthCertificate[0]);

    const admission = await Admission.create({
      studentId: req.user.id,
      ...req.body,
      photoFileId: photoId,
      birthCertificateFileId: certId,
    });

    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get my admission
export const myAdmission = async (req, res) => {
  try {
    const admission = await Admission.findOne({ studentId: req.user.id });
    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
    res.status(500).json({ message: err.message });
  }
};


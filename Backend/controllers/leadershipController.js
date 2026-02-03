import Leadership from "../models/Leadership.js";
import fs from "fs";
import path from "path";

/* ================= ADD / UPDATE LEADER ================= */
export const addOrUpdateLeader = async (req, res) => {
  try {
    const { name, role } = req.body;

    let leader = await Leadership.findOne({ role });

    if (leader) {
      // 🔁 If updating image, delete old image first
      if (req.file && leader.image) {
        const oldPath = path.join(process.cwd(), leader.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      leader.name = name;
      if (req.file) leader.image = req.file.path;
      await leader.save();
    } else {
      leader = await Leadership.create({
        name,
        role,
        image: req.file?.path
      });
    }

    res.json({ message: "Leader saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET LEADERS ================= */
export const getLeaders = async (req, res) => {
  try {
    const leaders = await Leadership.find();
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE LEADER ================= */
export const deleteLeader = async (req, res) => {
  try {
    const leader = await Leadership.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    // 🗑️ Delete image from uploads folder
    if (leader.image) {
      const imagePath = path.join(process.cwd(), leader.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await leader.deleteOne();

    res.json({ message: "Leader deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

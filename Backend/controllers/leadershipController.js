import Leadership from "../models/Leadership.js";

export const addOrUpdateLeader = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image not received by server",
      });
    }

    const { name, role } = req.body;

    const leader = await Leadership.create({
      name,
      role,
      image: req.file.path,
    });

    res.status(201).json(leader);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getLeaders = async (req, res) => {
  const leaders = await Leadership.find();
  res.json(leaders);
};

export const deleteLeader = async (req, res) => {
  const leader = await Leadership.findById(req.params.id);
  if (!leader) return res.status(404).json({ message: "Not found" });

  await leader.deleteOne();
  res.json({ message: "Deleted" });
};

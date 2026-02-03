const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // For testing: send link in console
  console.log(`Reset Link: http://localhost:5173/reset-password/${token}`);

  res.json({ message: "Reset link sent to email (check console)" });
});


// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetExpire = undefined;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

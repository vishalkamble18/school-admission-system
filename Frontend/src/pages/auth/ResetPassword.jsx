import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIXED: PUT instead of POST
      await api.post(`/auth/reset-password/${token}`, {
  password
});


      toast.success("✅ Password updated successfully");

      setPassword("");
      setConfirm("");

      // Redirect to login after success
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "❌ Invalid or expired link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          🔑 Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="border w-full p-3 rounded-lg mb-4
                     focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border w-full p-3 rounded-lg mb-5
                     focus:ring-2 focus:ring-green-500 outline-none"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </motion.form>
    </div>
  );
}

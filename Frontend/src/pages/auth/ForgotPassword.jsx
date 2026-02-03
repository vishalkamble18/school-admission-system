import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", { email });

      toast.success("✅ Reset link generated successfully");
      console.log("RESET TOKEN:", res.data.token); // for testing only

      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">
          🔐 Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-5">
          Enter your registered email to receive a reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="border w-full p-3 rounded-lg mb-4
                     focus:ring-2 focus:ring-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </motion.form>
    </div>
  );
}

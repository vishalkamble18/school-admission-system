import { useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const res = await api.post("/auth/login", {
        email: form.email.value,
        password: form.password.value
      });

      login(res.data.token, res.data.role);

      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/student";
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 relative overflow-hidden">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      {/* Login Card */}
      <form
        onSubmit={submit}
        className="relative z-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-3">
          <a href="/forgot-password" className="text-indigo-600 text-sm">
            Forgot password?
          </a>
        </p>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-semibold">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

import api from "../../api/axios";

export default function Register() {
  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await api.post("/auth/register", {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value
    });

    alert("Registered Successfully");
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 relative overflow-hidden">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      {/* Register Card */}
      <form
        onSubmit={submit}
        className="relative z-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

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
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

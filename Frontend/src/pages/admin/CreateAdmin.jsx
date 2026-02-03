import { useState } from "react";
import api from "../../api/axios";

export default function CreateAdmin() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    await api.post("/admin/create-admin", form);
    alert("Admin created");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Admin
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 transition font-semibold"
        >
          Create Admin
        </button>
      </div>
    </div>
  );
}

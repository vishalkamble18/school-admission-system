import { useState } from "react";
import api from "../../api/axios";

export default function LeadershipManager({ fetchLeaders }) {
  const [form, setForm] = useState({
    name: "",
    role: "Founder",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please select an image");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("photo", form.image); // ✅ MUST BE "photo"

    try {
      await api.post("/leaders", fd);

      alert("Leader saved successfully");

      setForm({ name: "", role: "Founder", image: null });

      fetchLeaders && fetchLeaders();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow max-w-md">
      <h2 className="font-bold mb-4">Update Leadership</h2>

      <select
        className="border p-2 w-full mb-3"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option>Founder</option>
        <option>Principal</option>
      </select>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

import { useState } from "react";
import api from "../../api/axios";

export default function LeadershipManager() {
  const [form, setForm] = useState({
    name: "",
    role: "Founder",
    image: null
  });

  const submit = async () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("image", form.image);

    await api.post("/leaders", fd);
    alert("Updated successfully");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md">
      <h2 className="font-bold mb-4">Update Leadership</h2>

      <select
        className="border p-2 w-full mb-3"
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option>Founder</option>
        <option>Principal</option>
      </select>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-3"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="file"
        className="mb-4"
        onChange={e => setForm({ ...form, image: e.target.files[0] })}
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}

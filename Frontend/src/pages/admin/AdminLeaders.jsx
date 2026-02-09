import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminLeaders() {
  const [leaders, setLeaders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "Founder",
    image: null,
  });

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const res = await api.get("/leaders");
      setLeaders(res.data);
    } catch (err) {
      console.error("Fetch leaders error:", err);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", form.name);
  data.append("role", form.role);
  data.append("photo", form.image);

  await api.post("/leaders", data);

  setForm({ name: "", role: "Founder", image: null });
  fetchLeaders();
};

  const deleteLeader = async (id) => {
    try {
      await api.delete(`/leaders/${id}`);
      fetchLeaders();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage School Leaders</h1>

      {/* Add Leader */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10 max-w-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Founder">Founder</option>
          <option value="Principal">Principal</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Leader
        </button>
      </form>

      {/* Existing Leaders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {leaders.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-xl shadow p-4 text-center"
          >
            <img
              src={l.image}   // ✅ Cloudinary URL
              alt={l.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
            />
            <h3 className="font-semibold">{l.name}</h3>
            <p className="text-sm text-gray-500">{l.role}</p>

            <button
              onClick={() => deleteLeader(l._id)}
              className="mt-2 text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

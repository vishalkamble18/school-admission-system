import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);

  const loadNotices = async () => {
    const res = await api.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const addNotice = async () => {
    if (!title || !description) return toast.error("Fill all fields");
    await api.post("/notices", { title, description });
    toast.success("Notice added");
    setTitle("");
    setDescription("");
    loadNotices();
  };

  const deleteNotice = async (id) => {
    await api.delete(`/notices/${id}`);
    toast.success("Notice deleted");
    loadNotices();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">📢 Manage Notices</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <input
          placeholder="Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addNotice}
          className="bg-blue-600 text-white rounded-lg"
        >
          ➕ Add Notice
        </button>
      </div>

      {/* Notice List */}
      <div className="space-y-3">
        {notices.map((n) => (
          <div
            key={n._id}
            className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center hover:shadow transition"
          >
            <div>
              <h3 className="font-bold">{n.title}</h3>
              <p className="text-gray-500 text-sm">{n.description}</p>
            </div>

            <button
              onClick={() => deleteNotice(n._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

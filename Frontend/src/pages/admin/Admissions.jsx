import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Admissions() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const load = async () => {
    try {
      const res = await api.get("/admin/admissions");
      setList(res.data);
    } catch {
      toast.error("Failed to load admissions");
    }
  };

  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    try {
      await api.put(`/admin/admission/${id}`, { status });
      toast.success(`Application ${status}`);
      load();
    } catch {
      toast.error("Update failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this application?")) return;

    try {
      await api.delete(`/admin/admission/${id}`);
      toast.success("Application deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = list.filter(a => {
    const matchName =
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.studentId?.email?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All" ? true : a.status === status;

    return matchName && matchStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto"
    >
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">📋 All Applications</h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            placeholder="Search name / email"
            className="border rounded-lg px-4 py-2 w-full sm:w-64
                       focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2
                       focus:ring-2 focus:ring-blue-500 outline-none"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            No applications found
          </div>
        )}

        {filtered.map(a => (
          <motion.div
            key={a._id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row
                       md:items-center md:justify-between gap-4"
          >
            {/* Student Info */}
            <div>
              <p className="font-semibold text-lg">{a.fullName}</p>
              <p className="text-sm text-gray-600">
                {a.studentId?.email}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    a.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : a.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {a.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => update(a._id, "Approved")}
                className="bg-green-600 hover:bg-green-700
                           text-white px-4 py-2 rounded-lg transition"
              >
                Approve
              </button>

              <button
                onClick={() => update(a._id, "Rejected")}
                className="bg-red-600 hover:bg-red-700
                           text-white px-4 py-2 rounded-lg transition"
              >
                Reject
              </button>

              <button
                onClick={() => remove(a._id)}
                className="bg-gray-700 hover:bg-black
                           text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

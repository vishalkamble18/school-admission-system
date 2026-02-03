import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function FacilitiesAdmin() {
  const [facilities, setFacilities] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const load = async () => {
    const res = await api.get("/facilities");
    setFacilities(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createFacility = async () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      [...images].forEach(img => data.append("images", img));

      await api.post("/facilities", data);
      toast.success("✅ Facility added");

      setTitle("");
      setDescription("");
      setImages([]);
      load();
    } catch {
      toast.error("❌ Upload failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete facility?")) return;
    await api.delete(`/facilities/${id}`);
    load();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🏫 Manage Facilities
      </h2>

      {/* ================= FORM ================= */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Facility Title"
            className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            placeholder="Short Description"
            className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {/* Upload */}
          <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition relative">
            <ImagePlus size={18} />
            <span className="text-sm">
              {images.length > 0 ? `${images.length} files selected` : "Choose Images"}
            </span>

            <input
              type="file"
              multiple
              hidden
              onChange={e => setImages(e.target.files)}
            />
          </label>

          <button
            onClick={createFacility}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold transition flex items-center justify-center gap-2"
          >
            <UploadCloud size={18} />
            Add Facility
          </button>

        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {[...images].map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="h-20 w-20 object-cover rounded-lg border"
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= FACILITY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {facilities.map(f => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={f._id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={`http://localhost:5000/${f.images?.[0]}`}
              className="h-44 w-full object-cover"
              alt=""
            />

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2 flex-1">
                {f.description}
              </p>

              <button
                onClick={() => remove(f._id)}
                className="flex items-center gap-1 text-red-600 mt-4 hover:text-red-800 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        ))}

      </div>

      {/* Empty State */}
      {facilities.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No facilities added yet.
        </p>
      )}

    </motion.div>
  );
}

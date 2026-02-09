import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploading(true);
      await api.post("/gallery", data);
      load();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      load();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Gallery Manager</h2>

      <input
        type="file"
        onChange={upload}
        className="mb-4"
        disabled={uploading}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative">
            <img
              src={img.imageUrl}   // ✅ FIXED HERE
              alt="Gallery"
              className="rounded h-40 w-full object-cover"
            />
            <button
              onClick={() => remove(img._id)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

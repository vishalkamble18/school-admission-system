import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminGallery() {
  const [images, setImages] = useState([]);

  const load = () => {
    api.get("/gallery").then(res => setImages(res.data));
  };

  useEffect(() => { load(); }, []);

  const upload = async e => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    await api.post("/gallery", data);
    load();
  };

  const remove = async id => {
    await api.delete(`/gallery/${id}`);
    load();
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Gallery Manager</h2>

      <input type="file" onChange={upload} className="mb-4" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative">
            <img
              src={`http://localhost:5000/${img.imageUrl}`}
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

import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">School Gallery</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.imageUrl}
            alt="Gallery"
            className="rounded shadow object-cover h-40 w-full"
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import {
  School,
  Monitor,
  Library,
  Dumbbell,
  Bus,
  FlaskConical
} from "lucide-react";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    api.get("/facilities").then(res => setFacilities(res.data));
  }, []);

  const icons = [
    <Monitor size={36} />,
    <FlaskConical size={36} />,
    <Library size={36} />,
    <Dumbbell size={36} />,
    <Bus size={36} />,
    <School size={36} />
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        🏫 Our Facilities
      </motion.h1>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {facilities.map((f, index) => (
          <motion.div
            key={f._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Main Image */}
            <img
              src={`http://localhost:5000/${f.images?.[0]}`}
              className="h-48 w-full object-cover"
              alt={f.title}
            />

            <div className="p-5">

              {/* Icon */}
              <div className="text-blue-600 flex justify-center mb-3">
                {icons[index % icons.length]}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-center mb-2">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm text-center mb-4">
                {f.description}
              </p>

              {/* Gallery */}
              <div className="grid grid-cols-3 gap-2">
                {f.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/${img}`}
                    className="h-16 w-full object-cover rounded"
                    alt="facility"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

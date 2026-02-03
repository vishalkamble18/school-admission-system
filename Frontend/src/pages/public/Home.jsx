import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);

  // ✅ Fetch leaders from backend
  useEffect(() => {
    api.get("/leaders")
      .then(res => setOwners(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="text-white relative">

      {/* ================= HERO ================= */}
      <section
        className="min-h-screen flex flex-col justify-center items-center
                   bg-gradient-to-r from-blue-600 to-indigo-700
                   text-center px-4 relative"
      >

        {/* ================= LEADERS ================= */}
        <div className="absolute top-6 right-6 flex gap-4">
          {owners.map(owner => (
            <motion.div
              key={owner._id}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative group"
            >
              <img
                src={`http://localhost:5000/${owner.image}`}
                alt={owner.name}
                onClick={() => setSelectedOwner(owner)}
                className="
                  w-20 h-20 rounded-full object-cover
                  border-2 border-white shadow-lg
                  transition transform duration-300
                  hover:scale-110 hover:shadow-2xl
                  cursor-pointer
                "
              />

              {/* Tooltip */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2 top-24
                  bg-black/90 text-white text-xs px-3 py-1 rounded
                  opacity-0 group-hover:opacity-100
                  transition whitespace-nowrap
                  pointer-events-none
                "
              >
                {owner.name} — {owner.role}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= HERO TEXT ================= */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome to Bright Future School
        </motion.h1>

        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Admissions open for the academic year. Apply online easily and securely.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg
                       font-semibold hover:scale-105 transition"
          >
            Apply Now
          </Link>

          <Link
            to="/facilities"
            className="border border-white px-6 py-3 rounded-lg
                       hover:bg-white hover:text-blue-700 transition"
          >
            View Facilities
          </Link>
        </div>
      </section>

      {/* ================= LEADER MODAL ================= */}
      <AnimatePresence>
        {selectedOwner && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center
                       justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOwner(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white text-gray-800 rounded-xl
                         p-6 max-w-sm w-full text-center shadow-xl"
            >
              <img
                src={`http://localhost:5000/${selectedOwner.image}`}
                alt={selectedOwner.name}
                className="w-28 h-28 rounded-full mx-auto
                           object-cover shadow mb-4"
              />

              <h3 className="text-xl font-bold">
                {selectedOwner.name}
              </h3>
              <p className="text-blue-600 font-medium">
                {selectedOwner.role}
              </p>

              <p className="text-sm mt-3 text-gray-600">
                {selectedOwner.bio}
              </p>

              <button
                onClick={() => setSelectedOwner(null)}
                className="mt-5 bg-blue-600 text-white
                           px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gray-100 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6
                        max-w-6xl mx-auto px-4">
          <Feature title="🎓 Quality Education" desc="Well structured curriculum and learning methods." />
          <Feature title="🧑‍🏫 Expert Faculty" desc="Highly qualified and experienced teachers." />
          <Feature title="🏫 Modern Campus" desc="Smart classrooms and advanced facilities." />
          <Feature title="🌱 Growth Focused" desc="Sports, arts, leadership and innovation." />
        </div>
      </section>

      {/* ================= ADMISSION STEPS ================= */}
      <section className="py-20 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          Admission Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6
                        max-w-6xl mx-auto px-4">
          <Step num="1" title="Register" />
          <Step num="2" title="Fill Form" />
          <Step num="3" title="Upload Documents" />
          <Step num="4" title="Track Status" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <p>📍 Pune, Maharashtra</p>
        <p>📞 +91 9876543210</p>
        <p>📧 vishalkamble@gmail.com</p>

        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} Bright Future School.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

const Feature = ({ title, desc }) => (
  <div className="bg-white rounded-xl shadow p-6
                  text-center hover:shadow-lg transition">
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

const Step = ({ num, title }) => (
  <div className="border rounded-xl p-6 text-center
                  shadow hover:shadow-lg transition">
    <div className="text-3xl font-bold text-blue-600 mb-2">
      {num}
    </div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);



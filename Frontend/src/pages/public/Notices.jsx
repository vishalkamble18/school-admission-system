import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/notices").then(res => setNotices(res.data));
  }, []);

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">
          📢 School Notices
        </h1>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <input
            placeholder="🔍 Search notice..."
            className="w-full p-3 rounded-xl shadow border focus:ring-2 focus:ring-blue-400 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Notices List */}
        <div className="space-y-5">
          {filtered.map(n => (
            <div
              key={n._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-5 flex gap-4"
            >
              {/* Date Badge */}
              <div className="bg-blue-600 text-white rounded-lg px-4 py-2 text-center min-w-[90px]">
                <p className="text-sm font-semibold">
                  {new Date(n.createdAt || Date.now()).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short"
                  })}
                </p>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-lg dark:text-white">
                  {n.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {n.description}
                </p>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No notices found 📭
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

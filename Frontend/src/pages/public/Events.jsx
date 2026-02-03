import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  const filtered = date
    ? events.filter(e => e.date === date)
    : events;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">
          📅 Events Calendar
        </h1>

        {/* Date Filter */}
        <div className="flex justify-center mb-8">
          <input
            type="date"
            className="p-3 rounded-xl shadow border focus:ring-2 focus:ring-indigo-400 outline-none"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        {/* Events Grid */}
        <div className="grid gap-5">
          {filtered.map(e => (
            <div
              key={e._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col md:flex-row overflow-hidden"
            >
              {/* Date Panel */}
              <div className="bg-indigo-600 text-white flex items-center justify-center p-5 md:w-40">
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {new Date(e.date).getDate()}
                  </p>
                  <p className="uppercase text-sm">
                    {new Date(e.date).toLocaleString("en-IN", { month: "short" })}
                  </p>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-5 flex-1">
                <h3 className="font-semibold text-lg dark:text-white">
                  {e.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {e.description}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  📅 {e.date}
                </p>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No events found 📭
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

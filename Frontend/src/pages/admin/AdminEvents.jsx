import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AdminEvents() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = async () => {
    if (!title || !date) return toast.error("Fill required fields");
    await api.post("/events", { title, date, description });
    toast.success("Event added");
    setTitle("");
    setDate("");
    setDescription("");
    loadEvents();
  };

  const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
    toast.success("Event deleted");
    loadEvents();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">📅 Manage Events</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input
          placeholder="Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addEvent}
          className="bg-blue-600 text-white rounded-lg"
        >
          ➕ Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="space-y-3">
        {events.map((e) => (
          <div
            key={e._id}
            className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center hover:shadow transition"
          >
            <div>
              <h3 className="font-bold">{e.title}</h3>
              <p className="text-sm text-gray-500">{e.date}</p>
              <p className="text-sm">{e.description}</p>
            </div>

            <button
              onClick={() => deleteEvent(e._id)}
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


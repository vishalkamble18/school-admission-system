import { useState } from "react";
import api from "../../api/axios";

export default function AdminSettings() {
  const [limit, setLimit] = useState(3);

  const update = async () => {
    await api.put("/admin/admin-limit", { adminLimit: limit });
    alert("Limit updated");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Admin Settings
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Configure system-level admin controls
        </p>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Maximum Admin Accounts
          </label>
          <input
            type="number"
            value={limit}
            onChange={e => setLimit(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none"
            min="1"
          />
        </div>

        {/* Button */}
        <button
          onClick={update}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 transition font-semibold"
        >
          Update Limit
        </button>

        {/* Info Box */}
        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          This setting controls how many admin users can be created in the system.
          Changes apply immediately.
        </div>

      </div>
    </div>
  );
}


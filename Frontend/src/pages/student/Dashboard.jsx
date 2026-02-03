import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardCheck,
  Bell,
  Calendar,
  LogOut,
  User
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              🎓 Welcome, {user?.name || "Student"}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your admission and stay updated
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            to="/student/admission"
            icon={<FileText size={34} />}
            title="Apply for Admission"
            gradient="from-blue-500 to-indigo-600"
          />

          <DashboardCard
            to="/student/status"
            icon={<ClipboardCheck size={34} />}
            title="View Admission Status"
            gradient="from-green-500 to-emerald-600"
          />

          <DashboardCard
            to="/notices"
            icon={<Bell size={34} />}
            title="School Notices"
            gradient="from-purple-500 to-fuchsia-600"
          />

          <DashboardCard
            to="/events"
            icon={<Calendar size={34} />}
            title="Upcoming Events"
            gradient="from-orange-500 to-amber-600"
          />

          <DashboardCard
            to="/student/profile"
            icon={<User size={34} />}
            title="My Profile"
            gradient="from-indigo-500 to-blue-700"
          />

          {/* Logout */}
          <button
            onClick={logout}
            className="rounded-xl shadow-xl flex flex-col items-center justify-center p-6
                       bg-gradient-to-br from-red-500 to-rose-600 text-white
                       hover:scale-105 transition"
          >
            <LogOut size={34} />
            <span className="mt-2 font-semibold">Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* Card Component */
const DashboardCard = ({ to, icon, title, gradient }) => (
  <Link
    to={to}
    className={`rounded-xl shadow-xl p-6 flex flex-col items-center justify-center
                bg-gradient-to-br ${gradient} text-white
                hover:scale-105 transition-all duration-300`}
  >
    {icon}
    <span className="mt-3 font-semibold text-center">{title}</span>
  </Link>
);

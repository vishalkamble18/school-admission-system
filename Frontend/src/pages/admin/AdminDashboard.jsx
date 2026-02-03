import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import api from "../../api/axios";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const location = useLocation();

  // ✅ Detect /admin (dashboard home)
  const isDashboardHome = location.pathname === "/admin";

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/admin/admissions").then(res => {
      const total = res.data.length;
      const pending = res.data.filter(a => a.status === "Pending").length;
      const approved = res.data.filter(a => a.status === "Approved").length;
      const rejected = res.data.filter(a => a.status === "Rejected").length;

      setStats({ total, pending, approved, rejected });
      setApplications(res.data.slice(0, 5));
    });
  }, []);

  const data = [
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected }
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 p-8">

        {/* 🔑 CHILD ROUTES RENDER HERE */}
        <Outlet />

        {/* 🔑 DASHBOARD ONLY FOR /admin */}
        {isDashboardHome && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
                📊 Admin Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Overview of admission applications and performance
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              <StatCard label="Total Applications" value={stats.total} icon={<Users size={28} />} gradient="from-blue-500 to-indigo-600" />
              <StatCard label="Pending" value={stats.pending} icon={<Clock size={28} />} gradient="from-yellow-400 to-orange-500" />
              <StatCard label="Approved" value={stats.approved} icon={<CheckCircle size={28} />} gradient="from-green-500 to-emerald-600" />
              <StatCard label="Rejected" value={stats.rejected} icon={<XCircle size={28} />} gradient="from-red-500 to-pink-600" />
            </div>

            {/* Charts + Table */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white/80 rounded-2xl shadow-xl p-6">
                <h2 className="font-semibold text-lg mb-4">📈 Applications Overview</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data} dataKey="value" innerRadius={60} outerRadius={100} label>
                        {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl shadow-xl p-6">
                <h2 className="font-semibold text-lg mb-4">🧾 Recent Applications</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {applications.map(app => (
                      <tr key={app._id}>
                        <td>{app.fullName}</td>
                        <td>{app.classApplying}</td>
                        <td><StatusBadge status={app.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ label, value, icon, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-6 shadow-xl flex justify-between`}>
    <div>
      <p className="text-sm">{label}</p>
      <h2 className="text-4xl font-bold">{value}</h2>
    </div>
    <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold text-white";
  if (status === "Approved") return <span className={`${base} bg-green-500`}>Approved</span>;
  if (status === "Pending") return <span className={`${base} bg-yellow-500`}>Pending</span>;
  return <span className={`${base} bg-red-500`}>Rejected</span>;
};

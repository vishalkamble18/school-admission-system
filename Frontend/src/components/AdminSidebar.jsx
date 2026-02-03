import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  Calendar,
  Users,
  Settings,
  Plus
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white min-h-screen p-5 flex flex-col">
      
      {/* Logo / Title */}
      <h2 className="font-extrabold text-2xl tracking-wide mb-8 text-center">
        Admin Panel
      </h2>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem to="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem to="/admin/admissions" icon={<FileText size={18} />} label="Admissions" />
        <NavItem to="/admin/notices" icon={<FileText size={18} />} label="Notices" />

        {/* Leaders (kept as-is) */}
        <NavLink
          to="/admin/leaders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
             hover:bg-blue-600 hover:translate-x-1
             ${isActive ? "bg-blue-900 shadow" : ""}`
          }
        >
          <Users size={18} />
          <span className="font-medium">Leaders</span>
        </NavLink>

        <NavItem to="/admin/events" icon={<Calendar size={18} />} label="Events" />
        <NavItem to="/admin/gallery" icon={<Image size={18} />} label="Gallery" />
      </nav>

      {/* Divider */}
      <hr className="border-blue-500 my-4" />

      {/* Bottom Actions */}
      <div className="space-y-2">
        <Link
          to="/admin/create-admin"
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-blue-600 hover:bg-blue-500 transition"
        >
          <Plus size={16} />
          <span>Add Admin</span>
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     hover:bg-blue-600 transition"
        >
          <Settings size={16} />
          <span>Admin Settings</span>
        </Link>
      </div>
    </aside>
  );
}

/* Reusable Nav Item */
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
       hover:bg-blue-600 hover:translate-x-1
       ${isActive ? "bg-blue-900 shadow" : ""}`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

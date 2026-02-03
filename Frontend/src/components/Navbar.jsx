import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DarkToggle from "./DarkToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="font-bold text-lg">
          Bright Future School
        </h1>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex space-x-4 items-center">

          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          {/* Not Logged In */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-yellow-300">
                Register
              </Link>
            </>
          )}

          {/* Student Menu */}
          {user?.role === "student" && (
            <>
              <Link to="/student" className="hover:text-yellow-300">
                Dashboard
              </Link>
              <Link to="/facilities" className="hover:text-yellow-300">
                Facilities
              </Link>
              <Link to="/student/status" className="hover:text-yellow-300">
                Status
              </Link>
            </>
          )}

          {/* Admin Menu */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-yellow-300">
                Dashboard
              </Link>
              <Link to="/admin/admissions" className="hover:text-yellow-300">
                Admissions
              </Link>
              <Link to="/admin/facilities" className="hover:text-yellow-300">
                Facilities
              </Link>
              <Link to="/admin/notices" className="hover:text-yellow-300">
                Notices
              </Link>
              <Link to="/admin/events" className="hover:text-yellow-300">
                Events
              </Link>
              <Link to="/admin/gallery" className="hover:text-yellow-300">
                Gallery
              </Link>
              <Link to="/admin/leaders" className="hover:text-yellow-300">
                Leaders
              </Link>
            </>
          )}

          <DarkToggle />

          {/* Logout */}
          {user && (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden mt-3 space-y-2 flex flex-col">

          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}

          {user?.role === "student" && (
            <>
              <Link to="/student" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link to="/facilities" onClick={() => setOpen(false)}>
                Facilities
              </Link>
              <Link to="/student/status" onClick={() => setOpen(false)}>
                Status
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/admissions" onClick={() => setOpen(false)}>
                Admissions
              </Link>
              <Link to="/admin/facilities" onClick={() => setOpen(false)}>
                Facilities
              </Link>
              <Link to="/admin/notices" onClick={() => setOpen(false)}>
                Notices
              </Link>
              <Link to="/admin/events" onClick={() => setOpen(false)}>
                Events
              </Link>
              <Link to="/admin/gallery" onClick={() => setOpen(false)}>
                Gallery
              </Link>
              <Link to="/admin/leaders" onClick={() => setOpen(false)}>
                Leaders
              </Link>
            </>
          )}

          <DarkToggle />

          {user && (
            <button
              onClick={logout}
              className="bg-red-500 w-full py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}


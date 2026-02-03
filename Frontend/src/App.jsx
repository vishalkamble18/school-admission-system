import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/public/Home";
import Gallery from "./pages/public/Gallery";
import Notices from "./pages/public/Notices";
import Events from "./pages/public/Events";
import Facilities from "./pages/Facilities";

/* ================= AUTH PAGES ================= */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* ================= STUDENT PAGES ================= */
import Dashboard from "./pages/student/Dashboard";
import AdmissionForm from "./pages/student/AdmissionForm";
import Status from "./pages/student/Status";
import Profile from "./pages/student/Profile";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeaders from "./pages/admin/AdminLeaders";
import Admissions from "./pages/admin/Admissions";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminEvents from "./pages/admin/AdminEvents";
import FacilitiesAdmin from "./pages/admin/FacilitiesAdmin";
import CreateAdmin from "./pages/admin/CreateAdmin";
import AdminSettings from "./pages/admin/AdminSettings";

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/facilities" element={<Facilities />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/admission"
          element={
            <ProtectedRoute>
              <AdmissionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN (NESTED) ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="leaders" element={<AdminLeaders />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="facilities" element={<FacilitiesAdmin />} />
          <Route path="create-admin" element={<CreateAdmin />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

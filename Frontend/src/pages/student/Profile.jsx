import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await api.get("/admission/me");
      setProfile(res.data);
      setForm(res.data);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= HANDLE TEXT CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SAVE PROFILE (TEXT ONLY) ================= */
  const saveProfile = async () => {
    try {
      await api.put(`/admission/update/${profile._id}`, form);
      toast.success("Profile updated");
      setEdit(false);
      loadProfile();
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= UPLOAD PHOTO ================= */
  const uploadPhoto = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("photo", file);

      await api.put(`/admission/update-photo/${profile._id}`, data);
      toast.success("Profile photo updated");
      loadProfile();
    } catch {
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= UPLOAD CERTIFICATE ================= */
  const uploadCertificate = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("birthCertificate", file);

      await api.put(`/admission/update-certificate/${profile._id}`, data);
      toast.success("Birth certificate updated");
      loadProfile();
    } catch {
      toast.error("Certificate upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>

      {/* ================= BASIC INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          edit={edit}
          onChange={handleChange}
        />

        <ProfileField
          label="Mobile"
          name="mobile"
          value={form.mobile}
          edit={edit}
          onChange={handleChange}
        />

        <ProfileField
          label="Address"
          name="address"
          value={form.address}
          edit={edit}
          onChange={handleChange}
        />

        <ProfileField
          label="Class"
          name="classApplying"
          value={form.classApplying}
          edit={edit}
          onChange={handleChange}
        />

        <ProfileField
          label="Guardian"
          name="guardianName"
          value={form.guardianName}
          edit={edit}
          onChange={handleChange}
        />
      </div>

      {/* ================= DOCUMENTS ================= */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentCard
          title="Profile Photo"
          src={profile.photo}
          onUpload={uploadPhoto}
          uploading={uploading}
        />

        <DocumentCard
          title="Birth Certificate"
          src={profile.birthCertificate}
          onUpload={uploadCertificate}
          uploading={uploading}
        />
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="mt-6 flex gap-3">
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ✏ Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={saveProfile}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              💾 Save
            </button>

            <button
              onClick={() => setEdit(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

const ProfileField = ({ label, name, value, edit, onChange }) => (
  <div>
    <label className="font-medium">{label}</label>
    {edit ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="input w-full"
      />
    ) : (
      <p className="mt-1">{value || "-"}</p>
    )}
  </div>
);

const DocumentCard = ({ title, src, onUpload, uploading }) => (
  <div className="border rounded shadow p-4 text-center">
    <h3 className="font-semibold mb-3">{title}</h3>

    {src ? (
      <img
        src={src}     // ✅ Cloudinary URL directly
        alt={title}
        className="h-48 mx-auto object-contain rounded mb-3"
      />
    ) : (
      <p className="text-gray-400 mb-3">No document uploaded</p>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={(e) => onUpload(e.target.files[0])}
      className="mb-2"
    />

    {uploading && (
      <p className="text-sm text-blue-500">Uploading...</p>
    )}
  </div>
);

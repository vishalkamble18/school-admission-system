import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await api.put(`/admission/update/${profile._id}`, form);
      toast.success("Profile updated successfully");
      setEdit(false);
      loadProfile();
    } catch {
      toast.error("Update failed");
    }
  };

  // ✅ Upload profile photo
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

  // ✅ Upload birth certificate
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
    <div className="p-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField
          label="Full Name"
          name="fullName"
          edit={edit}
          value={form.fullName}
          onChange={handleChange}
        />

        <ProfileField
          label="Mobile"
          name="mobile"
          edit={edit}
          value={form.mobile}
          onChange={handleChange}
        />

        <ProfileField
          label="Address"
          name="address"
          edit={edit}
          value={form.address}
          onChange={handleChange}
        />

        <ProfileField
          label="Class"
          name="classApplying"
          edit={edit}
          value={form.classApplying}
          onChange={handleChange}
        />

        <ProfileField
          label="Guardian"
          name="guardianName"
          edit={edit}
          value={form.guardianName}
          onChange={handleChange}
        />
      </div>

      {/* Document Viewer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Photo */}
        <DocumentCard
          title="Profile Photo"
          src={profile.photo}
          editable
          uploading={uploading}
          onUpload={uploadPhoto}
        />

        {/* Birth Certificate */}
        <DocumentCard
          title="Birth Certificate"
          src={profile.birthCertificate}
          editable
          uploading={uploading}
          onUpload={uploadCertificate}
        />
      </div>

      {/* Buttons */}
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

/* ================= COMPONENTS ================= */

const ProfileField = ({ label, name, value, edit, onChange }) => (
  <div>
    <label className="font-medium">{label}</label>
    {edit ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="input"
      />
    ) : (
      <p className="mt-1">{value || "-"}</p>
    )}
  </div>
);

const DocumentCard = ({ title, src, editable, onUpload, uploading }) => (
  <div className="border rounded shadow p-4 text-center dark:bg-gray-700">
    <h3 className="font-semibold mb-3">{title}</h3>

    {src ? (
      <img
        src={`http://localhost:5000/${src}`}
        alt={title}
        className="h-48 mx-auto object-contain rounded mb-3"
      />
    ) : (
      <p className="text-gray-400 mb-3">No document uploaded</p>
    )}

    {/* Upload Button */}
    {editable && (
      <>
        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={(e) => onUpload(e.target.files[0])}
        />

        {uploading && (
          <p className="text-sm text-blue-500">Uploading...</p>
        )}
      </>
    )}
  </div>
);

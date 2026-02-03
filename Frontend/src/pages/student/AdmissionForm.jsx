import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [certPreview, setCertPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const e = {};
    if (!form.fullName.value) e.fullName = "Full name required";
    if (!form.mobile.value) e.mobile = "Mobile required";
    if (!form.photo.files[0]) e.photo = "Photo required";
    if (!form.birthCertificate.files[0]) e.birthCertificate = "Certificate required";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    const data = new FormData(form);
    await api.post("/admission/submit", data);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="text-center px-4 py-16"
      >
        <div className="inline-block bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Application Submitted!
          </h2>
          <p className="mt-3 text-gray-600">
            You can track status from dashboard.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-3 sm:px-6 py-8 max-w-6xl mx-auto"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
        📝 Admission Form
      </h2>

      {/* Progress */}
      <div className="h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ${
            loading ? "w-full" : "w-1/2"
          }`}
        />
      </div>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5
                   bg-white rounded-2xl shadow-xl
                   p-5 sm:p-8"
      >

        <Field label="Full Name" name="fullName" error={errors.fullName} />
        <Field label="Mobile Number" name="mobile" error={errors.mobile} />

        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" name="dob" className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select name="gender" className="input">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <Field label="Class Applying" name="classApplying" />
        <Field label="Parent Name" name="guardianName" />
        <Field label="Address" name="address" />

        {/* Upload Photo */}
        <Upload
          label="Photo"
          name="photo"
          preview={photoPreview}
          onPreview={setPhotoPreview}
          error={errors.photo}
        />

        {/* Upload Certificate */}
        <Upload
          label="Birth Certificate"
          name="birthCertificate"
          preview={certPreview}
          onPreview={setCertPreview}
          error={errors.birthCertificate}
        />

        <div className="md:col-span-2 flex justify-center pt-4">
          <button
            disabled={loading}
            className="px-10 py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-green-500 to-emerald-600
                       hover:scale-105 transition-transform
                       disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </form>
    </motion.div>
  );
}

/* Reusable Components */

const Field = ({ label, name, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input name={name} className="input" />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Upload = ({ label, name, preview, onPreview, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>

    <div className="border-2 border-dashed rounded-xl p-3 text-center hover:border-blue-500 transition">
      <input
        type="file"
        name={name}
        className="w-full text-sm"
        onChange={e => onPreview(URL.createObjectURL(e.target.files[0]))}
      />
    </div>

    {preview && (
      <img
        src={preview}
        className="h-20 mt-3 mx-auto rounded-lg object-cover shadow"
      />
    )}

    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

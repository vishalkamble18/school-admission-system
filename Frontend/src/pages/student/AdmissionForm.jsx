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

    try {
      setLoading(true);
      const data = new FormData(form);
      await api.post("/admission/submit", data);
      setSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-green-600">
          🎉 Application Submitted!
        </h2>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Admission Form</h2>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">

        <Field label="Full Name" name="fullName" error={errors.fullName} />
        <Field label="Mobile Number" name="mobile" error={errors.mobile} />

        <input type="date" name="dob" className="input" />
        <select name="gender" className="input">
          <option>Male</option>
          <option>Female</option>
        </select>

        <Field label="Class Applying" name="classApplying" />
        <Field label="Parent Name" name="guardianName" />
        <Field label="Address" name="address" />

        <Upload label="Photo" name="photo" preview={photoPreview} onPreview={setPhotoPreview} error={errors.photo} />
        <Upload label="Birth Certificate" name="birthCertificate" preview={certPreview} onPreview={setCertPreview} error={errors.birthCertificate} />

        <button disabled={loading} className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg">
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </motion.div>
  );
}

const Field = ({ label, name, error }) => (
  <div>
    <label>{label}</label>
    <input name={name} className="input w-full" />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const Upload = ({ label, name, preview, onPreview, error }) => (
  <div>
    <label>{label}</label>
    <input
      type="file"
      name={name}
      onChange={(e) => onPreview(URL.createObjectURL(e.target.files[0]))}
    />
    {preview && <img src={preview} className="h-20 mt-2" />}
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

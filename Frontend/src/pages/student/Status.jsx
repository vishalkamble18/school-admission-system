import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Status() {
  const [data, setData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    api.get("/admission/me").then(res => setData(res.data));
  }, []);

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("admission-status.pdf");
  };

  if (!data) return <p className="p-6">No admission found</p>;

  return (
    <div className="p-8">
      <div ref={pdfRef} className="bg-white p-6 shadow max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Admission Status</h2>
        <p><b>Name:</b> {data.fullName}</p>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Status:</b> {data.status}</p>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded block mx-auto"
      >
        Download PDF
      </button>
    </div>
  );
}

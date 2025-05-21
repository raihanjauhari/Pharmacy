import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function AddObatForm({ onClose }) {
  const [formData, setFormData] = useState({
    kode_obat: "",
    id_user: "",
    nama_obat: "",
    harga_satuan: "",
    stok: "",
    deskripsi: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    // animasi masuk modal
    setTimeout(() => setIsVisible(true), 10);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // tombol close modal
  const handleCloseButton = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi: harga_satuan dan stok minimal 0
    if ((name === "stok" || name === "harga_satuan") && Number(value) < 0) {
      return; // abaikan input jika negatif
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi final sebelum submit
    if (Number(formData.stok) < 0 || Number(formData.harga_satuan) < 0) {
      alert("Stok dan harga satuan tidak boleh kurang dari 0!");
      return;
    }

    console.log("Data obat baru:", formData);
    handleCloseButton();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        ref={modalRef}
        className={`bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative transform
          transition-opacity transition-transform duration-300 ease-in-out will-change-[opacity,transform]
          ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
      >
        <button
          onClick={handleCloseButton}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-slate-700">
          Tambah Data Obat
        </h2>
        <FormObat
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isAddForm={true}
        />
      </div>
    </div>
  );
}

function FormObat({ formData, handleChange, handleSubmit, isAddForm }) {
  const fields = [
    "kode_obat",
    "id_user",
    "nama_obat",
    "harga_satuan",
    "stok",
    "deskripsi",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {fields.map((field, index) => (
        <div
          className={field === "deskripsi" ? "md:col-span-2" : ""}
          key={index}
        >
          <label className="block mb-1 text-sm font-medium text-slate-600 capitalize">
            {field.replace("_", " ")}
          </label>
          {field === "deskripsi" ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-slate-300 focus:ring-2 focus:ring-[#8bacc5] focus:outline-none px-4 py-3 rounded-lg transition resize-none"
              rows="4"
              placeholder={`Tulis deskripsi ${
                isAddForm ? "obat baru" : "obat"
              }...`}
            />
          ) : (
            <input
              type={
                ["harga_satuan", "stok"].includes(field) ? "number" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min={["harga_satuan", "stok"].includes(field) ? 0 : undefined} // <-- validasi HTML
              className="w-full border border-slate-300 focus:ring-2 focus:ring-[#8bacc5] focus:outline-none px-4 py-3 rounded-lg transition"
              placeholder={`Masukkan ${field.replace("_", " ")}`}
            />
          )}
        </div>
      ))}
      <div className="md:col-span-2 text-center mt-2">
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg text-sm font-medium shadow-lg ${
            isAddForm
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          style={{ transition: "none" }}
        >
          {isAddForm ? "Simpan" : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}

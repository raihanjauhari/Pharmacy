import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function AddObatForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    kode_obat: "",
    id_user: "",
    nama_obat: "",
    harga_satuan: "",
    stok: "",
    deskripsi: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  // Animasi buka modal & klik luar modal untuk tutup
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Update form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cegah input negatif untuk stok dan harga
    if ((name === "stok" || name === "harga_satuan") && Number(value) < 0) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi stok dan harga ≥ 0
    if (Number(formData.stok) < 0 || Number(formData.harga_satuan) < 0) {
      alert("Stok dan harga satuan tidak boleh kurang dari 0!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:3000/api/obat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          harga_satuan: Number(formData.harga_satuan),
          stok: Number(formData.stok),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal menambahkan data obat");
      }

      const result = await response.json();
      console.log("Data obat baru berhasil ditambahkan:", result);

      if (onSuccess) onSuccess(result); // callback jika ada
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity px-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className={`bg-white w-full
          max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl
          rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 relative transform
          transition-opacity transition-transform duration-300 ease-in-out will-change-[opacity,transform]
          ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          aria-label="Close modal"
        >
          <X
            size={20}
            className="sm:size-[22px] md:size-[24px] lg:size-[28px]"
            aria-hidden="true"
          />
        </button>

        <h2
          id="modal-title"
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center text-slate-700"
        >
          Tambah Data Obat
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <FormObat
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isAddForm={true}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function FormObat({
  formData,
  handleChange,
  handleSubmit,
  isAddForm,
  isLoading,
}) {
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
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
      aria-describedby="modal-description"
    >
      {fields.map((field, index) => (
        <div
          className={field === "deskripsi" ? "md:col-span-2" : ""}
          key={index}
        >
          <label
            htmlFor={field}
            className="block mb-1 text-sm sm:text-base font-medium text-slate-600 capitalize"
          >
            {field.replace("_", " ")}
          </label>
          {field === "deskripsi" ? (
            <textarea
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              rows="4"
              placeholder={`Tulis deskripsi ${
                isAddForm ? "obat baru" : "obat"
              }...`}
              className="w-full border border-slate-300 focus:ring-2 focus:ring-[#8bacc5] focus:outline-none px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition resize-none text-sm sm:text-base"
              disabled={isLoading}
            />
          ) : (
            <input
              id={field}
              type={
                ["harga_satuan", "stok"].includes(field) ? "number" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min={["harga_satuan", "stok"].includes(field) ? 0 : undefined}
              placeholder={`Masukkan ${field.replace("_", " ")}`}
              className="w-full border border-slate-300 focus:ring-2 focus:ring-[#8bacc5] focus:outline-none px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
              disabled={isLoading}
            />
          )}
        </div>
      ))}
      <div className="md:col-span-2 text-center mt-3">
        <button
          type="submit"
          className={`px-5 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg ${
            isAddForm
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          style={{ transition: "none" }}
          disabled={isLoading}
        >
          {isLoading
            ? "Menyimpan..."
            : isAddForm
            ? "Simpan"
            : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}

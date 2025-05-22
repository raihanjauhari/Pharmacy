import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function EditObatForm({ onClose, dataObat, onSuccess }) {
  const [formData, setFormData] = useState(dataObat || {});

  useEffect(() => {
    if (dataObat) {
      setFormData(dataObat); // isi ulang ketika data berubah
    }
  }, [dataObat]);

  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
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

  const handleCloseButton = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "harga_satuan" || name === "stok") && Number(value) < 0) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Konversi stok dan harga_satuan ke number sebelum submit
    const dataToSend = {
      ...formData,
      stok: Number(formData.stok),
      harga_satuan: Number(formData.harga_satuan),
    };

    if (dataToSend.stok < 0 || dataToSend.harga_satuan < 0) {
      alert("Stok dan harga satuan tidak boleh kurang dari 0!");
      return;
    }

    console.log("Kirim data:", dataToSend);

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/obat/${dataToSend.kode_obat}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detail:", errorData);
        throw new Error("Gagal mengupdate data");
      }

      const updatedData = await response.json();
      console.log("Data berhasil diupdate:", updatedData);
      alert("Data obat berhasil diubah!");

      if (onSuccess) {
        onSuccess(updatedData); // beri tahu parent kalau update berhasil
      }

      handleCloseButton(); // Tutup modal setelah sukses
    } catch (error) {
      console.error("Error saat update data:", error);
      alert("Terjadi kesalahan saat mengubah data");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity p-4 sm:p-6 md:p-8 overflow-auto">
      <div
        ref={modalRef}
        className={`bg-white w-full max-w-xs sm:max-w-lg md:max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 relative transform
          transition-opacity transition-transform duration-300 ease-in-out will-change-[opacity,transform]
          ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={handleCloseButton}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          aria-label="Close modal"
        >
          <X size={28} className="sm:size-[32px]" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-slate-700">
          Edit Data Obat
        </h2>

        <FormObat
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function FormObat({ formData, handleChange, handleSubmit }) {
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
    >
      {fields.map((field, index) => (
        <div
          className={field === "deskripsi" ? "md:col-span-2" : ""}
          key={index}
        >
          <label className="block mb-1 text-sm sm:text-base font-medium text-slate-600 capitalize">
            {field.replace("_", " ")}
          </label>

          {field === "deskripsi" ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition resize-none text-sm sm:text-base
      ${
        field === "kode_obat" || field === "id_user"
          ? "bg-gray-100 cursor-not-allowed"
          : "focus:ring-2 focus:ring-[#8bacc5] focus:outline-none"
      }`}
              rows="4"
              placeholder="Tulis deskripsi obat..."
              readOnly={field === "kode_obat" || field === "id_user"}
            />
          ) : (
            <input
              type={
                ["harga_satuan", "stok"].includes(field) ? "number" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min={["harga_satuan", "stok"].includes(field) ? 0 : undefined}
              className={`w-full border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base
      ${
        field === "kode_obat" || field === "id_user"
          ? "bg-gray-100 cursor-not-allowed"
          : "focus:ring-2 focus:ring-[#8bacc5] focus:outline-none"
      }`}
              placeholder={`Masukkan ${field.replace("_", " ")}`}
              readOnly={field === "kode_obat" || field === "id_user"}
            />
          )}
        </div>
      ))}

      <div className="md:col-span-2 text-center mt-3">
        <button
          type="submit"
          className="bg-green-600 text-white hover:bg-green-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg transition-colors"
          style={{ transition: "none" }}
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}

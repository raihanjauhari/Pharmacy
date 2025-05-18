import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "./assets/404.jpg"; // Gambar kamu

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center -mt-15">
      <img
        src={NotFoundImage}
        alt="Ilustrasi Halaman Tidak Ditemukan"
        className="w-[350px] sm:w-[500px] mb-3"
      />

      <h2 className="text-4xl  font-bold text-blue-700 mb-4">
        Halaman Tidak Ditemukan
      </h2>

      <p className="text-lg sm:text-xl text-gray-600 mb-6">
        Maaf, halaman yang kamu cari tidak tersedia
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}

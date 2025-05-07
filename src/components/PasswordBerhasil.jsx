import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessIcon from "../assets/accepted.png"; // Centang hijau

const PasswordBerhasil = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Arahkan ke halaman login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-[20px] p-8 w-full max-w-md shadow-lg text-center">
        <h2 className="text-3xl font-bold text-[#2A4D69] mb-3">BERHASIL</h2>

        {/* Ikon Berhasil */}
        <img
          src={SuccessIcon}
          alt="Berhasil"
          className="mx-auto mb-4 w-40 h-40"
        />
        <p className="text-[#000000] mb-6">
          Selamat! Password Anda berhasil dibuat. Klik "Lanjutkan" untuk login.
        </p>

        <button
          onClick={handleClick}
          className="w-full bg-[#2A4D69] text-white py-3 rounded-xl font-medium transition-colors hover:bg-[#2A4D69]/90 duration-200"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default PasswordBerhasil;

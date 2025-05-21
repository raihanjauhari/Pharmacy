import React from "react";
import Jumbo from "../../assets/jumbo.jpeg";
import { LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IbuJumbo from "../../assets/Ibujumbo.png";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-2 sm:right-4 mt-2 w-[90vw] xs:w-72 sm:w-80 md:w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <div className="mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-500">
          Akun Anda
        </h3>
        <div className="flex items-center mt-2 space-x-3">
          <img
            src={IbuJumbo}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm sm:text-base text-gray-900 font-semibold">
              Ibu Jumbo
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              ibujumbo22@example.com
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Petugas</p>
          </div>
        </div>
      </div>

      <hr className="w-full border-gray-300" />

      <div className="mt-2">
        <button
          className="flex items-center justify-center gap-2 text-red-600 w-full h-9 sm:h-10 text-sm sm:text-base hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => {
            setTimeout(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role"); // Hapus role juga
              navigate("/");
            }, 1000); // delay 1000 ms = 1 detik
          }}
        >
          <LucideLogOut className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;

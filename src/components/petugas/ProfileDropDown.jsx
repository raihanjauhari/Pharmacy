import React from "react";
import Jumbo from "../../assets/jumbo.jpeg";
import { LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500">Akun Anda</h3>
        <div className="flex items-center mt-2 space-x-3">
          <img src={Jumbo} alt="Profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-gray-900 font-semibold">DON Jumbo</p>
            <p className="text-sm text-gray-600">donjumbo22@example.com</p>
            <p className="text-sm text-gray-500">Petugas</p>
          </div>
        </div>
      </div>

      <hr className="w-full m-0 p-0 border-gray-300" />

      <div className="mt-2">
        <button
          className="flex items-center justify-center gap-2 text-red-600 w-full h-10 hover:bg-gray-100 rounded-md"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <LucideLogOut className="text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;

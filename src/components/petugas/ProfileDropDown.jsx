import React, { useEffect, useState } from "react";
import { LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emailLogin = localStorage.getItem("email");
    console.log("Email login:", emailLogin);

    fetch("http://127.0.0.1:3000/api/user")
      .then((res) => res.json())
      .then((data) => {
        console.log("User data from API:", data);
        const currentUser = data.find((u) => u.email === emailLogin);
        console.log("Matched user:", currentUser);
        setUser(currentUser || null);
      })
      .catch((err) => console.error("Error fetch user:", err))
      .finally(() => setLoading(false));
  }, []);

  // Skeleton placeholder (simple)
  const Skeleton = () => (
    <div className="animate-pulse absolute right-2 sm:right-4 mt-2 w-[90vw] xs:w-72 sm:w-80 md:w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-55 ">
      <div className="mb-4">
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex flex-col space-y-1">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-40 bg-gray-300 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div className="h-9 bg-gray-300 rounded"></div>
    </div>
  );

  if (loading) return <Skeleton />;
  if (!user) return <div>User tidak ditemukan</div>;

  return (
    <div className="fade-in absolute -right-2 sm:right-4 mt-2 w-[90vw] xs:w-72 sm:w-80 md:w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 transition-opacity duration-300 ease-in-out opacity-100">
      <div className="mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-500">
          Akun Anda
        </h3>
        <div className="flex items-center mt-2 space-x-3">
          <img
            src={`http://127.0.0.1:3000/images/user/${
              user.foto_user || "default.jpg"
            }`}
            alt={user.nama_user || "User"}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm sm:text-base text-gray-900 font-semibold">
              {user.nama_user || "User"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {user.email || "-"}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {user.role || "-"}
            </p>
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
              localStorage.removeItem("role");
              navigate("/");
            }, 1000);
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

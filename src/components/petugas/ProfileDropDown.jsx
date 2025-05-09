import React from "react";

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500">Your Account</h3>
        <div className="flex items-center mt-2 space-x-3">
          <img
            src="/path/to/profile.jpg" // Ganti sesuai lokasi gambar
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-900 font-semibold">Alex Martinez</p>
            <div className="flex space-x-2 text-sm text-blue-600">
              <a href="#">View Profile</a>
              <a href="#">Dashboard</a>
              <a href="#">Admin</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500">
          Your Organizations
        </h3>
        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold text-gray-800">City Corps Kids</p>
            <div className="flex space-x-2 text-sm text-blue-600">
              <a href="#">View Profile</a>
              <a href="#">Dashboard</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800">My New Organization</p>
            <div className="flex space-x-2 text-sm text-blue-600">
              <a href="#">View Profile</a>
              <a href="#">Dashboard</a>
            </div>
          </div>
        </div>
      </div>
      <button className="text-center text-red-600 w-full py-2 hover:bg-gray-100 rounded-md">
        Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;

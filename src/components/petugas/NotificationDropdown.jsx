import React from "react";
import { AlertCircle } from "lucide-react";
import Atta from "../../assets/doctor/Atta.jpeg";
import Mae from "../../assets/doctor/Mae.jpeg";
import Meri from "../../assets/doctor/Meri.jpeg";
import Nurman from "../../assets/doctor/Nurman.jpeg";

const NotificationDropdown = () => {
  const notifications = [
    {
      id: 1,
      type: "eresep",
      text: "e-Resep baru dari dr. Atta",
      time: "1 menit lalu",
      avatar: Atta,
    },
    {
      id: 2,
      type: "eresep",
      text: "e-Resep baru dari dr. Mae",
      time: "5 menit lalu",
      avatar: Meri,
    },
    {
      id: 3,
      type: "eresep",
      text: "e-Resep baru dari dr. Nurman",
      time: "15 menit lalu",
      avatar: Mae,
    },
    {
      id: 4,
      type: "eresep",
      text: "e-Resep baru dari dr. Meri",
      time: "20 menit lalu",
      avatar: Nurman,
    },
  ];

  // Fungsi untuk menangani klik pada setiap notifikasi
  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi ${notifId} telah diklik!`);
    // Di sini bisa menambahkan logika navigasi atau aksi lainnya
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 border-2">
      <div className="bg-[#2A4D69] text-white font-semibold px-4 py-2 rounded-t-lg">
        Notifikasi
      </div>
      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.map((notif) => (
          <li key={notif.id}>
            <button
              onClick={() => handleNotificationClick(notif.id)} // Panggil fungsi saat diklik
              className="flex items-start gap-3 p-3 w-full text-left hover:bg-gray-50 focus:outline-none"
            >
              {notif.avatar ? (
                <img
                  src={notif.avatar}
                  alt={notif.text}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <AlertCircle className="text-indigo-500 mt-1" />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900">{notif.text}</p>
                <p className="text-xs text-gray-400">{notif.time}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="text-center py-2 border-t">
        <a
          href="#"
          className="text-emerald-500 hover:underline text-sm font-medium"
        >
          Lihat semua notifikasi
        </a>
      </div>
    </div>
  );
};

export default NotificationDropdown;

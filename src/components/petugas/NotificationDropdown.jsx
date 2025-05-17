import React, { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import Atta from "../../assets/doctor/Atta.jpeg";
import Mae from "../../assets/doctor/Mae.jpeg";
import Meri from "../../assets/doctor/Meri.jpeg";
import Nurman from "../../assets/doctor/Nurman.jpeg";

const NotificationDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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
    {
      id: 5,
      type: "eresep",
      text: "e-Resep baru dari dr. Atta",
      time: "30 menit lalu",
      avatar: Atta,
    },
    {
      id: 6,
      type: "eresep",
      text: "e-Resep baru dari dr. Mae",
      time: "45 menit lalu",
      avatar: Mae,
    },
    {
      id: 7,
      type: "eresep",
      text: "e-Resep baru dari dr. Meri",
      time: "1 jam lalu",
      avatar: Meri,
    },
    {
      id: 8,
      type: "eresep",
      text: "e-Resep baru dari dr. Nurman",
      time: "2 jam lalu",
      avatar: Nurman,
    },
  ];

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi ${notifId} telah diklik!`);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute -right-20 translate-x-4 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 border-2 flex flex-col"
    >
      <div className="bg-[#2A4D69] text-white font-semibold px-4 py-2 rounded-t-lg">
        Notifikasi
      </div>

      {/* Scrollable */}
      <div className="max-h-120 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {visibleNotifications.map((notif) => (
            <li key={notif.id}>
              <button
                onClick={() => handleNotificationClick(notif.id)}
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
      </div>

      {/* Lihat Semua */}
      {!showAll && notifications.length > 5 && (
        <div className="text-center py-2 border-t bg-white rounded-b-lg">
          <button
            onClick={() => setShowAll(true)}
            className="w-90 px-4 py-2 bg-[#557187] text-white rounded-md hover:bg-[#2A4D69]"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

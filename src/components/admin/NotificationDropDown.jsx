import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, X } from "lucide-react";

const STOK_MINIMAL = 10;

const generateObatNotification = (obat) => {
  if (obat.stok === 0) {
    return `Obat ${obat.nama_obat} telah habis! Segera lakukan pengisian stok.`;
  } else if (obat.stok <= STOK_MINIMAL) {
    return `Stok obat ${obat.nama_obat} hampir habis (${obat.stok} tersisa).`;
  } else {
    return null;
  }
};

const NotificationDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Ambil data obat dari API
    const fetchObat = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/obat");
        if (!res.ok) throw new Error("Gagal mengambil data obat");
        const data = await res.json();

        // Filter dan buat notifikasi stok
        const notifs = data
          .map((obat, index) => {
            const text = generateObatNotification(obat);
            if (!text) return null;
            return {
              id: obat.kode_obat,
              text,
              time: `${(index + 1) * 10} menit lalu`, // Contoh waktu statis bisa disesuaikan
            };
          })
          .filter(Boolean);

        setNotifications(notifs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchObat();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 4);

  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi obat dengan id ${notifId} telah diklik!`);
  };

  const handleDeleteNotification = (notifId) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notifId));
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute -right-20 mt-2 w-72 xs:w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] bg-white rounded-lg shadow-lg z-50 border-2 flex flex-col"
      style={{ transform: "translateX(1rem)" }}
    >
      <div className="bg-[#2A4D69] text-white font-semibold px-4 py-2 rounded-t-lg text-sm sm:text-base">
        Notifikasi
      </div>

      <div
        className={`${
          showAll ? "max-h-[25rem]" : "max-h-80 sm:max-h-96"
        } overflow-y-auto`}
      >
        <ul className="divide-y divide-gray-200">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notif) => (
              <li key={notif.id}>
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-50"
                  style={{ minHeight: "3rem" }} // Atau pakai height jika ingin fixed persis, misal 48px (3rem)
                >
                  <button
                    onClick={() => handleNotificationClick(notif.id)}
                    className="flex items-center gap-3 text-left flex-1 focus:outline-none"
                    style={{ alignItems: "center" }} // pastikan ikon dan teks sejajar tengah vertikal
                  >
                    <AlertCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
                    <div
                      className="text-xs text-gray-900"
                      style={{
                        lineHeight: "1.2rem",
                        maxHeight: "2.4rem",
                        overflow: "hidden",
                      }} // agar teks tidak terlalu tinggi
                    >
                      {notif.text}
                    </div>
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notif.id)}
                    className="p-2 hover:bg-red-100 rounded-md ml-2"
                    aria-label="Hapus notifikasi"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </li>
          )}
        </ul>
      </div>

      {!showAll && notifications.length > 4 && (
        <div className="text-center py-2 border-t bg-white rounded-b-lg">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-[#557187] text-white rounded-md text-sm hover:bg-[#2A4D69] transition-colors"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

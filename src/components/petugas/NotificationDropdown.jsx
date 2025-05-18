import React, { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import Atta from "../../assets/doctor/Atta.jpeg";
import Mae from "../../assets/doctor/Mae.jpeg";
import Meri from "../../assets/doctor/Meri.jpeg";
import Nurman from "../../assets/doctor/Nurman.jpeg";

const doctorImages = {
  "dr. Atta": Atta,
  "dr. Mae": Mae,
  "dr. Meri": Meri,
  "dr. Nurman": Nurman,
  "dr. Lestari Wardhani": Mae,
  "dr. Dewa Mahendra": Meri,
  "dr. Ari Wibowo": Atta,
  "dr. Nina Kartika": Nurman,
  "dr. Bambang Sutrisno": Atta,
  "dr. Sari Fitriani": Mae,
  "dr. Rani Maulida": Meri,
};

const eresepData = [
  {
    id: "PD001",
    status: "Diproses",
    resep: {
      namaPasien: "Anisa Aulya",
      namaDokter: "dr. Lestari Wardhani",
    },
  },
  {
    id: "PD002",
    status: "Menunggu Pembayaran",
    resep: {
      namaPasien: "Setya Adjie",
      namaDokter: "dr. Dewa Mahendra",
    },
  },
  {
    id: "PD003",
    status: "Sudah Bayar",
    resep: {
      namaPasien: "Putri Rahma",
      namaDokter: "dr. Ari Wibowo",
    },
  },
  {
    id: "PD004",
    status: "Selesai",
    resep: {
      namaPasien: "Bagas Pratama",
      namaDokter: "dr. Nina Kartika",
    },
  },
  {
    id: "PD005",
    status: "Sudah Bayar",
    resep: {
      namaPasien: "Neneknya DON",
      namaDokter: "dr. Meri",
    },
  },
  {
    id: "PD006",
    status: "Diproses",
    resep: {
      namaPasien: "Wahyu Kurniawan",
      namaDokter: "dr. Bambang Sutrisno",
    },
  },
  {
    id: "PD007",
    status: "Menunggu Pembayaran",
    resep: {
      namaPasien: "Lia Apriyani",
      namaDokter: "dr. Sari Fitriani",
    },
  },
  {
    id: "PD008",
    status: "Sudah Bayar",
    resep: {
      namaPasien: "Deni Yulianto",
      namaDokter: "dr. Rani Maulida",
    },
  },
];

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

  const generateNotificationText = (item) => {
    const { status, resep } = item;
    switch (status) {
      case "Menunggu Pembayaran":
        return `e-Resep baru dari ${resep.namaDokter}`;
      case "Sudah Bayar":
        return `e-Resep pasien ${resep.namaPasien} telah dibayarkan`;
      case "Diproses":
        return `e-Resep pasien ${resep.namaPasien} telah diproses`;
      case "Selesai":
        return `e-Resep pasien ${resep.namaPasien} telah diambil`;
      default:
        return "Notifikasi e-Resep";
    }
  };

  const notifications = eresepData.map((item, index) => ({
    id: item.id,
    text: generateNotificationText(item),
    time: `${(index + 1) * 5} menit lalu`,
    avatar: doctorImages[item.resep.namaDokter] || null,
  }));

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 4);

  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi ${notifId} telah diklik!`);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute -right-20 mt-2 w-72 xs:w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] bg-white rounded-lg shadow-lg z-50 border-2 flex flex-col"
      style={{ transform: "translateX(1rem)" }} // sesuaikan supaya dropdown tidak keluar layar
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
          {visibleNotifications.map((notif) => (
            <li key={notif.id}>
              <button
                onClick={() => handleNotificationClick(notif.id)}
                className="flex items-start gap-3 p-2 xs:p-3 w-full text-left hover:bg-gray-50 focus:outline-none"
              >
                {notif.avatar ? (
                  <img
                    src={notif.avatar}
                    alt={notif.text}
                    className="w-8 h-8 xs:w-10 xs:h-10 rounded-full object-cover"
                  />
                ) : (
                  <AlertCircle className="text-indigo-500 mt-1 w-6 h-6 xs:w-7 xs:h-7" />
                )}
                <div className="text-xs xs:text-sm">
                  <p className="font-medium text-gray-900">{notif.text}</p>
                  <p className="text-[10px] xs:text-xs text-gray-400">
                    {notif.time}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {!showAll && notifications.length > 5 && (
        <div className="text-center py-2 border-t bg-white rounded-b-lg ">
          <button
            onClick={() => setShowAll(true)}
            className="xs:w-50 sm:w-85 md:w-100 lg:w-120 px-3 py-2 xs:px-4 xs:py-2.5 bg-[#557187] text-white rounded-md text-xs xs:text-sm hover:bg-[#2A4D69] transition-colors"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, X } from "lucide-react";

const NotificationDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pasienRes, resepRes, dokterRes, detailRes] = await Promise.all([
          fetch("http://127.0.0.1:3000/api/pasien"),
          fetch("http://127.0.0.1:3000/api/eresep"),
          fetch("http://127.0.0.1:3000/api/dokter"),
          fetch("http://127.0.0.1:3000/api/detail_eresep"),
        ]);

        if (!pasienRes.ok || !resepRes.ok || !dokterRes.ok || !detailRes.ok) {
          throw new Error("Gagal mengambil salah satu data API");
        }

        const [pasienData, resepData, dokterData, detailData] =
          await Promise.all([
            pasienRes.json(),
            resepRes.json(),
            dokterRes.json(),
            detailRes.json(),
          ]);

        const formatted = resepData.map((resep, index) => {
          const pasien = pasienData.find(
            (p) => String(p.id_pendaftaran) === String(resep.id_pendaftaran)
          );
          const idDokter = pasien?.id_dokter || "D001";
          const dokter = dokterData.find(
            (d) => String(d.id_dokter) === String(idDokter)
          );

          const namaPasien =
            pasien?.nama_pasien || "Nama pasien tidak tersedia";
          const namaDokter =
            dokter?.nama_dokter || "Nama dokter tidak diketahui";
          const status = resep.status || "Tidak diketahui";

          let avatar = null;
          if (status === "Menunggu Pembayaran") {
            avatar = dokter?.foto_dokter
              ? `http://localhost:3000/images/dokter/${dokter.foto_dokter}`
              : null;
          } else {
            avatar = pasien?.foto_pasien
              ? `http://localhost:3000/images/pasien/${pasien.foto_pasien}`
              : null;
          }

          // Cari tanggal detail dari detailData berdasarkan id_eresep
          const detail = detailData.find(
            (d) => String(d.id_eresep) === String(resep.id_eresep)
          );

          // Fungsi ubah tanggal "01 Mei 2025" ke objek Date
          const parseTanggal = (tanggalStr) => {
            // buat mapping bulan Indonesia ke nomor bulan 0-11
            const bulanMap = {
              Januari: 0,
              Februari: 1,
              Maret: 2,
              April: 3,
              Mei: 4,
              Juni: 5,
              Juli: 6,
              Agustus: 7,
              September: 8,
              Oktober: 9,
              November: 10,
              Desember: 11,
            };
            const parts = tanggalStr.split(" ");
            if (parts.length !== 3) return null;
            const day = parseInt(parts[0]);
            const month = bulanMap[parts[1]];
            const year = parseInt(parts[2]);
            if (isNaN(day) || month === undefined || isNaN(year)) return null;
            return new Date(year, month, day);
          };

          let time = "Waktu tidak diketahui";
          if (detail && detail.tanggal_eresep) {
            const tanggal = parseTanggal(detail.tanggal_eresep);
            if (tanggal) {
              const now = new Date();
              const diffMs = now - tanggal; // selisih waktu milidetik
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              if (diffDays === 0) {
                time = "Hari ini";
              } else if (diffDays === 1) {
                time = "1 hari lalu";
              } else if (diffDays > 1) {
                time = `${diffDays} hari lalu`;
              } else {
                time = "Tanggal di masa depan";
              }
            }
          }

          const text = (() => {
            switch (status) {
              case "Menunggu Pembayaran":
                return `e-Resep baru dari ${namaDokter}`;
              case "Sudah Bayar":
                return `e-Resep pasien ${namaPasien} telah dibayarkan`;
              case "Diproses":
                return `e-Resep pasien ${namaPasien} telah diproses`;
              case "Selesai":
                return `e-Resep pasien ${namaPasien} telah diambil`;
              default:
                return "Notifikasi e-Resep";
            }
          })();

          return {
            id: resep.id_eresep || `R${index}`,
            text,
            time,
            avatar,
          };
        });

        setNotifications(formatted);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 4);

  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi ${notifId} telah diklik!`);
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
              <li key={notif.id} className="flex items-center justify-between">
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
                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="p-2 hover:bg-red-100 rounded-md ml-2"
                  aria-label="Hapus notifikasi"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </li>
          )}
        </ul>
      </div>

      {!showAll && notifications.length > 5 && (
        <div className="text-center py-2 border-t bg-white rounded-b-lg">
          <button
            onClick={() => setShowAll(true)}
            className="px-3 py-2 xs:px-4 xs:py-2.5 bg-[#557187] text-white rounded-md text-xs xs:text-sm hover:bg-[#2A4D69] transition-colors"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

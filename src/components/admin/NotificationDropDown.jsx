import React, { useEffect, useRef, useState } from "react"
import { AlertCircle, X } from "lucide-react" // tambah ikon X untuk hapus

const obatData = [
  { id: "OB001", namaObat: "Paracetamol", stok: 10, stokMinimal: 15 },
  { id: "OB002", namaObat: "Amoxicillin", stok: 2, stokMinimal: 5 },
  { id: "OB003", namaObat: "Vitamin C", stok: 0, stokMinimal: 10 },
  { id: "OB004", namaObat: "Antibiotik X", stok: 20, stokMinimal: 10 },
  { id: "OB005", namaObat: "Ibuprofen", stok: 5, stokMinimal: 7 },
  { id: "OB006", namaObat: "Antasida", stok: 1, stokMinimal: 3 },
  { id: "OB007", namaObat: "Obat Flu", stok: 12, stokMinimal: 10 },
  { id: "OB008", namaObat: "Salep Luka", stok: 0, stokMinimal: 5 },
  { id: "OB009", namaObat: "Vitamin D", stok: 6, stokMinimal: 8 },
  { id: "OB010", namaObat: "Suplemen Omega", stok: 15, stokMinimal: 10 },
  { id: "OB011", namaObat: "Antibiotik Y", stok: 3, stokMinimal: 5 },
  { id: "OB012", namaObat: "Obat Batuk", stok: 0, stokMinimal: 6 },
  { id: "OB013", namaObat: "Obat Sakit Kepala", stok: 8, stokMinimal: 10 },
  { id: "OB014", namaObat: "Obat Maag", stok: 9, stokMinimal: 12 },
  { id: "OB015", namaObat: "Vitamin B12", stok: 2, stokMinimal: 4 },
]

const generateObatNotification = (obat) => {
  if (obat.stok === 0) {
    return `Obat ${obat.namaObat} telah habis! Segera lakukan pengisian stok.`
  } else if (obat.stok <= obat.stokMinimal) {
    return `Stok obat ${obat.namaObat} hampir habis (${obat.stok} tersisa).`
  } else {
    return null
  }
}

const NotificationDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null)
  const [showAll, setShowAll] = useState(false)

  // State notifikasi yang tampil dan bisa dihapus
  const [notifications, setNotifications] = useState(() => {
    return obatData
      .map((obat, index) => {
        const text = generateObatNotification(obat)
        if (!text) return null
        return {
          id: obat.id,
          text,
          time: `${(index + 1) * 10} menit lalu`,
        }
      })
      .filter(Boolean)
  })

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 4)

  const handleNotificationClick = (notifId) => {
    alert(`Notifikasi obat dengan id ${notifId} telah diklik!`)
  }

  const handleDeleteNotification = (notifId) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notifId))
  }

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
                <div className="flex items-center justify-between p-1 hover:bg-gray-50">
                  <button
                    onClick={() => handleNotificationClick(notif.id)}
                    className="flex items-center gap-3 text-left flex-1 focus:outline-none"
                  >
                    <AlertCircle className="text-red-500 w-6 h-6" />
                    <div className="text-xs text-gray-900">{notif.text}</div>
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
  )
}

export default NotificationDropdown

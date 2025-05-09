import React from "react";

const LaporanCard = () => {
  return (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md overflow-hidden shadow-sm">
      {/* Konten laporan */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Laporan Keuangan
        </h3>
        <p className="text-gray-600 mt-2">
          Berikut adalah ringkasan laporan keuangan bulan ini. Silakan klik
          tombol di bawah untuk melihat detail selengkapnya.
        </p>
      </div>

      {/* Tombol "Lihat Detail Laporan" */}
      <button className="w-full px-4 py-2 text-center bg-gray-100 hover:bg-gray-200 border-t border-gray-300 text-indigo-700 font-semibold">
        Lihat Detail Laporan
      </button>
    </div>
  );
};

export default LaporanCard;

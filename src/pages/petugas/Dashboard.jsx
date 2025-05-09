import React from "react";
import Parmasi from "../../assets/Parmasi.jpg";
import {
  LucideBriefcaseMedical,
  LucideCircleArrowRight,
  LucideHospital,
  LucideShieldPlus,
  LucideTriangleAlert,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <img src={Parmasi} alt="banner" />
      <div>
        <h1>Dashboard</h1>
        <h2>Data stok obat dan E-Resep</h2>
      </div>

      {/* Status Inventaris */}
      <div className="w-full max-w-md mx-auto border-3 border-[#32A67A] rounded-md overflow-hidden shadow-sm bg-[#EAF6F1] mb-10">
        {/* Konten laporan */}
        <div className="p-4 text-center">
          <div className="flex justify-center">
            <LucideShieldPlus className="text-[#32A67A] w-14 h-14" />
          </div>

          <h3 className="text-3xl font-semibold text-gray-800 mt-2">Good</h3>
          <p className="text-gray-600 mt-2 font-semibold">Status Inventaris</p>
        </div>

        {/* Tombol "Lihat Detail Laporan" */}
        <div className="bg-[#32A67A] hover:bg-[#75A392]">
          <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
            <p className="font-semibold">Lihat Detail Laporan</p>
            <LucideCircleArrowRight />
          </button>
        </div>
      </div>

      {/* EResep Masuk */}
      <div className="w-full max-w-md mx-auto border-3 border-[#E3C731] rounded-md overflow-hidden shadow-sm bg-[#FCF9EA] mb-10">
        {/* Konten laporan */}
        <div className="p-4 text-center">
          <div className="flex justify-center">
            <LucideBriefcaseMedical className="text-[#E3C731] w-14 h-14" />
          </div>

          <h3 className="text-3xl font-semibold text-gray-800 mt-2">129</h3>
          <p className="text-gray-600 mt-2 font-semibold">E-Resep Masuk</p>
        </div>

        {/* Tombol "Lihat Detail Laporan" */}
        <div className="bg-[#E3C731] hover:bg-[#C6B662]">
          <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
            <p className="font-semibold">Lihat Detail Laporan</p>
            <LucideCircleArrowRight />
          </button>
        </div>
      </div>

      {/* Obat Tersedia */}
      <div className="w-full max-w-md mx-auto border-3 border-[#33A7DC] rounded-md overflow-hidden shadow-sm bg-[#EAF6FB] mb-10">
        {/* Konten laporan */}
        <div className="p-4 text-center">
          <div className="flex justify-center">
            <LucideHospital className="text-[#33A7DC] w-14 h-14" />
          </div>

          <h3 className="text-3xl font-semibold text-gray-800 mt-2">490</h3>
          <p className="text-gray-600 mt-2 font-semibold">Stok Obat Tersedia</p>
        </div>

        {/* Tombol "Lihat Detail Laporan" */}
        <div className="bg-[#33A7DC] hover:bg-[#5BA5C7]">
          <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
            <p className="font-semibold">Lihat Detail Laporan</p>
            <LucideCircleArrowRight />
          </button>
        </div>
      </div>

      {/* Stok Habis */}
      <div className="w-full max-w-md mx-auto border-3 border-[#D9635C] rounded-md overflow-hidden shadow-sm bg-[#FBEFEE] mb-10">
        {/* Konten laporan */}
        <div className="p-4 text-center">
          <div className="flex justify-center">
            <LucideTriangleAlert className="text-[#D9635C] w-14 h-14" />
          </div>

          <h3 className="text-3xl font-semibold text-gray-800 mt-2">02</h3>
          <p className="text-gray-600 mt-2 font-semibold">Obat Habis</p>
        </div>

        {/* Tombol "Lihat Detail Laporan" */}
        <div className="bg-[#D9635C] hover:bg-[#C17E7B]">
          <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
            <p className="font-semibold">Lihat Detail Laporan</p>
            <LucideCircleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

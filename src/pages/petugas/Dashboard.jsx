import React, { useState } from "react";
import Parmasi from "../../assets/Parmasi.jpg";
import {
  LucideBriefcaseMedical,
  LucideCircleArrowRight,
  LucideHospital,
  LucideShieldPlus,
  LucideTriangleAlert,
} from "lucide-react";
import SummaryCard from "../../components/petugas/SummaryCard";
import Footer from "../../components/Footer";
import InventoryModal from "../../components/petugas/InventoryModal"; // Pastikan path sesuai

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div>
        {/* Banner gambar background di atas */}
        <div
          className="h-130 bg-cover relative"
          style={{
            backgroundImage: `url(${Parmasi})`,
          }}
        >
          {/* Overlay untuk menurunkan kecerahan gambar */}
          <div className="absolute inset-0 bg-black opacity-35 z-0"></div>

          {/* Konten teks yang berada di atas background */}
          <div className="relative z-10 flex flex-col h-full px-12 pt-12 text-black font-sans">
            <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Dashboard
            </h1>
            <h2 className="text-3xl mt-1 text-white font-medium tracking-wide drop-shadow-sm">
              Data stok obat dan E-Resep
            </h2>
          </div>
        </div>

        {/* Kontainer Card setelah banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mt-[-300px] z-20 relative">
          {/* Status Inventaris */}
          <div className="border-3 border-[#32A67A] rounded-md overflow-hidden shadow-sm bg-[#EAF6F1]">
            <div className="p-4 text-center">
              <div className="flex justify-center">
                <LucideShieldPlus className="text-[#32A67A] w-14 h-14" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mt-2">
                Good
              </h3>
              <p className="text-gray-600 mt-2 font-semibold">
                Status Inventaris
              </p>
            </div>
            <div className="bg-[#32A67A] hover:bg-[#408d6f]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 py-2 text-white flex items-center justify-center gap-2"
              >
                <p className="font-semibold">Lihat Detail Laporan</p>
                <LucideCircleArrowRight />
              </button>
            </div>
          </div>

          {/* E-Resep Masuk */}
          <div className="border-3 border-[#E3C731] rounded-md overflow-hidden shadow-sm bg-[#FCF9EA]">
            <div className="p-4 text-center">
              <div className="flex justify-center">
                <LucideBriefcaseMedical className="text-[#E3C731] w-14 h-14" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mt-2">129</h3>
              <p className="text-gray-600 mt-2 font-semibold">E-Resep Masuk</p>
            </div>
            <div className="bg-[#E3C731] hover:bg-[#C6B662]">
              <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
                <p className="font-semibold">Lihat Detail Laporan</p>
                <LucideCircleArrowRight />
              </button>
            </div>
          </div>

          {/* Stok Obat Tersedia */}
          <div className="border-3 border-[#33A7DC] rounded-md overflow-hidden shadow-sm bg-[#EAF6FB]">
            <div className="p-4 text-center">
              <div className="flex justify-center">
                <LucideHospital className="text-[#33A7DC] w-14 h-14" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mt-2">490</h3>
              <p className="text-gray-600 mt-2 font-semibold">
                Stok Obat Tersedia
              </p>
            </div>
            <div className="bg-[#33A7DC] hover:bg-[#5BA5C7]">
              <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
                <p className="font-semibold">Lihat Detail Persediaan</p>
                <LucideCircleArrowRight />
              </button>
            </div>
          </div>

          {/* Obat Habis */}
          <div className="border-3 border-[#D9635C] rounded-md overflow-hidden shadow-sm bg-[#FBEFEE]">
            <div className="p-4 text-center">
              <div className="flex justify-center">
                <LucideTriangleAlert className="text-[#D9635C] w-14 h-14" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mt-2">02</h3>
              <p className="text-gray-600 mt-2 font-semibold">Obat Habis</p>
            </div>
            <div className="bg-[#D9635C] hover:bg-[#C17E7B]">
              <button className="w-full px-4 py-2 text-white flex items-center justify-center gap-2">
                <p className="font-semibold">Stok Sekarang</p>
                <LucideCircleArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-wrap justify-center gap-4 px-8 mt-30">
        <SummaryCard
          title="Stock"
          linkText="Lihat Stok"
          linkAction={() => console.log("Masuk ke Pengaturan")}
          items={[
            { value: "490", label: "Jumlah Obat" },
            { value: "02", label: "Obat Habis" },
          ]}
        />
        <SummaryCard
          title="Ringkasan e-Eresep"
          linkText="Lihat Ringkasan"
          linkAction={() => console.log("Masuk ke Pengaturan")}
          items={[
            { value: "46", label: "e-Eresep Baru" },
            { value: "700", label: "Jumlah e-Eresep" },
          ]}
        />
        <SummaryCard
          title="Ringkasan Pembayaran"
          linkText="Lihat Ringkasan"
          linkAction={() => console.log("Masuk ke Pengaturan")}
          items={[
            { value: "07", label: "Pembayaran Tertunda" },
            { value: "120", label: "Pembayaran Selesai" },
          ]}
        />
        <SummaryCard
          title="Pelanggan"
          linkText="Buka Halaman"
          linkAction={() => console.log("Masuk ke Pengaturan")}
          items={[
            { value: "831", label: "Total Pelanggan" },
            { value: "Paracetamol", label: "Obat yang sering dibeli" },
          ]}
        />
      </div>

      {/* Modal Inventory */}
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

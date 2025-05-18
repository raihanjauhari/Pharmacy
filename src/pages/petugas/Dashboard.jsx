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
import SummaryCard2 from "../../components/petugas/SummaryCard2";
import SummaryCard3 from "../../components/petugas/SummaryCard3";
import SummaryCard4 from "../../components/petugas/SummaryCard4";
import Footer from "../../components/Footer";
import InventoryModal from "../../components/petugas/InventoryModal";
import EresepModal from "../../components/petugas/EResepModal";
import StokObatModal from "../../components/petugas/StokObatModal";
import OutOfStockModal from "../../components/OutOfStockModal";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEresepModalOpen, setIsEresepModalOpen] = useState(false);
  const [isStokObatModalOpen, setIsStokObatModalOpen] = useState(false);
  const [isOutOfStockModal, setIsOutOfStockModal] = useState(false);

  const navigate = useNavigate();

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
          <div className="relative z-10 flex flex-col h-full px-8 pt-12 text-black font-sans">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Dashboard
            </h1>
            <h2 className="text-base xs:text-xl sm:text-xl md:text-xl lg:text-3xl mt-1 text-white font-medium tracking-wide drop-shadow-sm">
              Data stok obat dan E-Resep
            </h2>
          </div>
        </div>

        {/* Kontainer Card setelah banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mt-[-320px] sm:mt-[-320px] md:mt-[-320px] lg:mt-[-320px] z-20 relative">
          {[
            {
              title: "Good",
              desc: "Status Inventaris",
              icon: LucideShieldPlus,
              border: "#32A67A",
              bg: "#EAF6F1",
              hover: "#408d6f",
              onClick: () => setIsModalOpen(true),
            },
            {
              title: "129",
              desc: "E-Resep Masuk",
              icon: LucideBriefcaseMedical,
              border: "#E3C731",
              bg: "#FCF9EA",
              hover: "#C6B662",
              onClick: () => setIsEresepModalOpen(true),
            },
            {
              title: "490",
              desc: "Stok Obat Tersedia",
              icon: LucideHospital,
              border: "#33A7DC",
              bg: "#EAF6FB",
              hover: "#5BA5C7",
              onClick: () => setIsStokObatModalOpen(true),
            },
            {
              title: "02",
              desc: "Obat Habis",
              icon: LucideTriangleAlert,
              border: "#D9635C",
              bg: "#FBEFEE",
              hover: "#C17E7B",
              onClick: () => setIsOutOfStockModal(true),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border-4 rounded-md overflow-hidden shadow-sm flex flex-col justify-between"
              style={{ borderColor: item.border, backgroundColor: item.bg }}
            >
              {/* Konten atas */}
              <div className="p-4 sm:p-5 text-center flex flex-col items-center space-y-2">
                <item.icon
                  style={{
                    color: item.border,
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                  className="sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Tombol bawah */}
              <div
                className="transition-colors"
                style={{ backgroundColor: item.border }}
                onClick={item.onClick}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = item.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = item.border)
                }
              >
                <button
                  className="
      w-full 
      px-3 
      py-2 sm:py-2.5 md:py-3 lg:py-4 
      text-white 
      flex items-center justify-center 
      gap-1 sm:gap-2 
      whitespace-nowrap 
      font-semibold 
      text-xs sm:text-sm md:text-base lg:text-lg
      min-h-[36px] sm:min-h-[42px] md:min-h-[48px] lg:min-h-[52px]
    "
                >
                  {item.title === "02"
                    ? "Stok Sekarang"
                    : "Lihat Detail Laporan"}
                  <LucideCircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-8 mt-15 md:mt-15 lg:mt-38">
        <SummaryCard
          title="Stock"
          linkText="Lihat Stok"
          linkAction={() => navigate("/dashboard-petugas/obat")}
          items={[
            { value: "490", label: "Jumlah Obat" },
            { value: "02", label: "Obat Habis" },
          ]}
        />
        <SummaryCard2
          title="e-Eresep"
          linkText="Lihat e-Resep"
          linkAction={() => navigate("/dashboard-petugas/e-resep")}
          items={[
            { value: "46", label: "e-Eresep Baru" },
            { value: "700", label: "Jumlah e-Eresep" },
          ]}
        />
        <SummaryCard3
          title="Pembayaran"
          items={[
            { value: "07", label: "Pembayaran Tertunda" },
            { value: "120", label: "Pembayaran Selesai" },
          ]}
        />
        <SummaryCard4
          title="Pelanggan"
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

      {/* EResep Modal */}
      <EresepModal
        isOpen={isEresepModalOpen}
        onClose={() => setIsEresepModalOpen(false)}
      />

      {/* Stok Obat Modal */}
      <StokObatModal
        isOpen={isStokObatModalOpen}
        onClose={() => setIsStokObatModalOpen(false)}
      />

      {/* Out Of Stok Modal */}
      <OutOfStockModal
        isOpen={isOutOfStockModal}
        onClose={() => setIsOutOfStockModal(false)}
      />

      {/* Scroll to Top Bottom */}
      <div className="rounded-full">
        <ScrollToTopButton />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

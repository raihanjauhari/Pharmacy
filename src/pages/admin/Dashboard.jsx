import { useEffect, useState } from "react";
import axios from "axios";
import Parmasi from "../../assets/Parmasi.jpg";
import {
  LucideBriefcaseMedical,
  LucideCircleArrowRight,
  LucideHospital,
  LucideShieldPlus,
  LucideTriangleAlert,
} from "lucide-react";
import Footer from "../../components/admin/Footer";
import InventoryModal from "../../components/admin/InventoryModal";
import EresepModal from "../../components/admin/EresepModal";
import StokObatModal from "../../components/admin/StokObatModal";
import OutOfStockModal from "../../components/OutOfStockModal";
import ApotikChartCard from "../../components/admin/ApotikChartCard";
import LaporanPenyakit from "../../components/admin/LaporanPenyakit";
import ScrollToTopButton from "../../components/admin/ScrollToTopBotton";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEresepModalOpen, setIsEresepModalOpen] = useState(false);
  const [isStokObatModalOpen, setIsStokObatModalOpen] = useState(false);
  const [isOutOfStockModal, setIsOutOfStockModal] = useState(false);

  const [, setObatList] = useState([]);
  const [statusObat, setStatusObat] = useState({
    aman: { label: "Aman", count: 0 },
    hampirHabis: { label: "Hampir Habis", count: 0 },
    habis: { label: "Habis", count: 0 },
  });

  const [setObatAman] = useState([]);
  const [setObatHampirHabis] = useState([]);
  const [setObatHabis] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/obat")
      .then((res) => {
        const data = res.data;
        setObatList(data);

        let aman = [];
        let hampirHabis = [];
        let habis = [];

        data.forEach((obat) => {
          if (obat.stok >= 10) aman.push(obat);
          else if (obat.stok > 0 && obat.stok < 10) hampirHabis.push(obat);
          else if (obat.stok === 0) habis.push(obat);
        });

        setStatusObat({
          aman: { label: "Aman", count: aman.length },
          hampirHabis: { label: "Hampir Habis", count: hampirHabis.length },
          habis: { label: "Habis", count: habis.length },
        });

        setObatAman(aman);
        setObatHampirHabis(hampirHabis);
        setObatHabis(habis);
      })
      .catch((err) => console.error("Gagal fetch obat:", err));
  }, []);

  return (
    <div>
      <div
        className="h-130 bg-cover relative"
        style={{ backgroundImage: `url(${Parmasi})` }}
      >
        <div className="absolute inset-0 bg-black opacity-35 z-0"></div>
        <div className="relative z-10 flex flex-col h-full px-8 pt-12 text-black font-sans">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Dashboard
          </h1>
          <h2 className="text-base xs:text-xl sm:text-xl md:text-xl lg:text-3xl mt-1 text-white font-medium tracking-wide drop-shadow-sm">
            Data stok obat dan E-Resep
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mt-[-320px] z-20 relative">
        {[
          {
            title: statusObat.aman.count,
            desc: "Status Inventaris Aman",
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
            title: statusObat.hampirHabis.count,
            desc: "Obat Hampir Habis",
            icon: LucideHospital,
            border: "#33A7DC",
            bg: "#EAF6FB",
            hover: "#5BA5C7",
            onClick: () => setIsStokObatModalOpen(true),
          },
          {
            title: statusObat.habis.count,
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
              <button className="w-full px-3 py-2 sm:py-2.5 md:py-3 lg:py-4 text-white flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap font-semibold text-xs sm:text-sm md:text-base lg:text-lg min-h-[36px] sm:min-h-[42px] md:min-h-[48px] lg:min-h-[52px]">
                {item.title === statusObat.habis.count
                  ? "Stok Sekarang"
                  : "Lihat Laporan"}
                <LucideCircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              </button>
            </div>
          </div>
        ))}
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

      <div className="mt-10 sm:mt-12 md:mt-12 lg:mt-38 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApotikChartCard />
          <LaporanPenyakit />
        </div>
      </div>

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

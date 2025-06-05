import axios from "axios";
import { useEffect, useState } from "react";
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

  const [obatList, setObatList] = useState([]);
  const [statusObat, setStatusObat] = useState({
    aman: { label: "Aman", count: 0 },
    hampirHabis: { label: "Hampir Habis", count: 0 },
    habis: { label: "Habis", count: 0 },
  });

  // State baru untuk data API
  const [, setEresepData] = useState([]);
  const [, setDetailEresepData] = useState([]);
  const [, setMemunculkanData] = useState([]);
  const [, setPasienData] = useState([]);

  // State untuk data yang akan ditampilkan di SummaryCard
  const [totalEresep, setTotalEresep] = useState(0);
  const [eresepMenungguPembayaran, setEresepMenungguPembayaran] = useState(0);
  const [pembayaranSelesai, setPembayaranSelesai] = useState(0);
  const [totalPelanggan, setTotalPelanggan] = useState(0);
  const [obatSeringDibeli, setObatSeringDibeli] = useState("N/A"); // Default atau loading state

  const navigate = useNavigate();

  // Fetch data obat
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
      })
      .catch((err) => console.error("Gagal fetch obat:", err));
  }, []);

  // Fetch data e-resep, detail e-resep, memunculkan, dan pasien
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          eresepRes,
          detailEresepRes,
          memunculkanRes,
          pasienRes,
          obatRes, // Ambil juga data obat lagi untuk 'obat yang sering dibeli'
        ] = await Promise.all([
          axios.get("http://127.0.0.1:3000/api/eresep"),
          axios.get("http://127.0.0.1:3000/api/detail_eresep"),
          axios.get("http://127.0.0.1:3000/api/memunculkan"),
          axios.get("http://127.0.0.1:3000/api/pasien"),
          axios.get("http://127.0.0.1:3000/api/obat"),
        ]);

        const eresep = eresepRes.data;
        const detailEresep = detailEresepRes.data;
        const memunculkan = memunculkanRes.data;
        const pasien = pasienRes.data;
        const allObat = obatRes.data;

        setEresepData(eresep);
        setDetailEresepData(detailEresep);
        setMemunculkanData(memunculkan);
        setPasienData(pasien);

        // --- Data untuk SummaryCard2 (e-Eresep) ---
        const totalEresepCount = eresep.length;
        // Asumsi "e-Resep Baru" adalah yang statusnya "Menunggu Pembayaran"
        const eresepBaruCount = eresep.filter(
          (item) => item.status === "Menunggu Pembayaran"
        ).length;
        setTotalEresep(totalEresepCount);
        setEresepMenungguPembayaran(eresepBaruCount);

        // --- Data untuk SummaryCard3 (Pembayaran) ---
        // Asumsi "Pembayaran Selesai" = e-Resep dengan status "Selesai"
        const pembayaranSelesaiCount = eresep.filter(
          (item) => item.status === "Selesai"
        ).length;
        setPembayaranSelesai(pembayaranSelesaiCount);

        // --- Data untuk SummaryCard4 (Pelanggan) ---
        const totalPelangganCount = pasien.length;
        setTotalPelanggan(totalPelangganCount);

        // --- Obat yang sering dibeli ---
        const obatKuantitasMap = {};
        memunculkan.forEach((item) => {
          if (obatKuantitasMap[item.kode_obat]) {
            obatKuantitasMap[item.kode_obat] += item.kuantitas;
          } else {
            obatKuantitasMap[item.kode_obat] = item.kuantitas;
          }
        });

        let mostFrequentObat = "N/A";
        let maxKuantitas = 0;

        for (const kodeObat in obatKuantitasMap) {
          if (obatKuantitasMap[kodeObat] > maxKuantitas) {
            maxKuantitas = obatKuantitasMap[kodeObat];
            // Cari nama obat berdasarkan kode_obat dari allObat
            const foundObat = allObat.find(
              (obat) => obat.kode_obat === kodeObat
            );
            mostFrequentObat = foundObat ? foundObat.nama_obat : "N/A";
          }
        }
        setObatSeringDibeli(mostFrequentObat);
      } catch (error) {
        console.error("Gagal fetch data API:", error);
      }
    };

    fetchData();
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen mount

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
            title: eresepMenungguPembayaran, // Menggunakan data dinamis
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-8 mt-15 md:mt-15 lg:mt-38">
        <SummaryCard
          title="Stock"
          linkText="Lihat Stok"
          linkAction={() => navigate("/dashboard-petugas/obat")}
          items={[
            { value: obatList.length, label: "Jumlah Obat" },
            { value: statusObat.habis.count, label: "Obat Habis" },
          ]}
        />
        <SummaryCard2
          title="e-Eresep"
          linkText="Lihat e-Resep"
          linkAction={() => navigate("/dashboard-petugas/e-resep")}
          items={[
            { value: eresepMenungguPembayaran, label: "e-Eresep Baru" }, // Data dinamis
            { value: totalEresep, label: "Jumlah e-Eresep" }, // Data dinamis
          ]}
        />
        <SummaryCard3
          title="Pembayaran"
          items={[
            { value: eresepMenungguPembayaran, label: "Pembayaran Tertunda" }, // Data dinamis
            { value: pembayaranSelesai, label: "Pembayaran Selesai" }, // Data dinamis
          ]}
        />
        <SummaryCard4
          title="Pelanggan"
          items={[
            { value: totalPelanggan, label: "Total Pelanggan" }, // Data dinamis
            { value: obatSeringDibeli, label: "Obat yang sering dibeli" }, // Data dinamis
          ]}
        />
      </div>
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EresepModal
        isOpen={isEresepModalOpen}
        onClose={() => setIsEresepModalOpen(false)}
      />
      <StokObatModal
        isOpen={isStokObatModalOpen}
        onClose={() => setIsStokObatModalOpen(false)}
      />
      <OutOfStockModal
        isOpen={isOutOfStockModal}
        onClose={() => setIsOutOfStockModal(false)}
      />
      <ScrollToTopButton />
      <Footer /> {/* Pastikan komponen Footer sudah diupdate */}
    </div>
  );
};

export default Dashboard;

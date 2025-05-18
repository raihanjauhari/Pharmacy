import React, { useState } from "react";
import Footer from "../../components/Footer";
import {
  LucideSearch,
  Info,
  Lightbulb,
  FileText,
  Smile,
  Quote,
  ArrowRightCircle,
} from "lucide-react";
import PetunjukEResep from "../../assets/PDF/petunjuk.pdf";
import EResepModal from "../../components/petugas/ResepModal";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const EResep = () => {
  const [data, setData] = useState([
    {
      id: "PD001",
      status: "Diproses",
      resep: {
        namaPasien: "Anisa Aulya",
        umur: "28 tahun",
        poli: "Poli Umum",
        beratBadan: "55 kg",
        Diagnosa: "Demam dan sakit kepala",
        hargaObat: "15.000",
        namaDokter: "dr. Lestari Wardhani",
        idResep: "RSP001",
        namaObat: "Paracetamol",
        jumlahObat: "10",
        aturanPakai: "3x1 sehari",
        keterangan: "Setelah makan",
        tanggalResep: "2025-05-17",
      },
    },
    {
      id: "PD002",
      status: "Menunggu Pembayaran",
      resep: {
        namaPasien: "Setya Adjie",
        umur: "35 tahun",
        poli: "Poli Umum",
        beratBadan: "65 kg",
        Diagnosa: "Infeksi saluran pernapasan atas",
        hargaObat: "25.000",
        namaDokter: "dr. Dewa Mahendra",
        idResep: "RSP002",
        namaObat: "Amoxicillin",
        jumlahObat: "20",
        aturanPakai: "3x1 sehari",
        keterangan: "Sebelum makan",
        tanggalResep: "2025-05-16",
      },
    },
    {
      id: "PD003",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Putri Rahma",
        umur: "40 tahun",
        poli: "Poli Saraf",
        beratBadan: "60 kg",
        Diagnosa: "Nyeri otot",
        hargaObat: "18.000",
        namaDokter: "dr. Ari Wibowo",
        idResep: "RSP004",
        namaObat: "Ibuprofen",
        jumlahObat: "15",
        aturanPakai: "2x1 sehari",
        keterangan: "Sesudah makan",
        tanggalResep: "2025-05-16",
      },
    },
    {
      id: "PD005",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Neneknya DON",
        umur: "65 tahun",
        poli: "Poli Kulit",
        beratBadan: "50 kg",
        Diagnosa: "Alergi kulit",
        hargaObat: "12.000",
        namaDokter: "dr. Meri",
        idResep: "RSP003",
        namaObat: "Cetirizine",
        jumlahObat: "5",
        aturanPakai: "1x1 malam",
        keterangan: "Jika gatal muncul",
        tanggalResep: "2025-05-15",
      },
    },
    {
      id: "PD006",
      status: "Diproses",
      resep: {
        namaPasien: "Wahyu Kurniawan",
        umur: "38 tahun",
        poli: "Poli Penyakit Dalam",
        beratBadan: "75 kg",
        Diagnosa: "Asam lambung",
        hargaObat: "14.000",
        namaDokter: "dr. Bambang Sutrisno",
        idResep: "RSP006",
        namaObat: "Antasida",
        jumlahObat: "12",
        aturanPakai: "2x1 sebelum makan",
        keterangan: "Untuk asam lambung",
        tanggalResep: "2025-05-14",
      },
    },
    {
      id: "PD007",
      status: "Menunggu Pembayaran",
      resep: {
        namaPasien: "Lia Apriyani",
        umur: "45 tahun",
        poli: "Poli Dalam",
        beratBadan: "68 kg",
        Diagnosa: "Diabetes Tipe 2",
        hargaObat: "30.000",
        namaDokter: "dr. Sari Fitriani",
        idResep: "RSP007",
        namaObat: "Metformin",
        jumlahObat: "30",
        aturanPakai: "2x1 sehari",
        keterangan: "Kontrol gula darah",
        tanggalResep: "2025-05-13",
      },
    },
    {
      id: "PD008",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Deni Yulianto",
        umur: "29 tahun",
        poli: "Poli Paru",
        beratBadan: "62 kg",
        Diagnosa: "Asma ringan",
        hargaObat: "20.000",
        namaDokter: "dr. Rani Maulida",
        idResep: "RSP008",
        namaObat: "Salbutamol",
        jumlahObat: "10",
        aturanPakai: "2x1 saat sesak",
        keterangan: "Untuk asma",
        tanggalResep: "2025-05-12",
      },
    },
    {
      id: "PD009",
      status: "Diproses",
      resep: {
        namaPasien: "Rina Lestari",
        umur: "50 tahun",
        poli: "Poli Jantung",
        beratBadan: "58 kg",
        Diagnosa: "Tekanan darah tinggi",
        hargaObat: "22.000",
        namaDokter: "dr. Indra Wijaya",
        idResep: "RSP009",
        namaObat: "Captopril",
        jumlahObat: "14",
        aturanPakai: "1x2 pagi dan malam",
        keterangan: "Cek tekanan darah rutin",
        tanggalResep: "2025-05-11",
      },
    },
    {
      id: "PD010",
      status: "Selesai",
      resep: {
        namaPasien: "Budi Santoso",
        umur: "34 tahun",
        poli: "Poli Mata",
        beratBadan: "70 kg",
        Diagnosa: "Iritasi mata",
        hargaObat: "10.000",
        namaDokter: "dr. Sulastri",
        idResep: "RSP010",
        namaObat: "Tetes Mata",
        jumlahObat: "1",
        aturanPakai: "3x sehari",
        keterangan: "Tidak untuk lensa kontak",
        tanggalResep: "2025-05-10",
      },
    },

    {
      id: "PD011",
      status: "Menunggu Pembayaran",
      resep: {
        namaPasien: "Andi Kurniawan",
        umur: "23 tahun",
        poli: "Poli Gigi",
        beratBadan: "65 kg",
        Diagnosa: "Sakit gigi berlubang",
        hargaObat: "18.000",
        namaDokter: "drg. Rika Sasmita",
        idResep: "RSP011",
        namaObat: "Asam Mefenamat",
        jumlahObat: "10",
        aturanPakai: "3x1 sesudah makan",
        keterangan: "Jika nyeri muncul",
        tanggalResep: "2025-05-10",
      },
    },
    {
      id: "PD012",
      status: "Diproses",
      resep: {
        namaPasien: "Sinta Dewi",
        umur: "31 tahun",
        poli: "Poli Umum",
        beratBadan: "59 kg",
        Diagnosa: "Radang tenggorokan",
        hargaObat: "12.000",
        namaDokter: "dr. Hendra Wijaya",
        idResep: "RSP012",
        namaObat: "Lozenges",
        jumlahObat: "16",
        aturanPakai: "Dihisap setiap 4 jam",
        keterangan: "Tidak ditelan",
        tanggalResep: "2025-05-09",
      },
    },
    {
      id: "PD013",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Dewi Sartika",
        umur: "29 tahun",
        poli: "Poli Kulit",
        beratBadan: "52 kg",
        Diagnosa: "Jerawat parah",
        hargaObat: "17.000",
        namaDokter: "dr. Maria Lestari",
        idResep: "RSP013",
        namaObat: "Benzoyl Peroxide",
        jumlahObat: "1",
        aturanPakai: "2x1 oles pagi dan malam",
        keterangan: "Hindari sinar matahari langsung",
        tanggalResep: "2025-05-09",
      },
    },
    {
      id: "PD014",
      status: "Menunggu Pembayaran",
      resep: {
        namaPasien: "Rahmat Hidayat",
        umur: "42 tahun",
        poli: "Poli Dalam",
        beratBadan: "80 kg",
        Diagnosa: "Kolesterol tinggi",
        hargaObat: "21.000",
        namaDokter: "dr. Fajar Ahmad",
        idResep: "RSP014",
        namaObat: "Simvastatin",
        jumlahObat: "20",
        aturanPakai: "1x1 malam",
        keterangan: "Sebelum tidur",
        tanggalResep: "2025-05-08",
      },
    },
    {
      id: "PD015",
      status: "Selesai",
      resep: {
        namaPasien: "Nur Aisyah",
        umur: "36 tahun",
        poli: "Poli THT",
        beratBadan: "56 kg",
        Diagnosa: "Infeksi telinga",
        hargaObat: "19.000",
        namaDokter: "dr. Hanif",
        idResep: "RSP015",
        namaObat: "Tetes Telinga",
        jumlahObat: "1",
        aturanPakai: "3x sehari",
        keterangan: "Jangan dimasukkan kapas",
        tanggalResep: "2025-05-08",
      },
    },
    {
      id: "PD016",
      status: "Diproses",
      resep: {
        namaPasien: "Mira Setiani",
        umur: "27 tahun",
        poli: "Poli Kandungan",
        beratBadan: "60 kg",
        Diagnosa: "Infeksi saluran kemih",
        hargaObat: "24.000",
        namaDokter: "dr. Liana Wijayanti",
        idResep: "RSP016",
        namaObat: "Ciprofloxacin",
        jumlahObat: "10",
        aturanPakai: "2x1 selama 5 hari",
        keterangan: "Minum banyak air",
        tanggalResep: "2025-05-07",
      },
    },
    {
      id: "PD017",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Agus Permana",
        umur: "33 tahun",
        poli: "Poli Paru",
        beratBadan: "66 kg",
        Diagnosa: "Batuk berdahak",
        hargaObat: "13.000",
        namaDokter: "dr. Dimas Arifin",
        idResep: "RSP017",
        namaObat: "Ambroxol",
        jumlahObat: "10",
        aturanPakai: "3x1 setelah makan",
        keterangan: "Minum air hangat",
        tanggalResep: "2025-05-07",
      },
    },
    {
      id: "PD018",
      status: "Menunggu Pembayaran",
      resep: {
        namaPasien: "Lukman Hakim",
        umur: "50 tahun",
        poli: "Poli Jantung",
        beratBadan: "75 kg",
        Diagnosa: "Angina",
        hargaObat: "26.000",
        namaDokter: "dr. R. Yani",
        idResep: "RSP018",
        namaObat: "Nitroglycerin",
        jumlahObat: "5",
        aturanPakai: "Saat nyeri dada",
        keterangan: "Letakkan di bawah lidah",
        tanggalResep: "2025-05-06",
      },
    },
    {
      id: "PD019",
      status: "Sudah Bayar",
      resep: {
        namaPasien: "Tiara Maharani",
        umur: "21 tahun",
        poli: "Poli Umum",
        beratBadan: "49 kg",
        Diagnosa: "Sakit perut ringan",
        hargaObat: "8.000",
        namaDokter: "dr. Ahmad Riyadi",
        idResep: "RSP019",
        namaObat: "Antasida cair",
        jumlahObat: "1",
        aturanPakai: "3x1 setelah makan",
        keterangan: "Kocok sebelum digunakan",
        tanggalResep: "2025-05-06",
      },
    },
    {
      id: "PD020",
      status: "Selesai",
      resep: {
        namaPasien: "Galih Permadi",
        umur: "43 tahun",
        poli: "Poli Saraf",
        beratBadan: "70 kg",
        Diagnosa: "Migrain",
        hargaObat: "20.000",
        namaDokter: "dr. Vita Anggraeni",
        idResep: "RSP020",
        namaObat: "Sumatriptan",
        jumlahObat: "5",
        aturanPakai: "Saat migrain muncul",
        keterangan: "Jangan lebih dari 2x sehari",
        tanggalResep: "2025-05-05",
      },
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");

  const statusOptions = [
    "Semua",
    "Antrian E-Resep",
    "Menunggu Panggilan",
    "Menunggu Pembayaran",
    "Selesai",
  ];

  const statusMap = {
    "Antrian E-Resep": "Diproses",
    "Menunggu Pembayaran": "Menunggu Pembayaran",
    "Menunggu Panggilan": "Sudah Bayar",
    Selesai: "Selesai",
    Semua: "Semua",
  };

  const statusPriority = {
    "Sudah Bayar": 1,
    Diproses: 2,
    "Menunggu Pembayaran": 3,
    Selesai: 4,
  };

  const selesaikanAntrian = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "Selesai" } : item
      )
    );
  };

  const filteredAndSortedData = data
    .filter((item) => {
      if (statusFilter !== "Semua" && item.status !== statusMap[statusFilter])
        return false;

      if (searchText.trim() === "") return true;

      const lowerSearch = searchText.toLowerCase();
      return (
        item.id.toLowerCase().includes(lowerSearch) ||
        item.resep.namaPasien.toLowerCase().includes(lowerSearch) ||
        item.resep.namaDokter.toLowerCase().includes(lowerSearch)
      );
    })
    .sort((a, b) => {
      const aPriority = statusPriority[a.status] || 999;
      const bPriority = statusPriority[b.status] || 999;

      if (aPriority !== bPriority) return aPriority - bPriority;

      if (sortBy === "nama")
        return a.resep.namaPasien.localeCompare(b.resep.namaPasien);
      if (sortBy === "dokter")
        return a.resep.namaDokter.localeCompare(b.resep.namaDokter);

      if (sortBy === "id") return a.id.localeCompare(b.id);

      return 0;
    });

  const antreanMap = {};
  let antreanCounter = 0;
  filteredAndSortedData.forEach((item) => {
    if (item.status === "Diproses") {
      antreanCounter++;
      antreanMap[item.id] = antreanCounter;
    }
  });

  const panggilPasien = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "Diproses" } : item
      )
    );
  };

  const [selectedResep, setSelectedResep] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (resep) => {
    setSelectedResep(resep);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResep(null);
  };

  const [showAll, setShowAll] = useState(false);

  // Batasi data hanya 12 jika showAll = false
  const displayedData = showAll
    ? filteredAndSortedData
    : filteredAndSortedData.slice(0, 12);

  return (
    <div>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">E-Resep</h1>
          <p className="text-slate-600 mt-3">Menampilkan E-resep</p>
        </div>
        <div className="flex flex-wrap gap-2 px-4 justify-center sm:justify-start">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
        rounded
        transition
        w-full 
        px-3 py-2 text-sm  /* xs default */
        sm:w-auto sm:px-4 sm:py-2 sm:text-base  /* sm dan seterusnya */
        md:px-5 md:py-3 md:text-lg 
        ${
          statusFilter === status
            ? "bg-[#2A4D69] text-white"
            : "bg-[#557187] text-white hover:bg-[#2A4D69]"
        }
      `}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4">
          <select
            className="
      border border-slate-400 
      rounded 
      px-3 py-2 
      text-xs xs:text-sm sm:text-base md:text-lg 
      outline-none 
      transition
    "
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="nama">Nama Pasien (A-Z)</option>
            <option value="dokter">Nama Dokter (A-Z)</option>
            <option value="id">ID Pendaftaran (A-Z)</option>
          </select>
        </div>

        <div className="relative mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4 pr-0 xs:pr-12 sm:pr-12 md:pr-12 lg:pr-12 xl:pr-12">
          <input
            type="text"
            placeholder="Ketik ID Pendaftaran, Pasien, Dokter"
            className="
      w-full 
      bg-[#E3EBF3] 
      border-2 border-slate-300 focus:border-[#8bacc5] 
      rounded 
      pl-4 pr-12
      py-2 text-xs xs:text-sm sm:text-base md:text-lg
      outline-none
      transition
      placeholder:text-gray-400 placeholder:text-xs xs:placeholder:text-xs sm:placeholder:text-base md:placeholder:text-lg
    "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="
      absolute right-0 top-0 h-full 
      text-white 
      bg-[#87B6E5] 
      px-4 xs:px-5 sm:px-6 
      rounded-r 
      hover:bg-[#64b1ff] 
      transition 
      flex items-center justify-center
    "
            onClick={() => setSearchText("")}
            aria-label="Clear search"
          >
            <LucideSearch size={20} className="xs:size-5 sm:size-6 md:size-7" />
          </button>
        </div>

        <div className="w-full overflow-x-auto px-4 xs:pr-8 sm:pr-4 md:pr-4 lg:pr-4 xl:pr-4">
          <table className="min-w-full border-2 border-slate-400 text-[10px] sm:text-[11px] md:text-sm lg:text-base">
            <thead className="bg-[#557187] text-white text-[8px] sm:text-[9px] md:text-xs lg:text-sm">
              <tr>
                {[
                  "No",
                  "ID Pendaftaran",
                  "Nama Pasien",
                  "Nama Dokter",
                  "Status",
                  "Detail e-resep",
                ].map((text, i) => (
                  <th
                    key={i}
                    className="border-2 border-slate-400 text-center px-1.5 py-[2px] sm:px-2 sm:py-[3px] md:px-3 md:py-[4px] lg:px-4 lg:py-[6px]"
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-slate-500 py-4 text-[10px] sm:text-[11px] md:text-sm lg:text-base"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                displayedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                  >
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {idx + 1}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {item.id}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {item.resep.namaPasien}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {item.resep.namaDokter}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-1 sm:px-2 md:px-3 lg:px-4 py-1">
                      <div className="flex flex-wrap justify-center items-center gap-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-sm">
                        {item.status === "Diproses" ? (
                          <>
                            <span className="bg-[#557187] text-white font-medium px-2 py-[1px] rounded-full">
                              Antrian Ke-{antreanMap[item.id]}
                            </span>
                            <button
                              onClick={() => selesaikanAntrian(item.id)}
                              className="bg-green-600 text-white px-2 py-[2px] rounded hover:bg-green-700"
                            >
                              Selesai
                            </button>
                          </>
                        ) : item.status === "Sudah Bayar" ? (
                          <button
                            onClick={() => panggilPasien(item.id)}
                            className="bg-blue-500 text-white px-2 py-[2px] rounded hover:bg-blue-600"
                          >
                            Panggil
                          </button>
                        ) : (
                          item.status
                        )}
                      </div>
                    </td>

                    <td className="border-2 border-slate-400 text-center px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => openModal(item.resep)}
                          className="
    bg-[#557187] text-white 
    text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-sm
    px-1.5 xs:px-2 py-[2px] xs:py-[3px]
    rounded hover:bg-[#2A4D69] whitespace-nowrap max-w-full
  "
                          style={{ minWidth: "50px" }} // lebih kecil dari 70px di xs
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredAndSortedData.length > 12 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#2A4D69] text-white px-4 py-2 rounded hover:bg-[#1e3a52] transition"
            >
              {showAll ? "Sembunyikan" : "Lihat Semua"}
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-[#F9FAFB] rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 text-slate-600 mt-0.5" />
            <p className="text-sm text-slate-700">
              Butuh bantuan lebih lanjut? Pastikan ID dan nama pasien sesuai
              sebelum memanggil.
            </p>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <Lightbulb className="w-4 h-4 text-slate-500 mt-0.5" />
            <span>
              Tip: Klik tombol <strong>"Panggil"</strong> hanya jika pasien
              sudah menyelesaikan pembayaran. Jangan sampai salah ya{" "}
              <Smile className="inline w-3 h-3 text-yellow-500 ml-1" />
            </span>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-600 italic flex justify-center items-center gap-2">
          <Quote className="w-4 h-4 text-blue-400" />
          <span>
            "Pelayanan terbaik dimulai dari perhatian terhadap detail sekecil
            apa pun."
          </span>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={() =>
              window.open(PetunjukEResep, "_blank", "noopener,noreferrer")
            }
            type="button"
            className="mt-0 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 hover:from-sky-100 hover:via-sky-200 hover:to-blue-100 border border-sky-200 shadow-sm hover:shadow-md transition-all duration-200 text-sm text-sky-700 font-semibold hover:text-sky-800"
          >
            <FileText className="w-5 h-5 text-sky-600" />
            <span>Lihat Petunjuk Penggunaan E-Resep</span>
            <ArrowRightCircle className="w-5 h-5 text-sky-600" />
          </button>
        </div>
      </div>

      {showModal && selectedResep && (
        <EResepModal resep={selectedResep} onClose={closeModal} />
      )}

      {/* Scroll to Top Bottom */}
      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default EResep;

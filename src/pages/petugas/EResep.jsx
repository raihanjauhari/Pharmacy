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
      id: "PD004",
      status: "Selesai",
      resep: {
        namaPasien: "Bagas Pratama",
        umur: "30 tahun",
        poli: "Poli Penyakit Dalam",
        beratBadan: "70 kg",
        Diagnosa: "Diare akut",
        hargaObat: "10.000",
        namaDokter: "dr. Nina Kartika",
        idResep: "RSP005",
        namaObat: "Loperamide",
        jumlahObat: "6",
        aturanPakai: "Saat diare",
        keterangan: "Dengan air putih",
        tanggalResep: "2025-05-15",
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
  ]);

  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");

  const statusOptions = [
    "Semua",
    "Antrian E-Resep",
    "Menunggu Panggilan",
    "Sudah Bayar",
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

  return (
    <div>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">E-Resep</h1>
          <p className="text-slate-600 mt-3">Menampilkan E-resep</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded w-full sm:w-auto transition ${
                statusFilter === status
                  ? "bg-[#2A4D69] text-white"
                  : "bg-[#557187] text-white hover:bg-[#2A4D69]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <select
            className="border border-slate-400 rounded px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="nama">Nama Pasien (A-Z)</option>
            <option value="dokter">Nama Dokter (A-Z)</option>
            <option value="id">ID Pendaftaran (A-Z)</option>
          </select>
        </div>
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Ketik ID Pendaftaran, Nama Pasien / Nama Dokter"
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4 pr-10 py-2 text-sm outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-500"
            onClick={() => setSearchText("")}
            aria-label="Clear search"
          >
            <div className="bg-[#87B6E5] text-white py-2 px-4 rounded-sm hover:bg-[#64b1ff]">
              <LucideSearch />
            </div>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full border-2 border-slate-400 text-sm">
            <thead className="bg-[#557187] text-white">
              <tr>
                <th className="border-2 border-slate-400 px-4 py-2">No</th>
                <th className="border-2 border-slate-400 px-4 py-2">
                  ID Pendaftaran
                </th>
                <th className="border-2 border-slate-400 px-4 py-2">
                  Nama Pasien
                </th>
                <th className="border-2 border-slate-400 px-4 py-2">Dokter</th>
                <th className="border-2 border-slate-400 px-4 py-2">Status</th>
                <th className="border-2 border-slate-400 px-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-4">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                  >
                    <td className="border-2 border-slate-400 px-4 py-2 text-center">
                      {idx + 1}
                    </td>
                    <td className="border-2 border-slate-400 px-4 py-2 text-center">
                      {item.id}
                    </td>
                    <td className="border-2 border-slate-400 px-4 py-2">
                      <td>{item.resep.namaPasien}</td>
                    </td>
                    <td className="border-2 border-slate-400 px-4 py-2">
                      {item.resep.namaDokter}
                    </td>
                    <td className="border-2 border-slate-400 px-4 py-2 text-center">
                      {item.status === "Diproses" ? (
                        <>
                          <span className="inline-block bg-[#557187] text-white text-md font-semibold px-3 py-1 rounded-full shadow-sm">
                            Antrian Ke-{antreanMap[item.id]}
                          </span>
                          <button
                            onClick={() => selesaikanAntrian(item.id)}
                            className="ml-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                          >
                            Selesaikan Antrian
                          </button>
                        </>
                      ) : item.status === "Sudah Bayar" ? (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => panggilPasien(item.id)}
                        >
                          Panggil
                        </button>
                      ) : (
                        item.status
                      )}
                    </td>
                    <td className="border-2 border-slate-400 px-4 py-2 text-center">
                      <button
                        className="bg-[#557187] text-white px-3 py-1 rounded hover:bg-[#2A4D69]"
                        onClick={() => openModal(item.resep)}
                      >
                        Lihat e-Resep
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

      <Footer />
    </div>
  );
};

export default EResep;

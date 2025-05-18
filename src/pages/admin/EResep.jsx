import React, { useState } from "react";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";
import ScrollToTopButton from "../../components/admin/ScrollToTopBotton";

const dataResep = [
  {
    id: "RSP001",
    pasien: "Anisa Aulya",
    dokter: "dr. Lestari Wardhani",
    obat: "Paracetamol",
    tanggal: "03-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP002",
    pasien: "Setya Adjie",
    dokter: "dr. Dewa Mahendra",
    obat: "Insto",
    tanggal: "03-05-2025",
    status: "Menunggu Pembayaran",
  },
  {
    id: "RSP003",
    pasien: "Hairul Azmi",
    dokter: "dr. Intan Prameswari",
    obat: "Amoxicillin",
    tanggal: "03-05-2025",
    status: "Sudah Bayar",
  },
  {
    id: "RSP004",
    pasien: "Adi Mangsgala",
    dokter: "dr. Rizal Hamzah",
    obat: "Cefadroxil",
    tanggal: "03-05-2025",
    status: "Sudah Bayar",
  },
  {
    id: "RSP005",
    pasien: "Lina Marlina",
    dokter: "dr. Andi Wijaya",
    obat: "Ibuprofen",
    tanggal: "04-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP006",
    pasien: "Budi Santoso",
    dokter: "dr. Siti Rahmawati",
    obat: "Antasida",
    tanggal: "04-05-2025",
    status: "Selesai",
  },
  {
    id: "RSP007",
    pasien: "Tari Wulandari",
    dokter: "dr. Bambang Sutrisno",
    obat: "Lansoprazole",
    tanggal: "05-05-2025",
    status: "Sudah Bayar",
  },
  {
    id: "RSP008",
    pasien: "Raka Hermawan",
    dokter: "dr. Fitriani Nasution",
    obat: "Cetirizine",
    tanggal: "05-05-2025",
    status: "Menunggu Pembayaran",
  },
  {
    id: "RSP009",
    pasien: "Sinta Dewi",
    dokter: "dr. Andika Pranata",
    obat: "Simvastatin",
    tanggal: "06-05-2025",
    status: "Selesai",
  },
  {
    id: "RSP010",
    pasien: "Doni Saputra",
    dokter: "dr. Vina Oktaviani",
    obat: "Omeprazole",
    tanggal: "06-05-2025",
    status: "Menunggu Pembayaran",
  },
  {
    id: "RSP011",
    pasien: "Nina Agustin",
    dokter: "dr. Hendra Kusuma",
    obat: "Dexamethasone",
    tanggal: "07-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP012",
    pasien: "Ari Kurniawan",
    dokter: "dr. Maya Anindita",
    obat: "Ranitidine",
    tanggal: "07-05-2025",
    status: "Sudah Bayar",
  },
  {
    id: "RSP013",
    pasien: "Yuli Rahmawati",
    dokter: "dr. Fajar Nugroho",
    obat: "Amlodipine",
    tanggal: "08-05-2025",
    status: "Selesai",
  },
  {
    id: "RSP014",
    pasien: "Eka Saputra",
    dokter: "dr. Suci Ramadhani",
    obat: "Metformin",
    tanggal: "08-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP015",
    pasien: "Taufik Hidayat",
    dokter: "dr. Rina Wijayanti",
    obat: "Losartan",
    tanggal: "09-05-2025",
    status: "Menunggu Pembayaran",
  },
  {
    id: "RSP016",
    pasien: "Indah Permata",
    dokter: "dr. Bimo Prasetyo",
    obat: "Salbutamol",
    tanggal: "09-05-2025",
    status: "Selesai",
  },
  {
    id: "RSP017",
    pasien: "Rizky Maulana",
    dokter: "dr. Tri Handayani",
    obat: "Chlorpheniramine",
    tanggal: "10-05-2025",
    status: "Sudah Bayar",
  },
  {
    id: "RSP018",
    pasien: "Mega Lestari",
    dokter: "dr. Imam Susanto",
    obat: "Ciprofloxacin",
    tanggal: "10-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP019",
    pasien: "Galih Aditya",
    dokter: "dr. Nurul Hidayah",
    obat: "Doxycycline",
    tanggal: "11-05-2025",
    status: "Menunggu Pembayaran",
  },
  {
    id: "RSP020",
    pasien: "Wulan Sari",
    dokter: "dr. Arief Kurniawan",
    obat: "Acetaminophen",
    tanggal: "11-05-2025",
    status: "Selesai",
  },
];

export default function EResep() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [lihatSemua, setLihatSemua] = useState(false);

  // Filter dan Sort
  const filtered = dataResep
    .filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === "id") return a.id.localeCompare(b.id);
      if (sortBy === "nama") return a.pasien.localeCompare(b.pasien);
      if (sortBy === "dokter") return a.dokter.localeCompare(b.dokter);
      if (sortBy === "obat") return a.obat.localeCompare(b.obat);
      return 0;
    });

  const dataTampil = lihatSemua ? filtered : filtered.slice(0, 12);

  return (
    <div className="">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">E-Resep</h1>
          <p className="text-slate-600 mt-3">Pantau E-resep</p>
        </div>

        {/* Dropdown Sorting */}
        <div className="flex flex-wrap items-center gap-3 mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4">
          <select
            className="border border-slate-400 rounded px-3 py-2 text-xs xs:text-sm sm:text-base md:text-lg outline-none transition"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="id">ID Resep (A-Z)</option>
            <option value="nama">Nama Pasien (A-Z)</option>
            <option value="dokter">Nama Dokter (A-Z)</option>
            <option value="obat">Nama Obat (A-Z)</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4 pr-0 xs:pr-10 sm:pr-12 md:pr-12 lg:pr-12 xl:pr-12">
          <input
            type="text"
            placeholder="Ketik ID Resep, Pasien, Dokter"
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4 pr-12 py-2 text-xs xs:text-sm sm:text-base md:text-lg outline-none transition placeholder:text-gray-400 placeholder:text-xs xs:placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 h-full text-white bg-[#87B6E5] px-4 xs:px-5 sm:px-6 rounded-r hover:bg-[#64b1ff] transition flex items-center justify-center"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <LucideSearch size={20} className="xs:size-5 sm:size-6 md:size-7" />
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full border-2 border-slate-400 text-[8px] sm:text-[11px] md:text-sm lg:text-base">
          <thead className="bg-[#557187] text-white text-[7px] sm:text-[9px] md:text-xs lg:text-sm">
            <tr>
              {[
                "No",
                "ID Resep",
                "Nama Pasien",
                "Nama Dokter",
                "Nama Obat",
                "Tanggal Resep",
                "Status",
              ].map((text, i) => (
                <th
                  key={i}
                  className="border-2 border-slate-400 text-center px-1 py-[1px] sm:px-2 sm:py-[3px] md:px-3 md:py-[4px] lg:px-4 lg:py-[6px]"
                >
                  {text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataTampil.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-slate-500 py-3 text-[8px] sm:text-[11px] md:text-sm lg:text-base"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              dataTampil.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                >
                  <td className="border-2 border-slate-400 text-center px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {index + 1}
                  </td>
                  <td className="border-2 border-slate-400 text-center px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.id}
                  </td>
                  <td className="border-2 border-slate-400 px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.pasien}
                  </td>
                  <td className="border-2 border-slate-400 px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.dokter}
                  </td>
                  <td className="border-2 border-slate-400 px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.obat}
                  </td>
                  <td className="border-2 border-slate-400 text-center px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.tanggal}
                  </td>
                  <td className="border-2 border-slate-400 text-center px-1 py-[1px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                    {item.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {filtered.length > 12 && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-[#557187] text-white rounded hover:bg-[#2A4D69] transition text-sm md:text-base"
              onClick={() => setLihatSemua(!lihatSemua)}
            >
              {lihatSemua ? "Sembunyikan" : "Lihat Semua"}
            </button>
          </div>
        )}
      </div>

      {/* Scroll to Top Bottom */}
      <div className="rounded-full">
        <ScrollToTopButton />
      </div>
      
      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const Obat = () => {
  const [lihatSemua, setLihatSemua] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 👉 State untuk pencarian

  const dataObat = [
    {
      id: "OB001",
      nama: "Paracetamol",
      stok: 0,
      harga: 10000,
      deskripsi: "Obat pereda demam dan nyeri.",
    },
    {
      id: "OB002",
      nama: "Amoxicillin",
      stok: 0,
      harga: 8500,
      deskripsi: "Antibiotik untuk infeksi bakteri.",
    },
    {
      id: "OB003",
      nama: "Ibuprofen",
      stok: 0,
      harga: 12000,
      deskripsi: "Obat anti inflamasi non steroid.",
    },
    {
      id: "OB004",
      nama: "Metformin",
      stok: 0,
      harga: 15000,
      deskripsi: "Obat untuk diabetes tipe 2.",
    },
    {
      id: "OB005",
      nama: "Loperamide",
      stok: 0,
      harga: 9000,
      deskripsi: "Obat diare.",
    },
    {
      id: "OB006",
      nama: "Cetirizine",
      stok: 0,
      harga: 7000,
      deskripsi: "Obat alergi dan antihistamin.",
    },
    {
      id: "OB007",
      nama: "Omeprazole",
      stok: 0,
      harga: 20000,
      deskripsi: "Obat lambung dan GERD.",
    },
    {
      id: "OB008",
      nama: "Simvastatin",
      stok: 0,
      harga: 25000,
      deskripsi: "Obat penurun kolesterol.",
    },
    {
      id: "OB009",
      nama: "Dextromethorphan",
      stok: 0,
      harga: 11000,
      deskripsi: "Obat batuk.",
    },
    {
      id: "OB010",
      nama: "Salbutamol",
      stok: 0,
      harga: 18000,
      deskripsi: "Obat asma dan bronkodilator.",
    },
    {
      id: "OB011",
      nama: "Ranitidine",
      stok: 0,
      harga: 13000,
      deskripsi: "Obat tukak lambung.",
    },
    {
      id: "OB012",
      nama: "Clarithromycin",
      stok: 0,
      harga: 27000,
      deskripsi: "Antibiotik spektrum luas.",
    },
    {
      id: "OB013",
      nama: "Fluoxetine",
      stok: 50,
      harga: 30000,
      deskripsi: "Obat antidepresan.",
    },
    {
      id: "OB014",
      nama: "Hydrochlorothiazide",
      stok: 10,
      harga: 22000,
      deskripsi: "Obat diuretik untuk hipertensi.",
    },
    {
      id: "OB015",
      nama: "Levothyroxine",
      stok: 70,
      harga: 28000,
      deskripsi: "Obat untuk hipotiroidisme.",
    },
    {
      id: "OB016",
      nama: "Gabapentin",
      stok: 15,
      harga: 35000,
      deskripsi: "Obat untuk nyeri saraf.",
    },
    {
      id: "OB017",
      nama: "Diazepam",
      stok: 0,
      harga: 40000,
      deskripsi: "Obat penenang dan antikejang.",
    },
    {
      id: "OB018",
      nama: "Prednisone",
      stok: 5,
      harga: 37000,
      deskripsi: "Obat steroid anti inflamasi.",
    },
    {
      id: "OB019",
      nama: "Alprazolam",
      stok: 40,
      harga: 45000,
      deskripsi: "Obat untuk kecemasan.",
    },
    {
      id: "OB020",
      nama: "Cetirizine",
      stok: 55,
      harga: 7000,
      deskripsi: "Obat antihistamin untuk alergi.",
    },
    {
      id: "OB021",
      nama: "Metoprolol",
      stok: 35,
      harga: 29000,
      deskripsi: "Obat untuk tekanan darah tinggi.",
    },
    {
      id: "OB022",
      nama: "Azithromycin",
      stok: 65,
      harga: 33000,
      deskripsi: "Antibiotik makrolida.",
    },
  ];

  // Filter berdasarkan status stok
  const filteredByStatus = dataObat.filter((item) => {
    if (statusFilter === "Stok Habis") return item.stok === 0;
    return true;
  });

  // Filter berdasarkan pencarian
  const filteredBySearch = filteredByStatus.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(query) ||
      item.nama.toLowerCase().includes(query)
    );
  });

  // Sorting
  const sortedData = [...filteredBySearch].sort((a, b) => {
    if (sortBy === "nama") return a.nama.localeCompare(b.nama);
    if (sortBy === "stok") return b.stok - a.stok;
    if (sortBy === "harga") return a.harga - b.harga;
    return 0;
  });

  const dataTampil = lihatSemua ? sortedData : sortedData.slice(0, 12);

  return (
    <div>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Obat</h1>
          <p className="text-slate-600">
            ID Obat, Nama Obat, Stok, Harga Satuan, Deskripsi
          </p>
        </div>

        {/* Filter Status */}
        <div className="flex flex-wrap gap-2">
          {["Semua", "Stok Habis"].map((status) => (
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

        {/* Sorting */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <select
            className="border border-slate-400 rounded px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="nama">Nama Obat (A-Z)</option>
            <option value="stok">Stok (Tinggi ke Rendah)</option>
            <option value="harga">Harga (Rendah ke Tinggi)</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik ID Obat / Nama Obat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4  py-2 text-sm outline-none"
          />
          <div className="absolute -right-0 top-1/2 -translate-y-1/2 text-slate-500">
            <div className="bg-[#87B6E5] hover:bg-[#64b1ff] text-white py-2 px-4 rounded-sm">
              <LucideSearch />
            </div>
          </div>
        </div>

        {/* Tabel Obat */}
        <div className="overflow-x-auto border border-slate-400 rounded">
          <table className="min-w-full border-collapse border border-slate-400 text-sm">
            <thead className="bg-[#557187] text-white">
              <tr>
                <th className="border border-slate-400 px-3 py-2">No</th>
                <th className="border border-slate-400 px-3 py-2">ID Obat</th>
                <th className="border border-slate-400 px-3 py-2">Nama Obat</th>
                <th className="border border-slate-400 px-3 py-2">Stok</th>
                <th className="border border-slate-400 px-3 py-2">
                  Harga Satuan
                </th>
                <th className="border border-slate-400 px-3 py-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {dataTampil.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                dataTampil.map((obat, idx) => (
                  <tr
                    key={obat.id}
                    className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                  >
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.id}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.nama}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.stok}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      Rp. {obat.harga.toLocaleString("id-ID")}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.deskripsi}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Lihat Semua */}
        {sortedData.length > 12 && (
          <div className="text-center mt-4">
            <button
              className="px-4 py-2 bg-[#2A4D69] text-white rounded hover:bg-[#1e3a57]"
              onClick={() => setLihatSemua(!lihatSemua)}
            >
              {lihatSemua ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
            </button>
          </div>
        )}
      </div>

      {/* Scroll to Top Bottom */}
      <ScrollToTopButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Obat;

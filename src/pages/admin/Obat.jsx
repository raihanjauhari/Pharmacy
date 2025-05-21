import React, { useState } from "react";
import Footer from "../../components/Footer";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import ScrollToTopButton from "../../components/admin/ScrollToTopBotton";

const originalData = [
  {
    id: "OB001",
    nama: "Paracetamol",
    stok: 100,
    harga: "Rp. 10.000",
    poli: "Poli Umum",
    deskripsi: "Obat penurun demam dan penghilang nyeri",
  },
  {
    id: "OB002",
    nama: "Amoxicillin",
    stok: 75,
    harga: "Rp. 8.500",
    poli: "Poli Gigi",
    deskripsi: "Antibiotik untuk infeksi bakteri",
  },
  {
    id: "OB003",
    nama: "Insto",
    stok: 50,
    harga: "Rp. 16.000",
    poli: "Poli Mata",
    deskripsi: "Obat tetes mata untuk iritasi",
  },
  {
    id: "OB004",
    nama: "Cefadroxil",
    stok: 60,
    harga: "Rp. 11.500",
    poli: "Poli Bedah",
    deskripsi: "Antibiotik pasca operasi",
  },
  {
    id: "OB005",
    nama: "Dexamethasone",
    stok: 40,
    harga: "Rp. 7.000",
    poli: "Poli Umum",
    deskripsi: "Obat anti-inflamasi",
  },
  {
    id: "OB006",
    nama: "Cataflam",
    stok: 30,
    harga: "Rp. 20.000",
    poli: "Poli Bedah",
    deskripsi: "Obat penghilang nyeri dan radang",
  },
  {
    id: "OB007",
    nama: "Albothyl",
    stok: 45,
    harga: "Rp. 18.000",
    poli: "Poli Gigi",
    deskripsi: "Obat sariawan dan antiseptik",
  },
  {
    id: "OB008",
    nama: "Visine",
    stok: 20,
    harga: "Rp. 15.000",
    poli: "Poli Mata",
    deskripsi: "Obat tetes mata untuk merah",
  },
  {
    id: "OB009",
    nama: "Ibuprofen",
    stok: 30,
    harga: "Rp. 9.000",
    poli: "Poli Umum",
    deskripsi: "Obat anti nyeri dan inflamasi",
  },
  {
    id: "OB010",
    nama: "Gentamicin",
    stok: 40,
    harga: "Rp. 12.000",
    poli: "Poli Mata",
    deskripsi: "Antibiotik tetes mata",
  },

  {
    id: "OB011",
    nama: "Cetirizine",
    stok: 55,
    harga: "Rp. 13.000",
    poli: "Poli Umum",
    deskripsi: "Obat antihistamin untuk alergi",
  },
  {
    id: "OB012",
    nama: "Loratadine",
    stok: 50,
    harga: "Rp. 12.500",
    poli: "Poli Umum",
    deskripsi: "Antihistamin non-sedatif",
  },
  {
    id: "OB013",
    nama: "Metformin",
    stok: 70,
    harga: "Rp. 15.000",
    poli: "Poli Umum",
    deskripsi: "Obat untuk diabetes tipe 2",
  },
  {
    id: "OB014",
    nama: "Salbutamol",
    stok: 35,
    harga: "Rp. 25.000",
    poli: "Poli Paru",
    deskripsi: "Obat bronkodilator untuk asma",
  },
  {
    id: "OB015",
    nama: "Omeprazole",
    stok: 45,
    harga: "Rp. 18.000",
    poli: "Poli Gastro",
    deskripsi: "Obat pengurang asam lambung",
  },
  {
    id: "OB016",
    nama: "Simvastatin",
    stok: 40,
    harga: "Rp. 22.000",
    poli: "Poli Jantung",
    deskripsi: "Obat penurun kolesterol",
  },
  {
    id: "OB017",
    nama: "Diazepam",
    stok: 30,
    harga: "Rp. 20.000",
    poli: "Poli Psikiatri",
    deskripsi: "Obat penenang dan anti-kecemasan",
  },
  {
    id: "OB018",
    nama: "Ibuprofen",
    stok: 50,
    harga: "Rp. 9.000",
    poli: "Poli Umum",
    deskripsi: "Obat anti nyeri dan inflamasi",
  },
  {
    id: "OB019",
    nama: "Ranitidine",
    stok: 60,
    harga: "Rp. 14.000",
    poli: "Poli Gastro",
    deskripsi: "Obat pengurang asam lambung",
  },
  {
    id: "OB020",
    nama: "Fluconazole",
    stok: 25,
    harga: "Rp. 30.000",
    poli: "Poli Kulit",
    deskripsi: "Obat antijamur",
  },
];

const Obat = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (obat) => {
    alert(`Edit obat: ${obat.nama}`);
    // logika edit bisa disambungkan ke modal atau routing edit
  };

  const parseHarga = (hargaStr) =>
    parseInt(hargaStr.replace("Rp. ", "").replace(/\./g, "").replace(",", ""));

  // Filter dulu berdasarkan searchQuery
  const filteredData = originalData.filter(
    (obat) =>
      obat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lalu urutkan hasil filter
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "nama") {
      return a.nama.localeCompare(b.nama);
    } else if (sortBy === "stok") {
      return b.stok - a.stok;
    } else if (sortBy === "harga") {
      return parseHarga(a.harga) - parseHarga(b.harga);
    }
    return 0;
  });

  const [lihatSemua, setLihatSemua] = useState(false);
  const dataTampil = lihatSemua ? sortedData : sortedData.slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-3">
        <div>
          <h1 className="text-2xl font-bold">Obat</h1>
          <p className="text-slate-600">
            ID Obat, Nama Obat, Stok, Harga Satuan, Deskripsi
          </p>
        </div>

        {/* Sorting */}
        <div className="flex flex-wrap items-center gap-3 mt-9 mb-4">
          <select
            className="border border-slate-400 rounded px-3 py-2 text-sm md:text-base outline-none ml-4"
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

        <div className="relative mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4 pr-0 xs:pr-12 sm:pr-12 md:pr-12 lg:pr-12 xl:pr-12">
          <input
            type="text"
            placeholder="Ketik ID Obat / Nama Obat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
      w-full
      bg-[#E3EBF3]
      border-2 border-slate-300 focus:border-[#8bacc5]
      rounded
      pl-3 pr-10
      py-1.5
      text-[9px] xs:text-[11px] sm:text-[12px] md:text-lg
      outline-none
      transition
      placeholder:text-gray-400 placeholder:text-[8px] xs:placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-lg
    "
          />
          <button
            className="
      absolute right-0 top-0 h-full
      text-white
      bg-[#87B6E5]
      px-3 xs:px-4 sm:px-4
      rounded-r
      hover:bg-[#64b1ff]
      transition
      flex items-center justify-center
    "
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Tombol Tambah */}
        <div className="flex mb-4 mt-6 ml-4 mr-4">
          <button
            className={`
      rounded
      transition
      w-full 
      px-3 py-1 text-[10px] 
      flex items-center gap-1 justify-center
      sm:w-auto sm:px-4 sm:py-1 sm:text-xs sm:gap-2
      md:px-5 md:py-1 md:text-sm
      bg-[#557187]/90 text-white
      hover:bg-[#557187]
    `}
          >
            <PlusCircle size={16} className="sm:size-5 md:size-6" />
            <span className="leading-none">Tambahkan Obat</span>
          </button>
        </div>

        {/* Tabel Obat */}
        <div className="w-full overflow-x-auto px-4 xs:pr-8 sm:pr-4 md:pr-4 lg:pr-4 xl:pr-4">
          <table className="min-w-full border-2 border-slate-400 text-[10px] sm:text-[11px] md:text-sm lg:text-base">
            <thead className="bg-[#557187] text-white text-[8px] sm:text-[9px] md:text-xs lg:text-sm">
              <tr>
                {[
                  "No",
                  "Kode Obat",
                  "Nama Obat",
                  "Stok",
                  "Harga Satuan",
                  "Deskripsi",
                  "Aksi",
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
              {dataTampil.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-slate-500 py-4 text-[10px] sm:text-[11px] md:text-sm lg:text-base"
                  >
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                dataTampil.map((obat, idx) => (
                  <tr
                    key={obat.id}
                    className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                  >
                    <td className="border-2 border-slate-400 text-center">
                      {idx + 1}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      {obat.id}
                    </td>
                    <td className="border-2 border-slate-400 px-2">
                      {obat.nama}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      {obat.stok}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      {obat.harga}
                    </td>
                    <td className="border-2 border-slate-400 px-2">
                      {obat.deskripsi}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      <div className="flex sm:flex-row flex-col justify-center items-center gap-2 bg-white p-1 rounded-md shadow">
                        <button
                          onClick={() => handleEdit(obat)}
                          className="text-white bg-blue-800 hover:bg-blue-600 px-2 py-1 rounded w-full sm:w-auto"
                          title="Edit"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Pencil size={16} />
                            <span className="hidden sm:inline">Edit</span>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-1 mb-8">
        {sortedData.length > 12 && (
          <button
            onClick={() => setLihatSemua(!lihatSemua)}
            className="px-4 py-2 bg-[#557187]/90 text-white rounded hover:bg-[#557187] transition"
          >
            {lihatSemua ? "Sembunyikan" : "Lihat Semua"}
          </button>
        )}
      </div>

      {/* Scroll to Top Bottom */}
      <div className="rounded-full">
        <ScrollToTopButton />
      </div>

      <Footer />
    </div>
  );
};

export default Obat;

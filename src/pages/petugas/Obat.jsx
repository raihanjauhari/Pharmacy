import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const Obat = () => {
  const [lihatSemua, setLihatSemua] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataObat, setDataObat] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/obat")
      .then((res) => {
        setDataObat(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data obat:", err);
      });
  }, []);

  const filteredByStatus = dataObat.filter((item) => {
    if (statusFilter === "Stok Habis") return item.stok === 0;
    return true;
  });

  const filteredBySearch = filteredByStatus.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.kode_obat.toLowerCase().includes(query) ||
      item.nama_obat.toLowerCase().includes(query)
    );
  });

  const sortedData = [...filteredBySearch].sort((a, b) => {
    if (sortBy === "nama") return a.nama_obat.localeCompare(b.nama_obat);
    if (sortBy === "stok") return b.stok - a.stok;
    if (sortBy === "harga") return a.harga_satuan - b.harga_satuan;
    return 0;
  });

  const dataTampil = lihatSemua ? sortedData : sortedData.slice(0, 12);

  return (
    <div>
      <div className="mx-4 sm:mx-6 md:mx-8 space-y-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Obat</h1>
          <p className="text-slate-600">
            ID Obat, Nama Obat, Stok, Harga Satuan, Deskripsi
          </p>
        </div>

        {/* Filter Status */}
        <div className="flex flex-wrap gap-2 px-4 justify-center sm:justify-start">
          {["Semua", "Stok Habis"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
        rounded
        transition
        w-full 
        px-3 py-2 text-sm  /* default xs */
        sm:w-auto sm:px-4 sm:py-2 sm:text-base  /* sm ke atas */
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

        {/* Sorting */}
        <div className="flex flex-wrap items-center gap-3 mt-4 mx-4 xs:mx-6 sm:mx-4 md:mx-4 lg:mx-4">
          <select
            className="
      border border-slate-400 
      rounded 
      px-3 py-2 
      text-xs xs:text-sm sm:text-base md:text-lg 
      transition 
      outline-none
    "
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
      pl-4 pr-12
      py-2 text-xs xs:text-sm sm:text-base md:text-lg
      outline-none
      transition
      placeholder:text-gray-400 placeholder:text-xs xs:placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg
    "
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
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <LucideSearch size={20} className="xs:size-5 sm:size-6 md:size-7" />
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
                    colSpan={6}
                    className="text-center text-slate-500 py-4 text-[10px] sm:text-[11px] md:text-sm lg:text-base"
                  >
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                dataTampil.map((obat, idx) => (
                  <tr
                    key={obat.kode_obat}
                    className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                  >
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {idx + 1}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {obat.kode_obat}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {obat.nama_obat}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {obat.stok}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      Rp. {obat.harga_satuan.toLocaleString("id-ID")}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
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
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setLihatSemua(!lihatSemua)}
              className="px-4 py-2 bg-[#2A4D69] text-white rounded hover:bg-[#1e3a4f]"
            >
              {lihatSemua ? "Sembunyikan" : "Lihat Semua"}
            </button>
          </div>
        )}
      </div>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Obat;

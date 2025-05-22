import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { PlusCircle, Pencil, Search } from "lucide-react";
import ScrollToTopButton from "../../components/admin/ScrollToTopBotton";
import AddObatForm from "../../components/admin/AddObatForm";
import EditObatForm from "../../components/admin/EditObatForm";
import axios from "axios";

const Obat = () => {
  const [originalData, setOriginalData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedObat, setSelectedObat] = useState(null);
  const [lihatSemua, setLihatSemua] = useState(false);

  // Fetch data obat dari API
  // ...di bagian atas komponen Obat
  const fetchObat = () => {
    axios
      .get("http://127.0.0.1:3000/api/obat")
      .then((response) => {
        setOriginalData(response.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data obat:", error);
      });
  };

  // panggil fetchObat di useEffect
  useEffect(() => {
    fetchObat();
  }, []);

  const handleEdit = (obat) => setSelectedObat(obat);
  const handleCloseEdit = () => setSelectedObat(null);

  // Nonaktifkan scroll jika modal tambah/edit terbuka
  useEffect(() => {
    document.body.style.overflow =
      showAddForm || selectedObat ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddForm, selectedObat]);

  const parseHarga = (hargaStr) => parseInt(hargaStr.replace(/[^\d]/g, ""), 10);

  // Filter dulu berdasarkan searchQuery
  const filteredData = originalData.filter(
    (obat) =>
      obat.kode_obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.nama_obat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lalu urutkan hasil filter
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "nama") {
      return a.nama_obat.localeCompare(b.nama_obat);
    } else if (sortBy === "stok") {
      return b.stok - a.stok;
    } else if (sortBy === "harga") {
      return parseHarga(a.harga_satuan) - parseHarga(b.harga_satuan);
    }
    return 0;
  });

  const dataTampil = lihatSemua ? sortedData : sortedData.slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
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
            onClick={() => setShowAddForm(true)}
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
                      {obat.kode_obat}
                    </td>

                    <td className="border-2 border-slate-400 px-2">
                      {obat.nama_obat}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      {obat.stok}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      {obat.harga_satuan}
                    </td>
                    <td className="border-2 border-slate-400 px-2">
                      {obat.deskripsi}
                    </td>
                    <td className="border-2 border-slate-400 text-center">
                      <div className="flex sm:flex-row flex-col justify-center items-center gap-2 bg-white p-1 rounded-md shadow">
                        <button
                          onClick={() => handleEdit(obat)}
                          className="text-white bg-blue-800 hover:bg-blue-600 px-2 py-1 rounded w-full sm:w-auto"
                          title="Edit Obat"
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

      {/* Form Tambah Obat */}
      {showAddForm && (
        <AddObatForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            fetchObat(); // refresh data setelah tambah obat berhasil
            setShowAddForm(false); // tutup form
          }}
        />
      )}

      {/* Form Edit Obat */}
      {selectedObat && (
        <EditObatForm obat={selectedObat} onClose={handleCloseEdit} />
      )}

      <Footer />
    </div>
  );
};

export default Obat;

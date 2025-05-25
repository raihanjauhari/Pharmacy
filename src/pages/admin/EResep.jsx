import React, { useState, useEffect } from "react";
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
import EResepModal from "../../components/petugas/ResepModal";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const EResep = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedResep, setSelectedResep] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusPriority = {
    "Sudah Bayar": 1,
    Diproses: 2,
    "Menunggu Pembayaran": 3,
    Selesai: 4,
  };

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    setError(null);
    setData([]);

    const fetchData = async () => {
      try {
        const [
          pasienRes,
          resepRes,
          dokterRes,
          dilayaniRes,
          memunculkanRes,
          obatRes,
          detailEresepRes,
        ] = await Promise.all([
          fetch("http://127.0.0.1:3000/api/pasien"),
          fetch("http://127.0.0.1:3000/api/eresep"),
          fetch("http://127.0.0.1:3000/api/dokter"),
          fetch("http://127.0.0.1:3000/api/dilayani"),
          fetch("http://127.0.0.1:3000/api/memunculkan"),
          fetch("http://127.0.0.1:3000/api/obat"),
          fetch("http://127.0.0.1:3000/api/detail_eresep"),
        ]);

        if (
          !pasienRes.ok ||
          !resepRes.ok ||
          !dokterRes.ok ||
          !dilayaniRes.ok ||
          !memunculkanRes.ok ||
          !obatRes.ok ||
          !detailEresepRes.ok
        ) {
          throw new Error("Gagal mengambil data dari server");
        }

        const [
          pasienData,
          resepData,
          dokterData,
          dilayaniData,
          memunculkanData,
          obatData,
          detailEresepData,
        ] = await Promise.all([
          pasienRes.json(),
          resepRes.json(),
          dokterRes.json(),
          dilayaniRes.json(),
          memunculkanRes.json(),
          obatRes.json(),
          detailEresepRes.json(),
        ]);

        if (isCancelled) return;

        const pasienArray = Array.isArray(pasienData)
          ? pasienData
          : [pasienData];
        const resepArray = Array.isArray(resepData) ? resepData : [resepData];
        const dokterArray = Array.isArray(dokterData)
          ? dokterData
          : [dokterData];
        const dilayaniArray = Array.isArray(dilayaniData)
          ? dilayaniData
          : [dilayaniData];
        const memunculkanArray = Array.isArray(memunculkanData)
          ? memunculkanData
          : [memunculkanData];
        const obatArray = Array.isArray(obatData) ? obatData : [obatData];
        const detailEresepArray = Array.isArray(detailEresepData)
          ? detailEresepData
          : [detailEresepData];

        const combinedData = resepArray.map((resep) => {
          const pasien = pasienArray.find(
            (p) => p.id_pendaftaran === resep.id_pendaftaran
          );
          const dilayani = dilayaniArray.find(
            (d) => d.id_pendaftaran === resep.id_pendaftaran
          );
          const dokter = dokterArray.find(
            (d) => String(d.id_dokter) === String(dilayani?.id_dokter)
          );
          const detailResep = detailEresepArray.find(
            (d) => d.id_eresep === resep.id_eresep
          );

          const daftarObat = memunculkanArray
            .filter((m) => m.id_eresep === resep.id_eresep)
            .map((m) => {
              const obat = obatArray.find((o) => o.kode_obat === m.kode_obat);
              return {
                namaObat: obat?.nama_obat || "-",
                aturanPakai: m.aturan_pakai || "-",
                kuantitas: m.kuantitas || 0,
                hargaSatuan: obat?.harga_satuan || 0,
              };
            });

          return {
            id: resep.id_eresep || "Tidak ditemukan",
            status: resep.status || "Tidak diketahui",
            namaPasien: pasien?.nama_pasien || "Nama pasien tidak tersedia",
            namaDokter: dokter?.nama_dokter || "Nama dokter tidak diketahui",
            poli: dokter?.poli || "-",
            umur: pasien?.umur || "-",
            beratBadan: pasien?.berat_badan || "-",
            tanggalResep: detailResep?.tanggal_eresep || "-",
            diagnosa: pasien?.diagnosa || "-",
            keterangan: detailResep?.catatan || "-",
            daftarObat,
          };
        });

        setData(combinedData);
        setLoading(false);
      } catch (error) {
        if (isCancelled) return;
        setError(error.message || "Terjadi kesalahan");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredAndSortedData = data
    .filter((item) => {
      if (searchText.trim() === "") return true;
      const lowerSearch = searchText.toLowerCase();
      return (
        item.id.toString().toLowerCase().includes(lowerSearch) ||
        item.namaPasien.toLowerCase().includes(lowerSearch) ||
        item.namaDokter.toLowerCase().includes(lowerSearch)
      );
    })
    .sort((a, b) => {
      const aPriority = statusPriority[a.status] || 999;
      const bPriority = statusPriority[b.status] || 999;
      if (aPriority !== bPriority) return aPriority - bPriority;

      if (sortBy === "nama") return a.namaPasien.localeCompare(b.namaPasien);
      if (sortBy === "dokter") return a.namaDokter.localeCompare(b.namaDokter);
      if (sortBy === "id")
        return a.id.toString().localeCompare(b.id.toString());
      return 0;
    });

  // Hapus antreanMap dan antreanCounter

  const openModal = (resep) => {
    setSelectedResep(resep);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResep(null);
  };

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

        <div className="relative mt-4 mx-6 xs:mx-6 sm:mx-6 md:mx-6 lg:mx-6 xl:mx-6">
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

        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="w-full overflow-x-auto px-1 xs:px-6 sm:px-6 md:px-6 lg:px-6 xl:px-6">
          <table className="min-w-full border-2 border-slate-400 text-[10px] sm:text-[11px] md:text-sm lg:text-base">
            <thead className="bg-[#557187] text-white text-[8px] sm:text-[9px] md:text-xs lg:text-sm">
              <tr>
                {[
                  "No",
                  "ID E-Resep",
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
                      {item.namaPasien}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {item.namaDokter}
                    </td>
                    <td className="border-2 border-slate-400 text-center px-1 sm:px-2 md:px-3 lg:px-4 py-1">
                      {item.status}
                    </td>

                    <td className="border-2 border-slate-400 text-center px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => openModal(item)}
                          className="
                          bg-[#557187] text-white 
                          text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-sm
                          px-1.5 xs:px-2 py-[2px] xs:py-[3px]
                          rounded hover:bg-[#2A4D69] whitespace-nowrap max-w-full
                        "
                          style={{ minWidth: "50px" }}
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
      </div>

      {showModal && selectedResep && (
        <EResepModal
          showModal={showModal}
          onClose={closeModal}
          data={selectedResep}
        />
      )}

      {/* Scroll to Top Bottom */}
      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default EResep;

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
import PetunjukEResep from "../../assets/PDF/petunjuk.pdf";
import ResepModal from "../../components/petugas/ResepModal";
import ScrollToTopButton from "../../components/petugas/ScrollToTopButton";

const EResep = () => {
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedResep, setSelectedResep] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const updateStatusResep = async (id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/eresep/${id}`, {
        method: "PUT", // atau PATCH tergantung API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Gagal update status resep");
      }

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  // Fungsi panggil pasien, update status jadi Diproses permanen di DB
  const panggilPasien = async (id) => {
    const success = await updateStatusResep(id, "Diproses");
    if (success) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Diproses" } : item
        )
      );
      const pasien = data.find((d) => d.id === id);
      alert(`Pasien dipanggil: ${pasien?.namaPasien || id}`);
    }
  };

  // Fungsi selesaikan antrian, update status jadi Selesai permanen di DB
  const selesaikanAntrian = async (id) => {
    const success = await updateStatusResep(id, "Selesai");
    if (success) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Selesai" } : item
        )
      );
      alert(`Pasien selesai: ${id}`);
    }
  };

  const filteredAndSortedData = data
    .filter((item) => {
      if (statusFilter !== "Semua" && item.status !== statusMap[statusFilter])
        return false;

      if (searchText.trim() === "") return true;

      const lowerSearch = searchText.toLowerCase();
      return (
        item.id.toLowerCase().includes(lowerSearch) ||
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

  const antreanMap = {};
  let antreanCounter = 0;
  filteredAndSortedData.forEach((item) => {
    if (item.status === "Diproses") {
      antreanCounter++;
      antreanMap[item.id] = antreanCounter;
    }
  });

  const openModal = (resep) => {
    setSelectedResep(resep);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResep(null);
  };

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
          {error && <p className="text-red-600">{error}</p>}
          {loading && <p>Memuat data...</p>}
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
                      {item.namaPasien}
                    </td>
                    <td className="border-2 border-slate-400 px-2 py-[2px] sm:px-3 sm:py-2 md:px-4 md:py-2">
                      {item.namaDokter}
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
                          onClick={() => openModal(item)}
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
        <ResepModal
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

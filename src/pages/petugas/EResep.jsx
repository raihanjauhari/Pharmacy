import React from "react";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";
import PetunjukEResep from "../../assets/PDF/petunjuk.pdf";

const EResep = () => {
  const data = [
    {
      id: "PD001",
      nama: "Anisa Aulya",
      dokter: "dr. Lestari Wardhani",
      status: "Diproses",
    },
    {
      id: "PD002",
      nama: "Setya Adjie",
      dokter: "dr. Dewa Mahendra",
      status: "Menunggu Pembayaran",
    },
    {
      id: "PD003",
      nama: "Hairul Azmi",
      dokter: "dr. Intan Prameswari",
      status: "Menunggu Pembayaran",
    },
    {
      id: "PD004",
      nama: "Adi Manggala",
      dokter: "dr. Rizal Hamzah",
      status: "Selesai",
    },
    {
      id: "PD005",
      nama: "Neneknya DON",
      dokter: "dr. Meri",
      status: "Sudah Bayar",
    },
  ];

  return (
    <div>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">E-Resep</h1>
          <p className="text-slate-600 mt-3">Menampilkan E-resep</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="bg-[#557187] text-white px-4 py-2 rounded hover:bg-[#2A4D69] w-full sm:w-auto">
            + ID Pendaftaran
          </button>
          <button className="bg-[#557187] text-white px-4 py-2 rounded hover:bg-[#2A4D69] w-full sm:w-auto">
            + Nama Pasien
          </button>
          <button className="bg-[#557187] text-white px-4 py-2 rounded hover:bg-[#2A4D69] w-full sm:w-auto">
            + Dokter
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">
            ✓ Ubah
          </button>
          <button className="bg-orange-300 text-white px-4 py-2 rounded hover:bg-orange-400 w-full sm:w-auto">
            ⟳ Reset
          </button>
        </div>

        <hr className="border-t-2 border-[#2A4D69]" />

        <div className="relative">
          <input
            type="text"
            placeholder="Ketik ID Pendaftaran, Nama Pasien / Nama Dokter"
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4 pr-10 py-2 text-sm outline-none"
          />

          <button className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-500 m-0">
            <div className="bg-[#87B6E5] text-white m-0 py-2 px-4 rounded-sm hover:bg-[#64b1ff]">
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
                <th className="border-2 border-slate-400 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
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
                    {item.nama}
                  </td>
                  <td className="border-2 border-slate-400 px-4 py-2">
                    {item.dokter}
                  </td>
                  <td className="border-2 border-slate-400 px-4 py-2 text-center">
                    {item.status === "Sudah Bayar" ? (
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-35">
                        Panggil
                      </button>
                    ) : (
                      item.status
                    )}
                  </td>
                  <td className="border-2 border-slate-400 px-4 py-2 space-y-1 sm:space-x-2 sm:space-y-0 text-center">
                    <button className="bg-[#557187] text-white px-3 py-1 rounded hover:bg-[#2A4D69] w-full sm:w-auto">
                      Lihat e-Resep
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tambahan variasi bawah sebelum Footer */}
        <div className="mt-8 p-4 bg-[#F9FAFB] rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-700 mb-2">
            🔍 Butuh bantuan lebih lanjut? Pastikan ID dan nama pasien sesuai
            sebelum memanggil.
          </p>
          <div className="text-xs text-slate-500">
            Tip: Klik tombol <strong>"Panggil"</strong> hanya jika pasien sudah
            menyelesaikan pembayaran. Jangan sampai salah ya 😊
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600 italic">
          "Pelayanan terbaik dimulai dari perhatian terhadap detail sekecil apa
          pun." 💙
        </div>

        <div className="mt-4 text-center">
          <a
            href={PetunjukEResep}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Lihat petunjuk penggunaan e-Resep
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EResep;

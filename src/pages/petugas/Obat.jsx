import React from "react";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";

const Obat = () => {
  const dataObat = [
    {
      id: "OB001",
      nama: "Paracetamol",
      stok: 100,
      harga: "Rp. 10.000",
      kategori: "Poli Umum",
    },
    {
      id: "OB002",
      nama: "Amoxicillin",
      stok: 75,
      harga: "Rp. 8.500",
      kategori: "Poli Gigi",
    },
    {
      id: "OB003",
      nama: "Insto",
      stok: 50,
      harga: "Rp. 16.000",
      kategori: "Poli Mata",
    },
    {
      id: "OB004",
      nama: "Cefadroxil",
      stok: 60,
      harga: "Rp. 11.500",
      kategori: "Poli Bedah",
    },
    {
      id: "OB005",
      nama: "Dexamethasone",
      stok: 40,
      harga: "Rp. 7.000",
      kategori: "Poli Umum",
    },
    {
      id: "OB006",
      nama: "Cataflam",
      stok: 30,
      harga: "Rp. 20.000",
      kategori: "Poli Bedah",
    },
    {
      id: "OB007",
      nama: "Albothyl",
      stok: 45,
      harga: "Rp. 18.000",
      kategori: "Poli Gigi",
    },
    {
      id: "OB008",
      nama: "Visine",
      stok: 20,
      harga: "Rp. 15.000",
      kategori: "Poli Mata",
    },
    {
      id: "OB009",
      nama: "Ibuprofen",
      stok: 30,
      harga: "Rp. 9.000",
      kategori: "Poli Umum",
    },
    {
      id: "OB010",
      nama: "Gentamicin",
      stok: 40,
      harga: "Rp. 12.000",
      kategori: "Poli Mata",
    },
  ];

  const totalObat = dataObat.length;
  const totalStok = dataObat.reduce((sum, item) => sum + item.stok, 0);
  const kategoriTerbanyak = (() => {
    const count = {};
    dataObat.forEach((o) => (count[o.kategori] = (count[o.kategori] || 0) + 1));
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  })();

  return (
    <div>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Obat</h1>
          <p className="text-slate-600">
            ID Obat, Nama obat, Stok, Harga Satuan, Kategori Poli
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Ketik ID Obat / Nama Obat"
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4 pr-10 py-2 text-sm outline-none"
          />
          <button className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-500 m-0">
            <div className="bg-[#87B6E5] text-white m-0 py-2 px-4 rounded-sm hover:bg-[#64b1ff]">
              <LucideSearch />
            </div>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-400 text-sm">
            <thead className="bg-[#557187] text-white">
              <tr>
                <th className="border border-slate-400 px-3 py-2">No</th>
                <th className="border border-slate-400 px-3 py-2">ID Obat</th>
                <th className="border border-slate-400 px-3 py-2">Nama Obat</th>
                <th className="border border-slate-400 px-3 py-2">Stok</th>
                <th className="border border-slate-400 px-3 py-2">
                  Harga Satuan
                </th>
                <th className="border border-slate-400 px-3 py-2">
                  Kategori Poli
                </th>
              </tr>
            </thead>
            <tbody>
              {dataObat.map((obat, idx) => (
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
                    {obat.harga}
                  </td>
                  <td className="border border-slate-400 px-3 py-2 text-center">
                    {obat.kategori}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistik Obat */}
        <div className="bg-white p-4 rounded shadow mt-8 border-amber-200">
          <h2 className="text-lg font-semibold mb-4">Statistik Obat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-[#33A7DC] p-4 rounded transition duration-300 hover:scale-105 hover:shadow-md">
              <p className="text-white">Total Jenis Obat</p>
              <p className="font-bold text-xl text-white">{totalObat}</p>
            </div>
            <div className="bg-[#32A67A] p-4 rounded transition duration-300 hover:scale-105 hover:shadow-md">
              <p className="text-white">Total Stok Tersedia</p>
              <p className="font-bold text-xl text-white">{totalStok}</p>
            </div>
            <div className="bg-[#E3C731] p-4 rounded transition duration-300 hover:scale-105 hover:shadow-md">
              <p className="text-white">Kategori Terbanyak</p>
              <p className="font-bold text-xl text-white">
                {kategoriTerbanyak}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Obat;

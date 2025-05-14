import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { LucideSearch } from "lucide-react";

const Obat = () => {
  const [dataObat, setDataObat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/resep");
        const data = await res.json();
        setDataObat(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getKategoriTerbanyak = () => {
    const count = {};
    dataObat.forEach(({ KATEGORI }) => {
      count[KATEGORI] = (count[KATEGORI] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  };

  const totalObat = dataObat.length;
  const totalStok = dataObat.reduce((sum, item) => sum + item.STOK, 0);
  const kategoriTerbanyak = getKategoriTerbanyak();

  return (
    <div>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Obat</h1>
          <p className="text-slate-600">
            ID Obat, Nama Obat, Stok, Harga Jual, Kategori
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Ketik ID Obat / Nama Obat"
            className="w-full bg-[#E3EBF3] border-2 border-slate-300 focus:border-[#8bacc5] rounded pl-4 pr-12 py-2 text-sm outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="bg-[#87B6E5] text-white p-2 rounded hover:bg-[#64b1ff]">
              <LucideSearch size={16} />
            </div>
          </button>
        </div>

        {/* Table Obat */}
        <div className="overflow-x-auto">
          {loading ? (
            <p>Memuat data obat...</p>
          ) : (
            <table className="min-w-full border border-slate-400 text-sm">
              <thead className="bg-[#557187] text-white">
                <tr>
                  <th className="border border-slate-400 px-3 py-2">No</th>
                  <th className="border border-slate-400 px-3 py-2">ID Obat</th>
                  <th className="border border-slate-400 px-3 py-2">
                    Nama Obat
                  </th>
                  <th className="border border-slate-400 px-3 py-2">Stok</th>
                  <th className="border border-slate-400 px-3 py-2">
                    Harga Jual
                  </th>
                  <th className="border border-slate-400 px-3 py-2">
                    Kategori
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataObat.map((obat, idx) => (
                  <tr
                    key={obat.OBAT_ID}
                    className={idx % 2 !== 0 ? "bg-[#E3EBF3]" : "bg-white"}
                  >
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.OBAT_ID}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.NAMA_OBAT}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.STOK}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      Rp. {parseInt(obat.HARGA_JUAL).toLocaleString()}
                    </td>
                    <td className="border border-slate-400 px-3 py-2 text-center">
                      {obat.KATEGORI}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Statistik Obat */}
        {!loading && (
          <div className="bg-white p-4 rounded shadow mt-8">
            <h2 className="text-lg font-semibold mb-4">Statistik Obat</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-[#33A7DC] p-4 rounded transition hover:scale-105 hover:shadow-md">
                <p className="text-white">Total Jenis Obat</p>
                <p className="font-bold text-xl text-white">{totalObat}</p>
              </div>
              <div className="bg-[#32A67A] p-4 rounded transition hover:scale-105 hover:shadow-md">
                <p className="text-white">Total Stok Tersedia</p>
                <p className="font-bold text-xl text-white">{totalStok}</p>
              </div>
              <div className="bg-[#E3C731] p-4 rounded transition hover:scale-105 hover:shadow-md">
                <p className="text-white">Kategori Terbanyak</p>
                <p className="font-bold text-xl text-white">
                  {kategoriTerbanyak}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Obat;

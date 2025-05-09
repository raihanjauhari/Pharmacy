import React from "react";

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

  return (
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
          className="w-full border border-gray-300 rounded pl-4 pr-10 py-2"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
          🔍
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">ID Obat</th>
              <th className="border px-3 py-2">Nama Obat</th>
              <th className="border px-3 py-2">Stok</th>
              <th className="border px-3 py-2">Harga Satuan</th>
              <th className="border px-3 py-2">Kategori Poli</th>
            </tr>
          </thead>
          <tbody>
            {dataObat.map((obat, idx) => (
              <tr key={obat.id}>
                <td className="border px-3 py-2 text-center">{idx + 1}</td>
                <td className="border px-3 py-2">{obat.id}</td>
                <td className="border px-3 py-2">{obat.nama}</td>
                <td className="border px-3 py-2">{obat.stok}</td>
                <td className="border px-3 py-2">{obat.harga}</td>
                <td className="border px-3 py-2">{obat.kategori}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Obat;

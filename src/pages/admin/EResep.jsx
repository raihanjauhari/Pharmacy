import React, { useState } from "react";

const dataResep = [
  {
    id: "RSP001",
    pasien: "Anisa Aulya",
    dokter: "dr. Lestari Wardhani",
    obat: "Paracetamol",
    tanggal: "03-05-2025",
    status: "Diproses",
  },
  {
    id: "RSP002",
    pasien: "Setya Adjie",
    dokter: "dr. Dewa Mahendra",
    obat: "Insto",
    tanggal: "03-05-2025",
    status: "Menunggu",
  },
  {
    id: "RSP003",
    pasien: "Hairul Azmi",
    dokter: "dr. Intan Prameswari",
    obat: "Amoxicillin",
    tanggal: "03-05-2025",
    status: "Menunggu",
  },
  {
    id: "RSP004",
    pasien: "Adi Mangsgala",
    dokter: "dr. Rizal Hamzah",
    obat: "Cefadroxil",
    tanggal: "03-05-2025",
    status: "Menunggu",
  },
];

export default function EResep() {
  const [search, setSearch] = useState("");

  const filtered = dataResep.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-2">E-Resep</h1>
      <p className="mb-4 text-gray-600">Cek E-Resep</p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded">
          + ID Resep
        </button>
        <button className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded">
          + Nama Pasien
        </button>
        <button className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded">
          + Nama Dokter
        </button>
        <button className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded">
          + Nama Dokter
        </button>
        <button className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded">
          + Nama Dokter
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded">
          🔁 Reset
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center border-b border-gray-300 mb-4">
        <input
          type="text"
          placeholder="Ketik ID Resep, Nama Pasien, Nama Dokter, Resep Obat"
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
          🔍
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">ID Resep</th>
              <th className="border px-3 py-2">Nama Pasien</th>
              <th className="border px-3 py-2">Nama Dokter</th>
              <th className="border px-3 py-2">Resep Obat</th>
              <th className="border px-3 py-2">Tanggal Resep</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{item.id}</td>
                <td className="border px-3 py-2">{item.pasien}</td>
                <td className="border px-3 py-2">{item.dokter}</td>
                <td className="border px-3 py-2">{item.obat}</td>
                <td className="border px-3 py-2">{item.tanggal}</td>
                <td className="border px-3 py-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

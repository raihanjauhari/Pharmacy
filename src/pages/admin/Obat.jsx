import React from "react";
import Footer from "../../components/Footer";

const dataObat = [
  {
    id: "OB001",
    nama: "Paracetamol",
    stok: 100,
    harga: "Rp. 10.000",
    poli: "Poli Umum",
  },
  {
    id: "OB002",
    nama: "Amoxicillin",
    stok: 75,
    harga: "Rp. 8.500",
    poli: "Poli Gigi",
  },
  {
    id: "OB003",
    nama: "Insto",
    stok: 50,
    harga: "Rp. 16.000",
    poli: "Poli Mata",
  },
  {
    id: "OB004",
    nama: "Cefadroxil",
    stok: 60,
    harga: "Rp. 11.500",
    poli: "Poli Bedah",
  },
  {
    id: "OB005",
    nama: "Dexamethasone",
    stok: 40,
    harga: "Rp. 7.000",
    poli: "Poli Umum",
  },
  {
    id: "OB006",
    nama: "Cataflam",
    stok: 30,
    harga: "Rp. 20.000",
    poli: "Poli Bedah",
  },
  {
    id: "OB007",
    nama: "Albothyl",
    stok: 45,
    harga: "Rp. 18.000",
    poli: "Poli Gigi",
  },
  {
    id: "OB008",
    nama: "Visine",
    stok: 20,
    harga: "Rp. 15.000",
    poli: "Poli Mata",
  },
  {
    id: "OB009",
    nama: "Ibuprofen",
    stok: 30,
    harga: "Rp. 9.000",
    poli: "Poli Umum",
  },
  {
    id: "OB010",
    nama: "Gentamicin",
    stok: 40,
    harga: "Rp. 12.000",
    poli: "Poli Mata",
  },
];

const Obat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-1">Obat</h2>
        <p className="text-sm text-gray-600 mb-4">
          ID Obat, Nama obat, Stok, Harga Satuan, Kategori Poli
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + ID Obat
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Nama Obat
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Stok
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Harga Satuan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Kategori Poli
          </button>
          <button className="bg-orange-400 text-white px-4 py-2 rounded">
            🔁 Reset
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Ketik ID Obat / Nama Obat"
            className="border px-3 py-2 rounded-l w-full md:w-1/3"
          />
          <button className="bg-blue-500 px-4 py-2 rounded-r text-white">
            🔍
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">ID Obat</th>
                <th className="px-4 py-2 border">Nama Obat</th>
                <th className="px-4 py-2 border">Stok</th>
                <th className="px-4 py-2 border">Harga Satuan</th>
                <th className="px-4 py-2 border">Kategori Poli</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataObat.map((obat, index) => (
                <tr key={obat.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{obat.id}</td>
                  <td className="border px-4 py-2">{obat.nama}</td>
                  <td className="border px-4 py-2">{obat.stok}</td>
                  <td className="border px-4 py-2">{obat.harga}</td>
                  <td className="border px-4 py-2">{obat.poli}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600">
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Obat;

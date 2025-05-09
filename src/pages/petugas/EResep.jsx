import React from "react";
import Footer from "../../components/Footer";

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
      status: "Menunggu",
    },
    {
      id: "PD003",
      nama: "Hairul Azmi",
      dokter: "dr. Intan Prameswari",
      status: "Menunggu",
    },
    {
      id: "PD004",
      nama: "Adi Manggala",
      dokter: "dr. Rizal Hamzah",
      status: "Menunggu",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">E-Resep</h1>
        <p className="text-slate-600 text-sm">Cek E-Resep</p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">
          + ID Pendaftaran
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
          + Nama Pasien
        </button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 w-full sm:w-auto">
          + Dokter
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">
          ✓ Ubah
        </button>
        <button className="bg-orange-300 text-white px-4 py-2 rounded hover:bg-orange-400 w-full sm:w-auto">
          ⟳ Reset
        </button>
      </div>

      <hr className="border-t-2 border-slate-300" />

      <div className="relative">
        <input
          type="text"
          placeholder="Ketik ID Pendaftaran, Nama Pasien / Nama Dokter"
          className="w-full border border-slate-300 rounded pl-4 pr-10 py-2 text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
          🔍
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[600px] md:min-w-full border border-slate-400 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-400 px-4 py-2">No</th>
              <th className="border border-slate-400 px-4 py-2">
                ID Pendaftaran
              </th>
              <th className="border border-slate-400 px-4 py-2">Nama Pasien</th>
              <th className="border border-slate-400 px-4 py-2">Dokter</th>
              <th className="border border-slate-400 px-4 py-2">Status</th>
              <th className="border border-slate-400 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                <td className="border border-slate-400 px-4 py-2 text-center">
                  {idx + 1}
                </td>
                <td className="border border-slate-400 px-4 py-2">{item.id}</td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.nama}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.dokter}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.status}
                </td>
                <td className="border border-slate-400 px-4 py-2 space-y-1 sm:space-x-2 sm:space-y-0">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto">
                    Tolak
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto">
                    Terima
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default EResep;

import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const StokObatModal = ({ isOpen, onClose }) => {
  const dataStok = [
    {
      id: "OB001",
      nama: "Paracetamol",
      stok: 0,
      harga: 10000,
      deskripsi: "Obat pereda demam dan nyeri.",
    },
    {
      id: "OB002",
      nama: "Amoxicillin",
      stok: 0,
      harga: 8500,
      deskripsi: "Antibiotik untuk infeksi bakteri.",
    },
    {
      id: "OB003",
      nama: "Ibuprofen",
      stok: 0,
      harga: 12000,
      deskripsi: "Obat anti inflamasi non steroid.",
    },
    {
      id: "OB004",
      nama: "Metformin",
      stok: 0,
      harga: 15000,
      deskripsi: "Obat untuk diabetes tipe 2.",
    },
    {
      id: "OB005",
      nama: "Loperamide",
      stok: 0,
      harga: 9000,
      deskripsi: "Obat diare.",
    },
    {
      id: "OB006",
      nama: "Cetirizine",
      stok: 0,
      harga: 7000,
      deskripsi: "Obat alergi dan antihistamin.",
    },
    {
      id: "OB007",
      nama: "Omeprazole",
      stok: 0,
      harga: 20000,
      deskripsi: "Obat lambung dan GERD.",
    },
    {
      id: "OB008",
      nama: "Simvastatin",
      stok: 0,
      harga: 25000,
      deskripsi: "Obat penurun kolesterol.",
    },
    {
      id: "OB009",
      nama: "Dextromethorphan",
      stok: 0,
      harga: 11000,
      deskripsi: "Obat batuk.",
    },
    {
      id: "OB010",
      nama: "Salbutamol",
      stok: 0,
      harga: 18000,
      deskripsi: "Obat asma dan bronkodilator.",
    },
    {
      id: "OB011",
      nama: "Ranitidine",
      stok: 0,
      harga: 13000,
      deskripsi: "Obat tukak lambung.",
    },
    {
      id: "OB012",
      nama: "Clarithromycin",
      stok: 0,
      harga: 27000,
      deskripsi: "Antibiotik spektrum luas.",
    },
    {
      id: "OB013",
      nama: "Fluoxetine",
      stok: 50,
      harga: 30000,
      deskripsi: "Obat antidepresan.",
    },
    {
      id: "OB014",
      nama: "Hydrochlorothiazide",
      stok: 10,
      harga: 22000,
      deskripsi: "Obat diuretik untuk hipertensi.",
    },
    {
      id: "OB015",
      nama: "Levothyroxine",
      stok: 70,
      harga: 28000,
      deskripsi: "Obat untuk hipotiroidisme.",
    },
    {
      id: "OB016",
      nama: "Gabapentin",
      stok: 15,
      harga: 35000,
      deskripsi: "Obat untuk nyeri saraf.",
    },
    {
      id: "OB017",
      nama: "Diazepam",
      stok: 0,
      harga: 40000,
      deskripsi: "Obat penenang dan antikejang.",
    },
    {
      id: "OB018",
      nama: "Prednisone",
      stok: 5,
      harga: 37000,
      deskripsi: "Obat steroid anti inflamasi.",
    },
    {
      id: "OB019",
      nama: "Alprazolam",
      stok: 40,
      harga: 45000,
      deskripsi: "Obat untuk kecemasan.",
    },
    {
      id: "OB020",
      nama: "Cetirizine",
      stok: 55,
      harga: 7000,
      deskripsi: "Obat antihistamin untuk alergi.",
    },
    {
      id: "OB021",
      nama: "Metoprolol",
      stok: 35,
      harga: 29000,
      deskripsi: "Obat untuk tekanan darah tinggi.",
    },
    {
      id: "OB022",
      nama: "Azithromycin",
      stok: 65,
      harga: 33000,
      deskripsi: "Antibiotik makrolida.",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false); // reset saat modal ditutup
    }
  }, [isOpen]);

  const dataToShow = showAll ? dataStok : dataStok.slice(0, 5);

  // Fungsi format harga ke rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Background transparan & blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Modal Box */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl relative max-h-[80vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Detail Persediaan Obat
              </Dialog.Title>

              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#33A7DC] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-center">No</th>
                      <th className="px-6 py-4 text-center">Nama Obat</th>
                      <th className="px-6 py-4 text-center">Stok</th>
                      <th className="px-6 py-4 text-center">Harga Obat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToShow.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-blue-50"
                        } hover:bg-blue-100`}
                      >
                        <td className="px-6 py-3 text-center">{index + 1}</td>
                        <td className="px-6 py-3 text-center">{item.nama}</td>
                        <td
                          className={`px-6 py-3 text-center font-semibold ${
                            item.stok === 0 ? "text-red-600" : "text-blue-600"
                          }`}
                        >
                          {item.stok}
                        </td>
                        <td className="px-6 py-3 text-center font-semibold text-green-700">
                          {formatRupiah(item.harga)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!showAll && dataStok.length > 5 && (
                <div className="text-center py-2 border-t bg-white rounded-b-lg">
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-50 px-4 py-2 mt-3 bg-[#33A7DC] text-white rounded-md hover:bg-[#5BA5C7]"
                  >
                    Lihat Semua Data
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StokObatModal;

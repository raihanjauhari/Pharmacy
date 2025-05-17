import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const StokObatModal = ({ isOpen, onClose }) => {
  const dataStok = [
    {
      id: 1,
      nama: "Paracetamol",
      stok: 150,
      satuan: "Tablet",
      kadaluarsa: "2025-11-01",
    },
    {
      id: 2,
      nama: "Amoxicillin",
      stok: 200,
      satuan: "Kapsul",
      kadaluarsa: "2026-01-10",
    },
    {
      id: 3,
      nama: "Ibuprofen",
      stok: 75,
      satuan: "Tablet",
      kadaluarsa: "2025-08-15",
    },
    {
      id: 4,
      nama: "Metformin",
      stok: 120,
      satuan: "Tablet",
      kadaluarsa: "2026-03-05",
    },
    {
      id: 5,
      nama: "Cetirizine",
      stok: 90,
      satuan: "Tablet",
      kadaluarsa: "2025-09-30",
    },
    {
      id: 6,
      nama: "Loperamide",
      stok: 45,
      satuan: "Kapsul",
      kadaluarsa: "2025-12-20",
    },
    {
      id: 7,
      nama: "Omeprazole",
      stok: 110,
      satuan: "Tablet",
      kadaluarsa: "2026-02-14",
    },
    {
      id: 8,
      nama: "Dextromethorphan",
      stok: 85,
      satuan: "Sirup",
      kadaluarsa: "2025-10-22",
    },
    {
      id: 9,
      nama: "Salbutamol",
      stok: 70,
      satuan: "Inhaler",
      kadaluarsa: "2026-01-01",
    },
    {
      id: 10,
      nama: "Ranitidine",
      stok: 130,
      satuan: "Tablet",
      kadaluarsa: "2025-11-30",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false); // reset saat modal ditutup
    }
  }, [isOpen]);

  const dataToShow = showAll ? dataStok : dataStok.slice(0, 5);

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
                      <th className="px-6 py-4 text-center">Satuan</th>
                      <th className="px-6 py-4 text-center">Kadaluarsa</th>
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
                            item.stok < 100 ? "text-red-600" : "text-blue-600"
                          }`}
                        >
                          {item.stok}
                        </td>
                        <td className="px-6 py-3 text-center">{item.satuan}</td>
                        <td className="px-6 py-3 text-center">
                          {item.kadaluarsa}
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
                    className="w-50 px-4 py-2 mt-3  bg-[#33A7DC] text-white rounded-md hover:bg-[#5BA5C7]"
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

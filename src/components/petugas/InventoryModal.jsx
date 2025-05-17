import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

const InventoryModal = ({ isOpen, onClose }) => {
  const dataObat = [
    { no: 1, nama: "Paracetamol", stok: 10, status: "Tersedia" },
    { no: 2, nama: "Amoxicillin", stok: 0, status: "Kosong" },
    { no: 3, nama: "Vitamin C", stok: 5, status: "Tersedia" },
    { no: 4, nama: "Ibuprofen", stok: 0, status: "Kosong" },
    { no: 5, nama: "Cetirizine", stok: 7, status: "Tersedia" },
    { no: 6, nama: "Loratadine", stok: 0, status: "Kosong" },
    { no: 7, nama: "Antasida", stok: 15, status: "Tersedia" },
    { no: 8, nama: "Salbutamol", stok: 3, status: "Tersedia" },
    { no: 9, nama: "Metformin", stok: 0, status: "Kosong" },
    { no: 10, nama: "Ranitidine", stok: 6, status: "Tersedia" },
  ];

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false); // Reset tampilan saat modal ditutup
    }
  }, [isOpen]);

  const dataToShow = showAll ? dataObat : dataObat.slice(0, 5);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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
            <Dialog.Panel className="w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Data Inventaris Obat
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#32A67A] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-center">No</th>
                      <th className="px-6 py-4 text-center">Nama Obat</th>
                      <th className="px-6 py-4 text-center">Stok Obat</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToShow.map((item, index) => (
                      <tr
                        key={item.no}
                        className={`border-b transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-green-50"
                        } hover:bg-green-100 text-center`}
                      >
                        <td className="px-6 py-3 text-center">{item.no}</td>
                        <td className="px-6 py-3 font-medium text-gray-800 text-center">
                          {item.nama}
                        </td>
                        <td className="px-6 py-3 text-center">{item.stok}</td>
                        <td
                          className={`px-6 py-3 text-center font-semibold ${
                            item.status === "Tersedia"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tombol lihat semua */}
              {!showAll && (
                <div className="text-center py-2 border-t bg-white rounded-b-lg">
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-50 px-4 py-2 mt-3  bg-[#32A67A] text-white rounded-md hover:bg-[#42866c]"
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

export default InventoryModal;

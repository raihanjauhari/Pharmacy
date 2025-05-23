import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const OutOfStockModal = ({ isOpen, onClose }) => {
  // Data obat contoh (bisa diganti dengan data dari API)
  const dataObat = [
    { no: 1, nama: "Paracetamol", stok: 0, minimum: 10 },
    { no: 2, nama: "Amoxicillin", stok: 3, minimum: 10 },
    { no: 3, nama: "Ibuprofen", stok: 12, minimum: 10 },
    { no: 4, nama: "Vitamin C", stok: 0, minimum: 10 },
    { no: 5, nama: "Cetirizine", stok: 8, minimum: 10 },
    { no: 6, nama: "Loperamide", stok: 6, minimum: 10 },
    { no: 7, nama: "Metformin", stok: 0, minimum: 10 },
    { no: 8, nama: "Diclofenac", stok: 15, minimum: 10 },
    { no: 9, nama: "Azithromycin", stok: 2, minimum: 10 },
    { no: 10, nama: "Ranitidine", stok: 9, minimum: 10 },
  ];

  // Tentukan status stok obat
  const getStatus = (stok, min) => {
    if (stok === 0) return "Habis";
    if (stok < min) return "Hampir Habis";
    return "Aman";
  };

  // Tentukan warna teks berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case "Habis":
        return "text-red-600";
      case "Hampir Habis":
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  };

  // State untuk kontrol tampil semua data atau sebagian
  const [showAll, setShowAll] = useState(false);

  // Data yang akan ditampilkan (5 pertama atau semua)
  const dataToShow = showAll ? dataObat : dataObat.slice(0, 5);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          setShowAll(false); // Reset tampilan ke default saat modal ditutup
          onClose(); // Panggil fungsi dari parent untuk tutup modal
        }}
        className="relative z-50"
      >
        {/* Background overlay */}
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

        {/* Modal panel */}
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
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl relative">
              {/* Tombol Close */}
              <button
                onClick={() => {
                  setShowAll(false);
                  onClose();
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Judul Modal */}
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Daftar Stok Obat
              </Dialog.Title>

              {/* Tabel stok obat */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#D9635C] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-center">No</th>
                      <th className="px-6 py-4 text-center">Nama Obat</th>
                      <th className="px-6 py-4 text-center">Stok</th>
                      <th className="px-6 py-4 text-center">Minimum</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToShow.map((item, index) => {
                      const status = getStatus(item.stok, item.minimum);
                      const color = getStatusColor(status);
                      return (
                        <tr
                          key={item.no}
                          className={`border-b transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-red-50"
                          } hover:bg-red-100`}
                        >
                          <td className="px-6 py-3 text-center">{item.no}</td>
                          <td className="px-6 py-3 font-medium text-gray-800 text-center">
                            {item.nama}
                          </td>
                          <td className="px-6 py-3 text-center">{item.stok}</td>
                          <td className="px-6 py-3 text-center">
                            {item.minimum}
                          </td>
                          <td
                            className={`px-6 py-3 text-center font-semibold ${color}`}
                          >
                            {status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tombol Lihat Semua Data */}
              {!showAll && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-4 py-2 bg-[#D9635C] text-white rounded-md hover:bg-[#b94f4a]"
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

export default OutOfStockModal;

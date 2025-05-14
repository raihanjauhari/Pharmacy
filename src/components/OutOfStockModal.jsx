import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

const OutOfStockModal = ({ isOpen, onClose }) => {
  const dataObat = [
    { no: 1, nama: "Paracetamol", stok: 0, minimum: 10 },
    { no: 2, nama: "Amoxicillin", stok: 3, minimum: 10 },
    { no: 3, nama: "Ibuprofen", stok: 12, minimum: 10 },
    { no: 4, nama: "Vitamin C", stok: 0, minimum: 10 },
  ];

  const getStatus = (stok, min) => {
    if (stok === 0) return "Habis";
    if (stok < min) return "Hampir Habis";
    return "Aman";
  };

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
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Daftar Obat Habis / Hampir Habis
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#e53935] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">No</th>
                      <th className="px-6 py-4">Nama Obat</th>
                      <th className="px-6 py-4 text-center">Stok</th>
                      <th className="px-6 py-4 text-center">Minimum</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataObat.map((item) => {
                      const status = getStatus(item.stok, item.minimum);
                      const color = getStatusColor(status);
                      return (
                        <tr
                          key={item.no}
                          className="border-b hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-3">{item.no}</td>
                          <td className="px-6 py-3 font-medium text-gray-800">
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OutOfStockModal;

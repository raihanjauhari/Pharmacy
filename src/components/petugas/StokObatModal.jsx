// StokObatModal.jsx
import React, { Fragment } from "react";
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
  ];

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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
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
                <X className="w-6 h-6" />
              </button>
              <Dialog.Title className="text-xl font-semibold text-center mb-4">
                Detail Persediaan Obat
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#33A7DC] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3">No</th>
                      <th className="px-6 py-3">Nama Obat</th>
                      <th className="px-6 py-3">Stok</th>
                      <th className="px-6 py-3">Satuan</th>
                      <th className="px-6 py-3">Kadaluarsa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataStok.map((item, index) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3">{item.nama}</td>
                        <td className="px-6 py-3">{item.stok}</td>
                        <td className="px-6 py-3">{item.satuan}</td>
                        <td className="px-6 py-3">{item.kadaluarsa}</td>
                      </tr>
                    ))}
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

export default StokObatModal;

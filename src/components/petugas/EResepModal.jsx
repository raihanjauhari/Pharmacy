import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

const EresepModal = ({ isOpen, onClose }) => {
  const dummyData = [
    {
      id: 1,
      pasien: "Andi",
      dokter: "Dr. Sinta",
      tanggal: "2025-05-10",
      status: "Baru",
    },
    {
      id: 2,
      pasien: "Budi",
      dokter: "Dr. Luki",
      tanggal: "2025-05-11",
      status: "Diproses",
    },
    {
      id: 3,
      pasien: "Citra",
      dokter: "Dr. Zaki",
      tanggal: "2025-05-12",
      status: "Selesai",
    },
  ];

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
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Detail E-Resep Masuk
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#E3C731] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Pasien</th>
                      <th className="px-6 py-4">Dokter</th>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-3">{item.id}</td>
                        <td className="px-6 py-3">{item.pasien}</td>
                        <td className="px-6 py-3">{item.dokter}</td>
                        <td className="px-6 py-3">{item.tanggal}</td>
                        <td
                          className={`px-6 py-3 font-semibold text-center ${
                            item.status === "Baru"
                              ? "text-blue-600"
                              : item.status === "Diproses"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {item.status}
                        </td>
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

export default EresepModal;

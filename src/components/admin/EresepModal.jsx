import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

const EresepModal = ({ isOpen, onClose }) => {
  const dummyData = [
    {
      id: "PD001",
      pasien: "Andi",
      dokter: "Dr. Sinta",
      tanggal: "2025-05-10",
      status: "Baru",
    },
    {
      id: "PD002",
      pasien: "Budi",
      dokter: "Dr. Luki",
      tanggal: "2025-05-11",
      status: "Diproses",
    },
    {
      id: "PD003",
      pasien: "Citra",
      dokter: "Dr. Zaki",
      tanggal: "2025-05-12",
      status: "Selesai",
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
            <Dialog.Panel className="w-full max-w-4xl rounded-lg bg-white p-6 border border-slate-300 shadow-lg relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
              <Dialog.Title className="text-xl font-bold mb-4 text-center">
                Detail E-Resep Masuk
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-slate-400 text-sm">
                  <thead className="bg-[#557187] text-white">
                    <tr>
                      <th className="border border-slate-400 px-4 py-2">ID</th>
                      <th className="border border-slate-400 px-4 py-2">
                        Pasien
                      </th>
                      <th className="border border-slate-400 px-4 py-2">
                        Dokter
                      </th>
                      <th className="border border-slate-400 px-4 py-2">
                        Tanggal
                      </th>
                      <th className="border border-slate-400 px-4 py-2">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={idx % 2 === 1 ? "bg-[#E3EBF3]" : ""}
                      >
                        <td className="border border-slate-400 px-4 py-2 text-center">
                          {item.id}
                        </td>
                        <td className="border border-slate-400 px-4 py-2">
                          {item.pasien}
                        </td>
                        <td className="border border-slate-400 px-4 py-2">
                          {item.dokter}
                        </td>
                        <td className="border border-slate-400 px-4 py-2 text-center">
                          {item.tanggal}
                        </td>
                        <td className="border border-slate-400 px-4 py-2 text-center font-semibold">
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

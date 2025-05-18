import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const EresepModal = ({ isOpen, onClose }) => {
  const dummyData = [
    { id: 1, pasien: "Andi", dokter: "Dr. Sinta", status: "Diproses" },
    {
      id: 2,
      pasien: "Budi",
      dokter: "Dr. Luki",
      status: "Menunggu Pembayaran",
    },
    { id: 3, pasien: "Citra", dokter: "Dr. Zaki", status: "Selesai" },
    { id: 4, pasien: "Dewi", dokter: "Dr. Rahmat", status: "Diproses" },
    { id: 5, pasien: "Eko", dokter: "Dr. Dian", status: "Sudah Bayar" },
    { id: 6, pasien: "Fajar", dokter: "Dr. Sari", status: "Selesai" },
    {
      id: 7,
      pasien: "Gina",
      dokter: "Dr. Wawan",
      status: "Menunggu Pembayaran",
    },
    { id: 8, pasien: "Hadi", dokter: "Dr. Rina", status: "Sudah Bayar" },
    { id: 9, pasien: "Intan", dokter: "Dr. Yudi", status: "Selesai" },
    { id: 10, pasien: "Joko", dokter: "Dr. Lina", status: "Diproses" },
  ];

  const statusPriority = {
    "Menunggu Pembayaran": 4,
    "Sudah Bayar": 3,
    Diproses: 2,
    Selesai: 1,
  };

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowAll(false);
  }, [isOpen]);

  const sortedData = [...dummyData].sort(
    (a, b) => statusPriority[b.status] - statusPriority[a.status]
  );

  const dataToShow = showAll ? sortedData : sortedData.slice(0, 5);

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
                Detail E-Resep Masuk
              </Dialog.Title>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-[#E3C731] text-white text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-center">ID</th>
                      <th className="px-6 py-4 text-center">Pasien</th>
                      <th className="px-6 py-4 text-center">Dokter</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToShow.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                        } hover:bg-yellow-100`}
                      >
                        <td className="px-6 py-3 text-center">{item.id}</td>
                        <td className="px-6 py-3 text-center">{item.pasien}</td>
                        <td className="px-6 py-3 text-center">{item.dokter}</td>
                        <td
                          className={`px-6 py-3 font-semibold text-center ${
                            item.status === "Diproses"
                              ? "text-blue-600"
                              : item.status === "Sudah Bayar"
                              ? "text-green-600"
                              : item.status === "Menunggu Pembayaran"
                              ? "text-orange-600"
                              : "text-gray-600"
                          }`}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!showAll && dummyData.length > 5 && (
                <div className="text-center py-2 border-t bg-white rounded-b-lg">
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-50 px-4 py-2 mt-3 bg-[#E3C731] text-white rounded-md hover:bg-[#C6B662]"
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

export default EresepModal;

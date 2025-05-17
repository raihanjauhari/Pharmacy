import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
    {
      id: 4,
      pasien: "Dewi",
      dokter: "Dr. Rahmat",
      tanggal: "2025-05-13",
      status: "Baru",
    },
    {
      id: 5,
      pasien: "Eko",
      dokter: "Dr. Dian",
      tanggal: "2025-05-14",
      status: "Diproses",
    },
    {
      id: 6,
      pasien: "Fajar",
      dokter: "Dr. Sari",
      tanggal: "2025-05-15",
      status: "Selesai",
    },
    {
      id: 7,
      pasien: "Gina",
      dokter: "Dr. Wawan",
      tanggal: "2025-05-16",
      status: "Baru",
    },
    {
      id: 8,
      pasien: "Hadi",
      dokter: "Dr. Rina",
      tanggal: "2025-05-17",
      status: "Diproses",
    },
    {
      id: 9,
      pasien: "Intan",
      dokter: "Dr. Yudi",
      tanggal: "2025-05-18",
      status: "Selesai",
    },
    {
      id: 10,
      pasien: "Joko",
      dokter: "Dr. Lina",
      tanggal: "2025-05-19",
      status: "Baru",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false); // reset ke 5 data saat modal ditutup
    }
  }, [isOpen]);

  const dataToShow = showAll ? dummyData : dummyData.slice(0, 5);

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
                      <th className="px-6 py-4 text-center">Tanggal</th>
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
                        <td className="px-6 py-3 text-center">
                          {item.tanggal}
                        </td>
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

              {!showAll && dummyData.length > 5 && (
                <div className="text-center py-2 border-t bg-white rounded-b-lg">
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-50 px-4 py-2 mt-3  bg-[#E3C731] text-white rounded-md hover:bg-[#C6B662]"
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

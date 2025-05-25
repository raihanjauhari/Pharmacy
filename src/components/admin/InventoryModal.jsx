import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

const InventoryModal = ({ isOpen, onClose }) => {
  const [dataObat, setDataObat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Reset showAll saat modal ditutup
  useEffect(() => {
    if (!isOpen) setShowAll(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return; // Fetch hanya kalau modal dibuka

    const fetchObat = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:3000/api/obat");
        if (!res.ok) throw new Error("Gagal mengambil data obat");
        const data = await res.json();

        // Tambahkan properti status berdasarkan stok
        const obatWithStatus = data.map((obat, index) => ({
          no: index + 1,
          nama: obat.nama_obat,
          stok: obat.stok,
          status: obat.stok > 0 ? "Tersedia" : "Kosong",
          kode_obat: obat.kode_obat,
        }));

        setDataObat(obatWithStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchObat();
  }, [isOpen]);

  // Sorting berdasarkan status
  const statusPriority = {
    Tersedia: 1,
    Kosong: 0,
  };

  const sortedData = [...dataObat].sort(
    (a, b) => statusPriority[b.status] - statusPriority[a.status]
  );

  // Jika showAll aktif, tetap tampilkan semua tapi dibatasi scroll
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
            <Dialog.Panel className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] rounded-2xl bg-white p-4 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Data Inventaris Obat
              </Dialog.Title>

              {loading && (
                <p className="text-center text-gray-500">Memuat data...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}

              {!loading && !error && (
                <>
                  {/* Scrollable area */}
                  <div
                    className={`overflow-x-auto ${
                      showAll ? "max-h-[400px] overflow-y-auto" : ""
                    }`}
                  >
                    <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm lg:text-sm text-left text-gray-700">
                      <thead className="bg-[#32A67A] text-white text-[10px] sm:text-xs uppercase">
                        <tr>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            No
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Nama Obat
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Stok Obat
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataToShow.length > 0 ? (
                          dataToShow.map((item, index) => (
                            <tr
                              key={item.kode_obat}
                              className={`border-b transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-green-50"
                              } hover:bg-green-100`}
                            >
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.no}
                              </td>
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.nama}
                              </td>
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.stok}
                              </td>
                              <td
                                className={`px-2 sm:px-4 md:px-6 py-2 text-center font-semibold ${
                                  item.status === "Tersedia"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.status}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-6 text-gray-500 text-xs sm:text-sm"
                            >
                              Tidak ada data obat.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Tombol Lihat Semua Data */}
                  {!showAll && dataObat.length > 5 && (
                    <div className="text-center py-2 border-t bg-white rounded-b-lg">
                      <button
                        onClick={() => setShowAll(true)}
                        className="px-4 py-2 mt-3 text-xs sm:text-sm bg-[#32A67A] text-white rounded-md hover:bg-[#477463]"
                      >
                        Lihat Semua Data
                      </button>
                    </div>
                  )}
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InventoryModal;

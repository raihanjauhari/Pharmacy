import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// *** IMPORT ICON X ***

const OutOfStockModal = ({ isOpen, onClose }) => {
  const [dataObat, setDataObat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowAll(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);

      fetch("http://127.0.0.1:3000/api/obat") // Ganti dengan URL API kamu
        .then((res) => {
          if (!res.ok) throw new Error("Gagal memuat data obat");
          return res.json();
        })
        .then((data) => {
          setDataObat(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setDataObat([]);
      setShowAll(false);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // Fungsi status stok
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
            <Dialog.Panel className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] rounded-2xl bg-white p-4 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Daftar Stok Obat
              </Dialog.Title>

              {loading && (
                <p className="text-center text-gray-500">Memuat data...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}

              {!loading && !error && (
                <>
                  <div
                    className={`overflow-x-auto ${
                      showAll ? "max-h-[400px] overflow-y-auto" : ""
                    }`}
                  >
                    <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm lg:text-sm text-left text-gray-700">
                      <thead className="bg-[#D9635C] text-white text-[10px] sm:text-xs uppercase">
                        <tr>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            No
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Nama Obat
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Stok
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Minimum
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataToShow.length > 0 ? (
                          dataToShow.map((item, index) => {
                            const minStok = item.minimum || 10; // Default minimum 5 jika tidak ada field
                            const status = getStatus(item.stok, minStok);
                            const color = getStatusColor(status);

                            return (
                              <tr
                                key={item.kode_obat}
                                className={`border-b transition-colors duration-200 ${
                                  index % 2 === 0 ? "bg-white" : "bg-red-50"
                                } hover:bg-red-100`}
                              >
                                <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-3 font-medium text-gray-800 text-center">
                                  {item.nama_obat}
                                </td>
                                <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                  {item.stok}
                                </td>
                                <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                  {minStok}
                                </td>
                                <td
                                  className={`px-2 sm:px-4 md:px-6 py-2 text-center font-semibold ${color}`}
                                >
                                  {status}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="text-center py-6 text-gray-500 text-xs sm:text-sm"
                            >
                              Tidak ada data obat.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {!showAll && dataObat.length > 5 && (
                    <div className="text-center py-2 border-t bg-white rounded-b-lg">
                      <button
                        onClick={() => setShowAll(true)}
                        className="px-4 py-2 mt-3 text-xs sm:text-sm bg-[#D9635C] text-white rounded-md hover:bg-[#b94f4a]"
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

export default OutOfStockModal;

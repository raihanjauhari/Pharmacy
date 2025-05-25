import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const StokObatModal = ({ isOpen, onClose }) => {
  const [dataStok, setDataStok] = useState([]);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    } else {
      setShowAll(false);
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const resObat = await fetch("http://127.0.0.1:3000/api/obat");
      const obatData = await resObat.json();

      setDataStok(obatData);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  const dataToShow = showAll ? dataStok : dataStok.slice(0, 5);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
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
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl relative max-h-[80vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
                Detail Persediaan Obat
              </Dialog.Title>

              {loading && (
                <p className="text-center text-gray-500">Memuat data...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}

              <div
                className={`overflow-x-auto ${
                  showAll ? "max-h-[400px] overflow-y-auto" : ""
                }`}
              >
                <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm lg:text-sm text-left text-gray-700">
                  <thead className="bg-[#33A7DC] text-white text-[10px] sm:text-xs uppercase">
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
                        Harga Obat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToShow.length > 0 ? (
                      dataToShow.map((item, index) => (
                        <tr
                          key={item.kode_obat}
                          className={`border-b transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-blue-50"
                          } hover:bg-blue-100`}
                        >
                          <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                            {index + 1}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                            {item.nama_obat}
                          </td>
                          <td
                            className={`px-2 sm:px-4 md:px-6 py-2 text-center font-semibold ${
                              item.stok === 0 ? "text-red-600" : "text-blue-600"
                            }`}
                          >
                            {item.stok}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 text-center font-semibold text-green-700">
                            {formatRupiah(item.harga_satuan)}
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

              {!showAll && dataStok.length > 5 && (
                <div className="text-center py-2 border-t bg-white rounded-b-lg">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-4 py-2 mt-3 text-xs sm:text-sm bg-[#33A7DC] text-white rounded-md hover:bg-[#5BA5C7]"
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

export default StokObatModal;

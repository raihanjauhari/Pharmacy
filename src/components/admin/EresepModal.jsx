import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const EresepModal = ({ isOpen, onClose }) => {
  const [eresepData, setEreseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Prioritas status untuk sorting
  const statusPriority = {
    "Menunggu Pembayaran": 4,
    "Sudah Bayar": 3,
    Diproses: 2,
    Selesai: 1,
  };

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false);
      setEreseData([]);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [eresepRes, pasienRes, dokterRes, dilayaniRes] =
          await Promise.all([
            fetch("http://127.0.0.1:3000/api/eresep"),
            fetch("http://127.0.0.1:3000/api/pasien"),
            fetch("http://127.0.0.1:3000/api/dokter"),
            fetch("http://127.0.0.1:3000/api/dilayani"),
          ]);

        if (!eresepRes.ok) throw new Error("Gagal mengambil data e-resep");
        if (!pasienRes.ok) throw new Error("Gagal mengambil data pasien");
        if (!dokterRes.ok) throw new Error("Gagal mengambil data dokter");
        if (!dilayaniRes.ok) throw new Error("Gagal mengambil data dilayani");

        const eresep = await eresepRes.json();
        const pasien = await pasienRes.json();
        const dokter = await dokterRes.json();
        const dilayani = await dilayaniRes.json();

        // Map lookup cepat
        const pasienMap = new Map(
          pasien.map((p) => [p.id_pendaftaran, p.nama_pasien])
        );
        const dokterMap = new Map(
          dokter.map((d) => [d.id_dokter, d.nama_dokter])
        );
        const dilayaniMap = new Map(
          dilayani.map((d) => [d.id_pendaftaran, d.id_dokter])
        );

        // Gabungkan data
        const combinedData = eresep.map((e) => {
          const nama_pasien = pasienMap.get(e.id_pendaftaran) || "-";
          const id_dokter_dilayani = dilayaniMap.get(e.id_pendaftaran);
          const nama_dokter = dokterMap.get(id_dokter_dilayani) || "-";

          return {
            id: e.id_eresep,
            pasien: nama_pasien,
            dokter: nama_dokter,
            status: e.status,
          };
        });

        setEreseData(combinedData);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  // Sorting berdasarkan prioritas status
  const sortedData = [...eresepData].sort(
    (a, b) => (statusPriority[b.status] || 0) - statusPriority[a.status]
  );

  // Data yang ditampilkan (5 atau semua)
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
                Detail E-Resep Masuk
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
                      <thead className="bg-[#E3C731] text-white text-[10px] sm:text-xs uppercase">
                        <tr>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Id
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Pasien
                          </th>
                          <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-center">
                            Dokter
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
                              key={item.id}
                              className={`border-b transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                              } hover:bg-yellow-100`}
                            >
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.id}
                              </td>
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.pasien}
                              </td>
                              <td className="px-2 sm:px-4 md:px-6 py-2 text-center">
                                {item.dokter}
                              </td>
                              <td
                                className={`px-2 sm:px-4 md:px-6 py-2 font-semibold text-center ${
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
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-6 text-gray-500 text-xs sm:text-sm"
                            >
                              Tidak ada data e-resep.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {!showAll && eresepData.length > 5 && (
                    <div className="text-center py-2 border-t bg-white rounded-b-lg">
                      <button
                        onClick={() => setShowAll(true)}
                        className="px-4 py-2 mt-3 text-xs sm:text-sm bg-[#E3C731] text-white rounded-md hover:bg-[#C6B662]"
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

export default EresepModal;

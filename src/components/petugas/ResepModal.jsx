import React, { useEffect, useRef, useState } from "react";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

const ResepModal = ({ resep, onClose }) => {
  const modalRef = useRef();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setShowContent(true); // animasi masuk
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setShowContent(false); // animasi keluar
    setTimeout(() => {
      onClose(); // tunggu animasi selesai
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const jumlah = parseInt(resep.jumlahObat || "0");
  const hargaSatuan =
    Number(resep.hargaObat.replace(/\./g, "").replace(",", "")) || 0;
  const totalHarga = jumlah * hargaSatuan;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-[#557187]">Detail E-Resep</h2>

        {/* Informasi Pasien */}
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Nama Pasien:</span>{" "}
            {resep.namaPasien}
          </div>
          <div>
            <span className="font-semibold">ID Resep:</span> {resep.idResep}
          </div>
          <div>
            <span className="font-semibold">Umur:</span> {resep.umur}
          </div>
          <div>
            <span className="font-semibold">Berat Badan:</span>{" "}
            {resep.beratBadan}
          </div>
          <div>
            <span className="font-semibold">Poli:</span> {resep.poli}
          </div>
          <div>
            <span className="font-semibold">Tanggal Resep:</span>{" "}
            {resep.tanggalResep}
          </div>
          <div>
            <span className="font-semibold">Dokter:</span> {resep.namaDokter}
          </div>
        </div>

        {/* Diagnosa */}
        <div className="bg-gray-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600">Diagnosa:</p>
          <p className="text-base text-gray-800">{resep.Diagnosa}</p>
        </div>

        {/* Tabel Obat */}
        <div className="border border-gray-300 rounded overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#557187] text-white">
              <tr>
                <th className="p-3 font-semibold border-r border-gray-300">
                  Nama Obat
                </th>
                <th className="p-3 font-semibold border-r border-gray-300">
                  Aturan Pakai
                </th>
                <th className="p-3 font-semibold border-r border-gray-300">
                  Kuantitas
                </th>
                <th className="p-3 font-semibold">Harga Satuan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="p-3 border-r border-gray-200">
                  {resep.namaObat}
                </td>
                <td className="p-3 border-r border-gray-200">
                  {resep.aturanPakai}
                </td>
                <td className="p-3 border-r border-gray-200">{jumlah}</td>
                <td className="p-3">{formatRupiah(hargaSatuan)}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td
                  colSpan={4}
                  className="p-3 text-sm text-gray-600 bg-gray-50"
                >
                  <strong>Catatan:</strong> {resep.keterangan || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Harga */}
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <div className="bg-[#557187] text-white font-semibold text-center px-6 py-3 w-1/2">
            Total Harga
          </div>
          <div className="text-gray-800 font-bold text-center px-6 py-3 w-1/2 text-lg">
            {formatRupiah(totalHarga)}
          </div>
        </div>

        {/* Tombol Selesai */}
        <div className="text-right">
          <button
            onClick={handleClose}
            className="bg-[#557187] hover:bg-[#2A4D69] text-white px-6 py-2 rounded-lg transition w-40"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResepModal;

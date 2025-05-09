import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.svg";
import Banner from "../../assets/banner.jpg";
import Background from "../../assets/Background.jpg";
import { Link, useNavigate } from "react-router-dom";

const VerifikasiKode = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  // Fungsi handle input angka OTP
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // hanya angka

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah ke input selanjutnya jika ada input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Fungsi backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Submit OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const kode = otp.join("");
    if (kode !== "123456") {
      setErrorMessage("Kode verifikasi salah.");
    } else {
      setErrorMessage("");
      navigate("/buat-password-baru"); // ⬅️ Tambahkan ini
    }
  };

  // Hapus error kalau klik di luar form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setErrorMessage("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSubmitDisabled = otp.some((digit) => digit === "");

  const navigate = useNavigate();

  return (
    <div
      className="grid place-content-center min-h-screen px-4 py-5 md:px-8 md:py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container bg-white rounded-[20px] max-w-[1200px] w-full max-h-[1000px] md:grid md:grid-cols-2">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex flex-col items-center justify-center gap-6 py-10"
        >
          {/* Logo */}
          <div className="flex items-end gap-[0px] mb-7">
            <img src={Logo} alt="logo" className="-ml-5" />
            <h2 className="font-bold text-3xl text-[#1D242E]">Pharmacy</h2>
          </div>
          {/* Header Form - Judul dan deskripsi form */}
          <h2 className="text-3xl font-bold text-[#2A4D69] text-center">
            Periksa Email Kamu
          </h2>
          <p className="text-[#000000] px-16 pt-1 -mt-3 text-center">
            Kami Mengirim link reset ke Email kamu Masukkan 6 digit kode yang
            ada di Email kamu
          </p>
          {/* Email Input */}
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1"
                className="w-14 h-14 text-center text-2xl font-extrabold text-[#000000] bg-[#FFFFFF] border-3 border-[#2A4D69] hover:border-[#E3EBF3] appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            ))}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {/* Tombol Submit */}
          <button
            type="submit"
            className={`bg-[#2A4D69] text-white py-3 rounded-xl font-medium mt-10 transition-colors hover:bg-[#2A4D69]/90 duration-200 w-full max-w-xs  ${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#2A4D69]/90"
            }`}
          >
            Kirim
          </button>
          {/* Link untuk lupa password */}
          <p className="text-center text-[#000000]">
            Kembali ke halaman{" "}
            <Link to={"/"} className="text-[#2A4D69] hover:underline">
              Login
            </Link>
          </p>
        </form>

        {/* Banner Gambar di sebelah kanan (untuk tampilan layar lebih besar) */}
        <div className="hidden md:block relative bg-[#2A4D69] rounded-lg">
          <img
            src={Banner}
            alt="form banner"
            width={720}
            height={720}
            className="h-full object-cover rounded-lg"
          />
          <div className="absolute top-1/2 left-0 mx-10 bg-[rgba(42,77,105,0.6)] backdrop-blur-[30px] px-10 py-[60px] text-white -translate-y-1/2 rounded-tl-[50px] rounded-br-[50px]">
            <h2 className="mb-5 text-3xl font-semibold text-[#E3EBF3]">
              Verifikasi Email
            </h2>
            <p className="font-[#E3EBF3] text-justify">
              Tenang, kami bantu Anda memulihkannya. Silakan masukkan email Anda
              untuk menerima tautan reset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiKode;

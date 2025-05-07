import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.svg";
import Google from "../assets/google-logo.svg";
import Facebook from "../assets/facebook-logo.svg";
import Apple from "../assets/apple-logo.svg";
import Banner from "../assets/banner.jpg";
import Background from "../assets/Background.jpg";
import { Link, useNavigate } from "react-router-dom";

const LupaPassword = () => {
  // State untuk menangani login sukses atau tidak
  const [loginSuccess, setLoginSuccess] = useState(false);

  // State untuk menyimpan data form (email dan password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State untuk menyimpan error pada email dan password
  const [emailError, setEmailError] = useState("");

  // State untuk menyimpan error message global
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message global

  // Ref untuk form agar bisa memonitor klik di luar form
  const formRef = useRef(null);

  // Menangani perubahan input (email dan password)
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    // Reset error saat pengguna mulai mengetik
    if (emailError) setEmailError("");
    if (passwordError) setPasswordError("");

    setFormData({
      ...formData,
      [name]: value,
    });

    // Walidasi Email
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Email tidak valid.");
    }

    // Validasi Password
    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password harus memiliki minimal 6 karakter.");
      } else if (!/\d/.test(value)) {
        setPasswordError("Password harus mengandung angka.");
      } else if (!/[A-Z]/.test(value)) {
        setPasswordError("Password harus mengandung huruf kapital.");
      }
    }
  };

  // Menangani Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== "Admin123") {
      setPasswordError("Password salah. Silakan coba lagi.");
      setLoginSuccess(false);
      return;
    }

    setLoginSuccess(true);
    setErrorMessage(""); // Reset error message
  };

  // Menangani klik di luar form untuk menghapus error message
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setErrorMessage(""); // Hapus error saat klik di luar form
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className="grid place-content-center min-h-screen px-4 py-5 md:px-8 md:py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container bg-white rounded-[20px] max-w-[1200px] w-full max-h-[1000px] md:grid md:grid-cols-2">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-[460px] w-full mx-auto grid gap-4 place-content-center p-6 md:p-12"
        >
          {/* Menampilkan pesan jika login sukses */}
          {loginSuccess && (
            <p className="text-green-700 bg-green-100 mb-4 p-3 text-center">
              Logged in successfully!
            </p>
          )}

          {/* Menampilkan pesan error global */}
          {errorMessage && (
            <p className="text-red-700 bg-red-100 mb-4 p-3 text-center">
              {errorMessage}
            </p>
          )}

          {/* Logo */}
          <div className="flex items-end gap-[0px] mb-7">
            <img src={Logo} alt="logo" className="ml-16" />
            <h2 className="font-bold text-3xl text-[#1D242E]">Pharmacy</h2>
          </div>

          {/* Header Form - Judul dan deskripsi form */}
          <h2 className="text-4xl font-bold text-[#2A4D69] ml-30">LOGIN</h2>
          <p className="text-[#1D242E] pb-4 pt-1 -mt-3 text-center">
            Masukkan e-mail yang terdaftar. Kami akan mengirimkan pesan untuk
            atur ulang password Anda.
          </p>

          {/* Email Input */}
          <div className="mb-[28px]">
            <label className="mb-1 block font-medium text-[#2A4D69]">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleInputChanges}
              required
              className="border px-4 py-3 rounded-md focus:ring-2 focus:ring-[#2A4D69]"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          {/* Tombol Submit */}
          <button
            onClick={() => navigate("/verifikasi-kode")}
            type="submit"
            className="bg-[#2A4D69] text-white py-3 rounded-xl font-medium transition-colors hover:bg-[#2A4D69]/90 duration-200"
          >
            Kirim
          </button>

          {/* Link untuk lupa password */}
          <p className="text-center text-gray-600">
            Kembali ke halaman{" "}
            <Link to={"/"} className="text-[#2A4D69] hover:underline">
              Login
            </Link>
          </p>

          {/* Pembatas (Divider) */}
          <div className="flex items-center gap-4 mt-6">
            <span className="w-full bg-gray-300 h-[1px]"></span>
            <p>Or</p>
            <span className="w-full bg-gray-300 h-[1px]"></span>
          </div>

          {/* Tombol login dengan akun sosial */}
          <div className="flex justify-center items-center gap-5 mt-6">
            <button type="button">
              <img
                src={Google}
                alt="Sign in with Google"
                width={32}
                height={32}
              />
            </button>
            <button type="button">
              <img
                src={Apple}
                alt="Sign in with Apple"
                width={32}
                height={32}
              />
            </button>
            <button type="button">
              <img
                src={Facebook}
                alt="Sign in with Facebook"
                width={32}
                height={32}
              />
            </button>
          </div>
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
              Lupa Kata Sandi?
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

export default LupaPassword;

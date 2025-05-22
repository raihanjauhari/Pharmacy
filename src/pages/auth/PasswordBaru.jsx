import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.svg";
import Banner from "../../assets/banner.jpg";
import Background from "../../assets/Background.jpg";
import { Eye, EyeOff } from "lucide-react";
import SuccessIcon from "../../assets/accepted.png"; // Centang hijau
import { useNavigate } from "react-router-dom";
import "../../components/PasswordBaru.css";

const PasswordBaru = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Untuk menampilkan modal sukses

  const formRef = useRef(null);
  const navigate = useNavigate(); // Gunakan untuk navigasi setelah berhasil

  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password harus minimal 6 karakter.";
    }
    if (!/\d/.test(password)) {
      return "Password harus mengandung angka.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password harus mengandung huruf kapital.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Konfirmasi password tidak cocok.");
      return;
    }

    // Menampilkan modal sukses setelah validasi berhasil
    setShowSuccessModal(true);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleClick = () => {
    setShowSuccessModal(false); // Sembunyikan modal
    navigate("/"); // Arahkan ke halaman login
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setPasswordError("");
        setConfirmPasswordError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="grid place-content-center min-h-screen px-4 py-5 md:px-8 md:py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container bg-white rounded-[20px] max-w-[1200px] w-full md:grid md:grid-cols-2">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-[460px] w-full mx-auto grid gap-4 place-content-center p-6 md:p-12"
        >
          <div className="flex items-end gap-[0px] mb-7">
            <img src={Logo} alt="logo" className="ml-16" />
            <h2 className="font-bold text-3xl text-[#1D242E]">Pharmacy</h2>
          </div>

          <h2 className="text-3xl font-bold text-[#2A4D69] text-center">
            Buat Password Baru
          </h2>
          <p className="text-[#000000] px-6 pt-1 -mt-3 text-center mb-3">
            Buat Password yang berbeda dari sebelumnya untuk keamanan akun Anda
          </p>

          {/* Password */}
          <div className="mb-[28px]">
            <label className="mb-1 block font-medium text-[#2A4D69]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleInputChanges}
                required
                className={`border px-4 py-3 rounded-md focus:ring-2 w-full ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#2A4D69]"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#2A4D69]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div className="mb-[28px]">
            <label className="mb-1 block font-medium text-[#2A4D69]">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                value={formData.confirmPassword}
                onChange={handleInputChanges}
                required
                className={`border px-4 py-3 rounded-md focus:ring-2 w-full ${
                  confirmPasswordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#2A4D69]"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#2A4D69]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#2A4D69]/90 text-white py-3 rounded-xl font-medium transition-colors hover:bg-[#2A4D69] duration-200"
          >
            Ubah Password
          </button>
        </form>

        {/* Banner */}
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
              Buat Kata Sandi Baru
            </h2>
            <p className="font-[#E3EBF3] text-justify">
              Silakan buat kata sandi baru untuk melindungi akun Anda. Pastikan
              kata sandi kuat dan mudah Anda ingat agar akses ke sistem tetap
              aman.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Berhasil */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-background fixed inset-0 bg-black bg-opacity-50 transition-all duration-300" />
          <div className="bg-white rounded-[20px] p-8 w-full max-w-md shadow-lg text-center modal">
            <h2 className="text-3xl font-bold text-[#2A4D69] mb-3">BERHASIL</h2>
            <img
              src={SuccessIcon}
              alt="Berhasil"
              className="mx-auto mb-4 w-40 h-40"
            />
            <p className="text-[#000000] mb-6">
              Selamat! Password Anda berhasil dibuat. Klik "Lanjutkan" untuk
              login.
            </p>
            <button
              onClick={handleClick}
              className="w-full bg-[#2A4D69] text-white py-3 rounded-xl font-medium transition-colors hover:bg-[#2A4D69]/90 duration-200"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordBaru;

import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.svg";
import Google from "../assets/google-logo.svg";
import Facebook from "../assets/facebook-logo.svg";
import Apple from "../assets/apple-logo.svg";
import Banner from "../assets/banner.jpg";
import Background from "../assets/Background.jpg";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  // State untuk menangani login sukses atau tidak
  const [loginSuccess, setLoginSuccess] = useState(false);

  // State untuk mengontrol visibilitas password
  const [showPassword, setShowPassword] = useState("");

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

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(""); // "admin" atau "petugas"

  // Menangani perubahan input (email dan password)
  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(
        value === ""
          ? ""
          : !/\S+@\S+\.\S+/.test(value)
          ? "Email tidak valid."
          : ""
      );
    }

    if (name === "password") {
      let error = "";
      if (value.length < 6)
        error = "Password harus memiliki minimal 6 karakter.";
      else if (!/\d/.test(value)) error = "Password harus mengandung angka.";
      else if (!/[A-Z]/.test(value))
        error = "Password harus mengandung huruf kapital.";
      setPasswordError(error);
    }
  };

  // Menangani Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;

      // Backend sudah validasi password, jadi jika response sukses berarti login berhasil
      setUserRole(user.role);
      setLoginSuccess(true);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/dashboard-admin");
      } else if (user.role === "petugas") {
        navigate("/dashboard-petugas");
      }
    } catch (error) {
      if (error.response) {
        // error dari backend
        setErrorMessage(error.response.data.error || "Login gagal.");
      } else {
        setErrorMessage("Terjadi kesalahan saat menghubungi server.");
      }
      setLoginSuccess(false);
    }
  };

  // Menangani klik di luar form untuk menghapus error message
  useEffect(() => {
    if (loginSuccess && userRole) {
      const timeout = setTimeout(() => {
        if (userRole === "admin") {
          navigate("/dashboard-admin");
        } else if (userRole === "petugas") {
          navigate("/dashboard-petugas");
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [loginSuccess, userRole, navigate]);

  useEffect(() => {
    console.log("Login Success:", loginSuccess);
    console.log("User Role:", userRole);
  }, [loginSuccess, userRole]);

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
            <p className="text-green-700 bg-green-100 mb-4 p-3 text-center rounded-md">
              Login Berhasil!
            </p>
          )}

          {/* Menampilkan pesan error global */}
          {errorMessage && (
            <p className="text-red-700 bg-red-100 mb-4 p-3 text-center rounded-md">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-center items-end gap-[5px] mb-7">
            <img src={Logo} alt="logo" className="" />
            <h2 className="font-bold text-3xl text-[#1D242E]">Pharmacy</h2>
          </div>

          {/* Header Form - Judul dan deskripsi form */}
          <h2 className="text-4xl font-bold text-[#2A4D69] text-center mb-7">
            LOGIN
          </h2>
          <p className="text-[#000000] pb-4 pt-1 -mt-3 text-center">
            Masuk untuk mengelola sistem dan operasional apotek.
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

          {/* Password Input */}
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
                className={`border px-4 py-3 rounded-md focus:ring-2 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#2A4D69]"
                }`}
              />
              {/* Tombol untuk mengubah visibilitas password */}
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#2A4D69]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-[#2A4D69]/90 text-white py-3 rounded-xl font-medium transition-colors hover:bg-[#2A4D69] duration-200"
          >
            Login
          </button>

          {/* Link untuk lupa password */}
          <p className="text-center text-[#000000]">
            Lupa password?{" "}
            <Link
              to={"/lupa-password"}
              className="text-[#2A4D69] hover:underline"
            >
              Klik disini
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
              Selamat Datang Kembali!
            </h2>
            <p className="font-[#E3EBF3] text-justify">
              Akses dashboard Anda untuk mengelola stok obat, resep pasien, dan
              data layanan. Sistem siap membantu aktivitas Anda hari ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

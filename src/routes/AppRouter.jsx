// AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login.jsx"
import LupaPassword from "../pages/LupaPassword.jsx"
import VerifyCode from "../pages/VerifikasiKode.jsx"
import PasswordBaru from "../pages/PasswordBaru.jsx"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/verifikasi-kode" element={<VerifyCode />} />
        <Route path="/buat-password-baru" element={<PasswordBaru />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

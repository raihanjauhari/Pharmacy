// AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import LupaPassword from "../pages/LupaPassword.jsx";
import VerifyCode from "../pages/VerifikasiKode.jsx";
import PasswordBaru from "../pages/PasswordBaru.jsx";
import PasswordBerhasil from "../components/PasswordBerhasil.jsx";
import DashboardPetugas from "../pages/petugas/Dashboard.jsx";
import DashboardAdmin from "../pages/admin/Dashboard.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/verifikasi-kode" element={<VerifyCode />} />
        <Route path="/buat-password-baru" element={<PasswordBaru />} />
        <Route path="/ubah-password-berhasil" element={<PasswordBerhasil />} />
        <Route path="/dashboard-petugas" element={<DashboardPetugas />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

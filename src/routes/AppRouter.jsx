// AppRouter.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Import Auth Login
import Login from "../pages/auth/Login.jsx";
import LupaPassword from "../pages/auth/LupaPassword.jsx";
import VerifyCode from "../pages/auth/VerifikasiKode.jsx";
import PasswordBaru from "../pages/auth/PasswordBaru.jsx";
import PasswordBerhasil from "../components/PasswordBerhasil.jsx";

// Import untuk Petugas
import DashboardPetugas from "../pages/petugas/Dashboard.jsx";
import LayoutPetugas from "../components/petugas/Layout.jsx";
import EResepPetugas from "../pages/petugas/EResep.jsx";
import ObatPetugas from "../pages/petugas/Obat.jsx";

// Import untuk Admin
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

        <Route path="/dashboard-petugas" element={<LayoutPetugas />}>
          <Route index element={<DashboardPetugas />} />
          <Route path="e-resep" element={<EResepPetugas />} />
          <Route path="obat" element={<ObatPetugas />} />
        </Route>
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

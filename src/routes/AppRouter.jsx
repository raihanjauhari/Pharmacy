import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login.jsx";
import LupaPassword from "../pages/auth/LupaPassword.jsx";
import VerifyCode from "../pages/auth/VerifikasiKode.jsx";
import PasswordBaru from "../pages/auth/PasswordBaru.jsx";
import PasswordBerhasil from "../components/PasswordBerhasil.jsx";

// Petugas
import DashboardPetugas from "../pages/petugas/Dashboard.jsx";
import LayoutPetugas from "../components/petugas/Layout.jsx";
import EResepPetugas from "../pages/petugas/EResep.jsx";
import ObatPetugas from "../pages/petugas/Obat.jsx";

// Admin
import DashboardAdmin from "../pages/admin/Dashboard.jsx";
import LayoutAdmin from "../components/admin/Layout.jsx";
import EResepAdmin from "../pages/admin/EResep.jsx";
import ObatAdmin from "../pages/admin/Obat.jsx";

// Not Found
import NotFoundPage from "../NotFoundPage.jsx";

// Auth Guard
import RequireAuth from "../components/RequireAuth.jsx";

const AppRouter = () => {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect berdasarkan role */}
        <Route
          path="/"
          element={
            role === "admin" ? (
              <Navigate to="/dashboard-admin" />
            ) : role === "petugas" ? (
              <Navigate to="/dashboard-petugas" />
            ) : (
              <Login />
            )
          }
        />

        {/* Auth */}
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/verifikasi-kode" element={<VerifyCode />} />
        <Route path="/buat-password-baru" element={<PasswordBaru />} />
        <Route path="/ubah-password-berhasil" element={<PasswordBerhasil />} />

        {/* PETUGAS ROUTES */}
        <Route element={<RequireAuth allowedRoles={["petugas"]} />}>
          <Route path="/dashboard-petugas" element={<LayoutPetugas />}>
            <Route index element={<DashboardPetugas />} />
            <Route path="e-resep" element={<EResepPetugas />} />
            <Route path="obat" element={<ObatPetugas />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/dashboard-admin" element={<LayoutAdmin />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="e-resep" element={<EResepAdmin />} />
            <Route path="obat" element={<ObatAdmin />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

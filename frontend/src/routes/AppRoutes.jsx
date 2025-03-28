import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Halaman Umum
import Home from "../pages/Home";
import ProfilDesa from "../pages/ProfilDesa";
import Infografis from "../pages/Infografis";
import Login from "../pages/Login";
import Reset from "../pages/ResetPassword";
import Pelayanan from "../pages/Pelayanan";
import Media from "../pages/Media";
import Arsip from "../pages/Arsip";
import Information from "../pages/Information";
import BeritaDetail from "../pages/BeritaDetail";
import Map from "../pages/Map";

// Admin Layout (Parent Admin)
import DashboardAdmin from "../pages/admin/DashboardAdmin";

// Halaman Admin (Children Pages)
import BerandaAdmin from "../pages/admin/pages/BerandaAdmin";
import BeritaAdmin from "../pages/admin/pages/BeritaAdmin";
import PengumumanAdmin from "../pages/admin/pages/PengumumanAdmin";
import InfografisAdmin from "../pages/admin/pages/InfografisAdmin";
import MediaAdmin from "../pages/admin/pages/MediaAdmin";
import SuratAdmin from "../pages/admin/pages/SuratAdmin";
import PelayananAdmin from "../pages/admin/pages/PelayananAdmin";
import SettingAdmin from "../pages/admin/pages/SettingAdmin";
import LogoutAdmin from "../pages/admin/pages/LogoutAdmin";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        {process.env.NODE_ENV === "development"}
        <Routes>
          {/* ===================== HALAMAN UMUM ===================== */}
          <Route path="/" element={<Home />} />
          <Route path="/ProfilDesa" element={<ProfilDesa />} />
          <Route path="/Infografis" element={<Infografis />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ResetPassword" element={<Reset />} />
          <Route path="/Pelayanan" element={<Pelayanan />} />
          <Route path="/Media" element={<Media />} />
          <Route path="/Arsip" element={<Arsip />} />
          <Route path="/Information" element={<Information />} />
          <Route path="/berita-detail/:id" element={<BeritaDetail />} />
          <Route path="/Map" element={<Map />} />

          {/* ===================== HALAMAN ADMIN DENGAN LAYOUT ===================== */}
          {/* Redirect /admin to /admin/beranda */}

          {/* Protect the entire admin section */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          >
            <Route path="beranda" element={<BerandaAdmin />} />
            <Route path="berita" element={<BeritaAdmin />} />
            <Route path="pengumuman" element={<PengumumanAdmin />} />
            <Route path="infografis" element={<InfografisAdmin />} />
            <Route path="media" element={<MediaAdmin />} />
            <Route path="surat" element={<SuratAdmin />} />
            <Route path="pelayanan" element={<PelayananAdmin />} />
            <Route path="setting" element={<SettingAdmin />} />
          </Route>

          {/* Separate route for logout */}
          <Route
            path="/admin/logout"
            element={
              <ProtectedRoute>
                <LogoutAdmin />
              </ProtectedRoute>
            }
          />

          {/* ===================== HALAMAN NOT FOUND ===================== */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;

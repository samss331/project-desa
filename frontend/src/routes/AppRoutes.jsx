import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Admin pages
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import BeritaAdmin from "../pages/admin/pages/BeritaAdmin";
import MediaAdmin from "../pages/admin/pages/MediaAdmin";
import InfografisAdmin from "../pages/admin/pages/InfografisAdmin";
import PelayananAdmin from "../pages/admin/pages/PelayananAdmin";
import PengumumanAdmin from "../pages/admin/pages/PengumumanAdmin";
import SuratAdmin from "../pages/admin/pages/SuratAdmin";
import SettingAdmin from "../pages/admin/pages/SettingAdmin";
import LogoutAdmin from "../pages/admin/pages/LogoutAdmin";

// Public pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Article from "../pages/Article";
import BeritaDetail from "../pages/BeritaDetail";
import Information from "../pages/Information";
import Infografis from "../pages/Infografis";
import Media from "../pages/Media";
import Pelayanan from "../pages/Pelayanan";
import ProfilDesa from "../pages/ProfilDesa";
import Map from "../pages/Map";
import Arsip from "../pages/Arsip";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article" element={<Article />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/information" element={<Information />} />
          <Route path="/infografis" element={<Infografis />} />
          <Route path="/media" element={<Media />} />
          <Route path="/pelayanan" element={<Pelayanan />} />
          <Route path="/profil-desa" element={<ProfilDesa />} />
          <Route path="/map" element={<Map />} />
          <Route path="/arsip" element={<Arsip />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/berita"
            element={
              <ProtectedRoute>
                <BeritaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute>
                <MediaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/infografis"
            element={
              <ProtectedRoute>
                <InfografisAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pelayanan"
            element={
              <ProtectedRoute>
                <PelayananAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengumuman"
            element={
              <ProtectedRoute>
                <PengumumanAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/surat"
            element={
              <ProtectedRoute>
                <SuratAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/setting"
            element={
              <ProtectedRoute>
                <SettingAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/logout"
            element={
              <ProtectedRoute>
                <LogoutAdmin />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

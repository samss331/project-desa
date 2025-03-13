// src/pages/admin/DashboardAdmin.jsx
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../admin/components/SidebarAdmin";

export default function DashboardAdmin() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="flex-1 p-4">
        <Outlet /> {/* Tempat load BeritaAdmin, PengumumanAdmin, dll */}
      </main>
    </div>
  );
}

import { NavLink } from "react-router-dom";

export default function SidebarAdmin() {
  const linkClass =
    "block py-2 px-4 rounded hover:bg-gray-700 transition duration-200";
  const activeClass = "bg-gray-700";

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/berita"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Berita
          </NavLink>
          <NavLink
            to="/admin/pengumuman"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Pengumuman
          </NavLink>
          <NavLink
            to="/admin/infografis"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Infografis
          </NavLink>
          <NavLink
            to="/admin/media"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Media
          </NavLink>
          <NavLink
            to="/admin/surat"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Surat
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

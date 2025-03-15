import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaBullhorn,
  FaChartPie,
  FaPhotoVideo,
  FaEnvelope,
} from "react-icons/fa";

export default function SidebarAdmin() {
  const linkClass =
    "flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200";
  const activeClass = "bg-gray-200 text-gray-800 font-semibold shadow-inner";

  return (
    <div className="p-4">
      <aside className="w-64 min-h-[calc(100vh-2rem)] bg-gray-100 text-gray-700 rounded-[2.5rem] shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaHome className="text-lg" /> <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/berita"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaNewspaper className="text-lg" /> <span>Berita</span>
          </NavLink>
          <NavLink
            to="/admin/pengumuman"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaBullhorn className="text-lg" /> <span>Pengumuman</span>
          </NavLink>
          <NavLink
            to="/admin/infografis"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaChartPie className="text-lg" /> <span>Infografis</span>
          </NavLink>
          <NavLink
            to="/admin/media"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaPhotoVideo className="text-lg" /> <span>Media</span>
          </NavLink>
          <NavLink
            to="/admin/surat"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : "hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            <FaEnvelope className="text-lg" /> <span>Surat</span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

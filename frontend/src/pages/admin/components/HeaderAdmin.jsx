"use client";

import { useState } from "react";
import { FaBell, FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutAdminDialog from "./LogoutAdminDialog";

export default function HeaderAdmin() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate("/admin/setting");
    setShowDropdown(false);
  };

  return (
    <header className="w-full bg-white rounded-2xl shadow-md px-6 py-4 mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">
          Dashboard Admin
        </h1>

        <div className="relative ml-6 md:ml-10">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent border-none focus:outline-none text-sm w-32 md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          <FaBell size={18} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              A
            </div>
            <span className="text-gray-700 font-medium hidden md:block">
              Admin
            </span>
            <span className="text-gray-400 text-xs hidden md:block">
              Administrator
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-100">
              <button
                onClick={navigateToSettings}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <FaCog className="text-gray-500" />
                <span>Pengaturan</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => {
                  setShowLogoutDialog(true);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
              >
                <FaSignOutAlt className="text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <LogoutAdminDialog onClose={() => setShowLogoutDialog(false)} />
      )}
    </header>
  );
}

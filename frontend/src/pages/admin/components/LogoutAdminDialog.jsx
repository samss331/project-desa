"use client";

import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutAdminDialog = ({ onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Simulate logout process
    setTimeout(() => {
      // In a real app, you would redirect to login page or clear auth state
      window.location.href = "/";
      setIsLoggingOut(false);
      if (onClose) onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">Konfirmasi Logout</h3>
          <p className="text-gray-600 text-sm">
            Apakah Anda yakin ingin keluar dari dashboard admin?
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {isLoggingOut ? (
              "Proses..."
            ) : (
              <>
                <FaSignOutAlt />
                <span>Ya, Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAdminDialog;

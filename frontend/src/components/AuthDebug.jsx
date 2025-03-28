"use client";

import { useAuth } from "../context/AuthContext";

export default function AuthDebug() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Get token from localStorage
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-300 max-w-md z-50">
      <h3 className="font-bold text-lg mb-2">Auth Debug</h3>
      <div className="text-sm space-y-1">
        <p>
          <strong>Context isAuthenticated:</strong>{" "}
          {isAuthenticated ? "true" : "false"}
        </p>
        <p>
          <strong>Token exists:</strong> {token ? "true" : "false"}
        </p>
        <p>
          <strong>isLoading:</strong> {isLoading ? "true" : "false"}
        </p>
        <p>
          <strong>Token:</strong>{" "}
          {token ? token.substring(0, 15) + "..." : "null"}
        </p>
        <p>
          <strong>Context User:</strong> {user ? JSON.stringify(user) : "null"}
        </p>
        <p>
          <strong>localStorage userEmail:</strong> {userEmail || "null"}
        </p>
      </div>
    </div>
  );
}

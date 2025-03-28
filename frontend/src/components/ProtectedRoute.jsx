"use client";

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoading } = useAuth();
  const location = useLocation();

  // Direct check for token in localStorage
  const token = localStorage.getItem("token");

  // If still checking auth status, show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with the current path as redirect parameter
  if (!token) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If authenticated, render the children
  return children;
}

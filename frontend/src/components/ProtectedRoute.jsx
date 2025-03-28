"use client";

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // If still checking auth status, show loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login with the current path as redirect parameter
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If authenticated, render the children
  return children;
}

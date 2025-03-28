"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if the user is authenticated on initial load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check authentication status
  const checkAuthStatus = () => {
    setIsLoading(true);

    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

    if (token) {
      setIsAuthenticated(true);
      setUser({ email: userEmail });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setIsLoading(false);
  };

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    user,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

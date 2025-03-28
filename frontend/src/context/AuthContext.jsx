"use client";
import React from "react";
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

    // Get the auth token from cookies
    const cookies = document.cookie.split(";");
    const authTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("authToken=")
    );

    if (authTokenCookie) {
      // If token exists, set authenticated to true
      setIsAuthenticated(true);

      // You could also fetch user data here if needed
      // For now, we'll just set a simple user object
      setUser({ role: "admin" });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setIsLoading(false);
  };

  // Login function
  const login = async (username, password) => {
    try {
      // Call your authentication API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in a cookie
      document.cookie = `authToken=${data.token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`; // 7 days

      // Update auth state
      setIsAuthenticated(true);
      setUser({ role: "admin" }); // Set user data

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    // Remove the auth token cookie
    document.cookie = "authToken=; path=/; max-age=0";

    // Update auth state
    setIsAuthenticated(false);
    setUser(null);
  };

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

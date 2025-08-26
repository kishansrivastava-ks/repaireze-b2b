/* eslint-disable react/prop-types */
// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../api/apiService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial auth check
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      // Assuming the login response doesn't contain user details,
      // we'll store the email used for login.
      const userData = { email: credentials.email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // You can handle error display here, e.g., using a toast notification
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // We don't need an API call for logout if using httpOnly cookies,
    // as the cookie cannot be cleared from the client.
    // The user is effectively "logged out" on the client.
    navigate("/login");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

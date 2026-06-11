import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import api from "../api/axios.js";
import {useOrders} from './OrderContext.jsx'

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  // const { orders, setOrders} = useContext();

  const login = async (email, password) => {
  try {
    const { data } = await api.post("/", {
      email,
      password,
    });

    const user = data.user;

    setUser(user);

    // If backend sends token
    if (data.token) {
      setToken(data.token);
    }
    return {
      success: true
    };
  } catch (err) {
       return {
      success: false,
      error:
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid email or password",
    };
  }
};

const register = async (name, email, password) => {
  try {
    const { data } = await api.post("/login", {
      name,
      email,
      password,
    });
    const user = data.user;
    setUser(user);
    if (data.token) {
      setToken(data.token);
    }
    return {
      success: true,
      user,
    };
  } catch (err) {
    return {
      success: false,
      error:
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed",
    };
  }
};

  const logout = () => {
    setUser(null);
    setToken(null);
    // setOrders(null)
  };

  const updateProfile = async (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("nobella_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const { addToast } = useToast();

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("nobella_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("nobella_user");
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password, name) => {
    const user = {
      name: name || email.split("@")[0].replace(".", " "),
      email,
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      memberSince: "2024"
    };
    setCurrentUser(user);
    closeAuth();
    addToast(`Welcome back, ${user.name}!`, "success");
  };

  const signup = (name, email, phone) => {
    const user = {
      name,
      email,
      phone: phone || "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      memberSince: "2026"
    };
    setCurrentUser(user);
    closeAuth();
    addToast(`Account created successfully! Welcome to Nobella, ${name}.`, "success");
  };

  const logout = () => {
    setCurrentUser(null);
    addToast("Logged out successfully.", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

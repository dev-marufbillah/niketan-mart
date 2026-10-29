"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      try {
        const stored = localStorage.getItem("niketan_user");
        if (stored) setUser(JSON.parse(stored));
      } catch {
        console.error("Error loading user");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("niketan_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("niketan_user");
  };

  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
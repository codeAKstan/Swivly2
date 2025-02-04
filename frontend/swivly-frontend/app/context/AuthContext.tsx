// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found in localStorage, fetching user data...");
      fetchUserData(token);
    } else {
      console.log("No token found in localStorage, user is not authenticated.");
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  const login = (token: string, userData: any) => {
    console.log("Logging in user...");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(userData);
    console.log("User logged in successfully. isAuthenticated:", true);
  };
  

  const logout = () => {
    console.log("Logging out user...");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    console.log("User logged out successfully. isAuthenticated:", false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
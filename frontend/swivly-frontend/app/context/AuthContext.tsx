import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean; // Add loading state
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found in localStorage, setting isAuthenticated to true...");
      setIsAuthenticated(true); // Immediately set isAuthenticated to true
      fetchUserData(token); // Fetch user data asynchronously
    } else {
      console.log("No token found in localStorage, user is not authenticated.");
      setLoading(false); // Set loading to false if no token is found
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
      setUser(data); // Update user data
      console.log("User data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Log out if the token is invalid
    } finally {
      setLoading(false); // Set loading to false after fetching user data
    }
  };

  const login = (token: string, userData: any) => {
    console.log("Logging in user...");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(userData); // Set the user data
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
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
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
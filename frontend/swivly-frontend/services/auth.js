// import api from '../utils/api';

export const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  };

  export const login = async (credentials) => {
    try {
      console.log("Sending login request with credentials:", credentials); // Debugging
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.access); // Store the access token
      return data;
    } catch (error) {
      console.error("Login error:", error); // Debugging
      throw new Error(error.message || "Login failed");
    }
  };
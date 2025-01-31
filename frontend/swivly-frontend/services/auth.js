import api from '../utils/api';

export const register = async (userData) => {
  try {
    const response = await api.post('/register/', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
    try {
      const response = await api.post("/api/login/", credentials);
      const { access } = response.data; // Assuming the token is in the response
      localStorage.setItem("token", access); // Store the token
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };
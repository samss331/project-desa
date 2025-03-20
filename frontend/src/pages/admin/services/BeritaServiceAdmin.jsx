import axios from "axios";

const API_URL = "http://localhost:3000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common response issues
api.interceptors.response.use(
  (response) => {
    // Handle the case where the API returns data in a nested 'data' property
    if (response.data && response.data.data) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    console.error("API Error Response:", error.response || error);

    // If error is 404, return empty array instead of error
    if (error.response && error.response.status === 404) {
      console.warn("Resource not found (404), returning empty array");
      return Promise.resolve({ data: [] });
    }

    return Promise.reject(error);
  }
);

const BeritaServiceAdmin = {
  // GET methods
  getAllBerita: async () => {
    try {
      const response = await api.get("/berita");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching all berita:", error);
      return [];
    }
  },

  getBeritaById: async (id) => {
    try {
      const response = await api.get(`/berita/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching berita with id ${id}:`, error);
      return null;
    }
  },

  // POST method
  addBerita: async (beritaData) => {
    try {
      const response = await api.post("/berita", beritaData);
      return response.data;
    } catch (error) {
      console.error("Error adding berita:", error);
      throw error;
    }
  },

  // PUT method
  updateBerita: async (id, beritaData) => {
    try {
      const response = await api.put(`/berita/${id}`, beritaData);
      return response.data;
    } catch (error) {
      console.error(`Error updating berita with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE method
  deleteBerita: async (id) => {
    try {
      const response = await api.delete(`/berita/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting berita with id ${id}:`, error);
      throw error;
    }
  },
};

export default BeritaServiceAdmin;

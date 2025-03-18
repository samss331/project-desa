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

const MediaService = {
  // GET methods
  getAllMedia: async () => {
    try {
      const response = await api.get("/media");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching all media:", error);
      return [];
    }
  },

  getMediaById: async (id) => {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching media with id ${id}:`, error);
      return null;
    }
  },

  // POST method
  addMedia: async (formData) => {
    try {
      const response = await api.post("/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding media:", error);
      throw error;
    }
  },

  // PUT method
  updateMedia: async (id, formData) => {
    try {
      const response = await api.put(`/media/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating media with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE method
  deleteMedia: async (id) => {
    try {
      const response = await api.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting media with id ${id}:`, error);
      throw error;
    }
  },

  // File URL helper
  getFileUrl: (url) => {
    if (!url) return null;

    // Jika URL sudah lengkap (eksternal), gunakan apa adanya
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Jika URL relatif, tambahkan base URL
    return `${API_URL}${url}`;
  },
};

export default MediaService;

import axios from "axios";

const API_URL = "http://localhost:3000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

const BeritaService = {
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

  // Get latest berita (for featured slider)
  getLatestBerita: async (limit = 5) => {
    try {
      const allBerita = await BeritaService.getAllBerita();

      // Sort by date (newest first) and take the specified limit
      return allBerita
        .sort((a, b) => new Date(b.tanggalTerbit) - new Date(a.tanggalTerbit))
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching latest berita:", error);
      return [];
    }
  },

  // Format date to a readable format
  formatDate: (dateString) => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      return date
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      return dateString;
    }
  },

  // Get excerpt from content
  getExcerpt: (content, maxLength = 100) => {
    if (!content) return "";

    if (content.length <= maxLength) return content;

    return content.substring(0, maxLength) + "...";
  },
};

export default BeritaService;

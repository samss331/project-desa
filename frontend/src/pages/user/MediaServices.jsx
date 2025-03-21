import axios from "axios";

const API_URL = "http://localhost:3000"; // Sesuaikan dengan URL API Anda

// Buat axios instance dengan default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const MediaServiceUser = {
  // Hanya method yang diizinkan untuk user
  getAllMedia: async () => {
    try {
      const response = await api.get("/media");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching media:", error);
      return [];
    }
  },

  getMediaById: async (id) => {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching media with id ${id}:`, error);
      return null;
    }
  },

  // Get media URL
  getMediaUrl: (filename) => {
    if (!filename) return null;

    // If path already starts with http:// or https://, return as is
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }

    // Return the complete URL
    return `${API_URL}/${filename}`;
  },

  // Utility function untuk format tanggal
  formatDate: (dateString) => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      return dateString;
    }
  },
};

export default MediaServiceUser;

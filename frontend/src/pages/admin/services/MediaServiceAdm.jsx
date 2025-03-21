import axios from "axios";

const API_URL = "http://localhost:3000"; // Sesuaikan dengan URL API Anda

// Buat axios instance dengan default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor untuk include auth token
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

const MediaServiceAdmin = {
  // GET methods
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

  // POST method
  addMedia: async (mediaData) => {
    try {
      // Jika ada file, gunakan FormData
      if (mediaData.file) {
        const formData = new FormData();
        formData.append("nama", mediaData.nama);
        formData.append("tipe", mediaData.tipe);
        formData.append("deskripsi", mediaData.deskripsi);
        formData.append("file", mediaData.file);

        const response = await api.post("/media", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else {
        // Jika tidak ada file
        const response = await api.post("/media", mediaData);
        return response.data;
      }
    } catch (error) {
      console.error("Error adding media:", error);
      throw error;
    }
  },

  // PUT method
  updateMedia: async (id, mediaData) => {
    try {
      // Jika ada file, gunakan FormData
      if (mediaData.file) {
        const formData = new FormData();
        formData.append("nama", mediaData.nama);
        formData.append("tipe", mediaData.tipe);
        formData.append("deskripsi", mediaData.deskripsi);
        formData.append("file", mediaData.file);

        const response = await api.put(`/media/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else {
        // Jika tidak ada file
        const response = await api.put(`/media/${id}`, mediaData);
        return response.data;
      }
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

  // Get media URL
  getMediaUrl: (filename) => {
    if (!filename) return null;

    // If path already starts with http:// or https://, return as is
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }

    // Return the complete URL
    return `${API_URL}${filename}`;
  },
};

export default MediaServiceAdmin;

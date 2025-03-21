import axios from "axios";

const API_URL = "http://localhost:3000";

// Create axios instance with default config
const secureApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
secureApi.interceptors.request.use(
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
secureApi.interceptors.response.use(
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

// Fungsi untuk memeriksa struktur data yang diharapkan server
const validateBeritaData = (data) => {
  // Daftar field yang wajib ada
  const requiredFields = ["judul", "isi", "tanggalTerbit", "penulis"];

  // Periksa apakah semua field wajib ada
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    throw new Error(`Field berikut wajib diisi: ${missingFields.join(", ")}`);
  }

  // Periksa format tanggal
  if (data.tanggalTerbit) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.tanggalTerbit)) {
      throw new Error("Format tanggal harus YYYY-MM-DD");
    }
  }

  return true;
};

const BeritaServiceAdmin = {
  // GET methods
  getAllBerita: async () => {
    try {
      const response = await secureApi.get("/berita");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching all berita:", error);
      return [];
    }
  },

  getBeritaByStatus: async (status) => {
    try {
      const response = await secureApi.get(`/berita/status/${status}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching berita with status ${status}:`, error);
      return [];
    }
  },

  getBeritaById: async (id) => {
    try {
      const response = await secureApi.get(`/berita/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching berita with id ${id}:`, error);
      return null;
    }
  },

  // POST method
  addBerita: async (beritaData) => {
    try {
      // Validasi data sebelum dikirim
      validateBeritaData(beritaData);

      // Jika ada file foto, gunakan FormData
      if (beritaData.foto instanceof File) {
        const formData = new FormData();
        formData.append("judul", beritaData.judul);
        formData.append("isi", beritaData.isi);
        formData.append("tanggalTerbit", beritaData.tanggalTerbit);
        formData.append("penulis", beritaData.penulis);
        formData.append("status", beritaData.status || "Draft");
        formData.append("foto", beritaData.foto);

        const response = await secureApi.post("/berita", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else {
        // Jika tidak ada file foto
        const response = await secureApi.post("/berita", beritaData);
        return response.data;
      }
    } catch (error) {
      console.error("Error adding berita:", error);
      throw error;
    }
  },

  // PUT methods
  updateBerita: async (id, beritaData) => {
    try {
      // Validasi data sebelum dikirim
      validateBeritaData(beritaData);

      // Jika ada file foto, gunakan FormData
      if (beritaData.foto instanceof File) {
        const formData = new FormData();
        formData.append("judul", beritaData.judul);
        formData.append("isi", beritaData.isi);
        formData.append("tanggalTerbit", beritaData.tanggalTerbit);
        formData.append("penulis", beritaData.penulis);
        formData.append("status", beritaData.status || "Draft");
        formData.append("foto", beritaData.foto);

        const response = await secureApi.put(`/berita/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else {
        // Jika tidak ada file foto
        const response = await secureApi.put(`/berita/${id}`, beritaData);
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating berita with id ${id}:`, error);
      throw error;
    }
  },

  // Update status only
  updateBeritaStatus: async (id, status) => {
    try {
      // Get current berita data
      const currentBerita = await BeritaServiceAdmin.getBeritaById(id);
      if (!currentBerita) {
        throw new Error("Berita tidak ditemukan");
      }

      // Update only the status
      const response = await secureApi.put(`/berita/${id}`, {
        ...currentBerita,
        status: status,
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating berita status with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE method
  deleteBerita: async (id) => {
    try {
      const response = await secureApi.delete(`/berita/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting berita with id ${id}:`, error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (imagePath) => {
    if (!imagePath) return null;

    // Jika path sudah lengkap (eksternal), gunakan apa adanya
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Jika path relatif, tambahkan base URL
    return `${API_URL}${imagePath}`;
  },
};

export default BeritaServiceAdmin;

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

const SuratService = {
  // GET methods
  getAllSurat: async () => {
    try {
      // Fetch surat masuk
      const resMasuk = await api.get("/surat/suratMasuk");
      // Fetch surat keluar
      const resKeluar = await api.get("/surat/suratKeluar");

      // Ensure data is an array
      const suratMasukData = Array.isArray(resMasuk.data) ? resMasuk.data : [];
      const suratKeluarData = Array.isArray(resKeluar.data)
        ? resKeluar.data
        : [];

      console.log("Surat Masuk Data:", suratMasukData);
      console.log("Surat Keluar Data:", suratKeluarData);

      // Transform data for display
      const transformedMasuk = suratMasukData.map((item) => ({
        id: item.id,
        jenis: "Surat Masuk",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.pengirim || "",
        tanggal: item.tanggalTerima || new Date().toISOString(),
        status: "Diterima",
        file_surat: item.file_surat || null,
      }));

      const transformedKeluar = suratKeluarData.map((item) => ({
        id: item.id,
        jenis: "Surat Keluar",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.penerima || "", // penerima disimpan di field pengirim untuk UI
        tanggal: item.tanggalKirim || new Date().toISOString(),
        status: "Terkirim",
        file_surat: item.file_surat || null,
      }));

      const combinedData = [...transformedMasuk, ...transformedKeluar];
      console.log("Combined Data:", combinedData);
      return combinedData;
    } catch (error) {
      console.error("Error fetching all surat:", error);
      return [];
    }
  },

  getSuratMasuk: async () => {
    try {
      const response = await api.get("/surat/suratMasuk");
      const suratMasukData = Array.isArray(response.data) ? response.data : [];

      console.log("Surat Masuk Data:", suratMasukData);

      // Transform data for display
      return suratMasukData.map((item) => ({
        id: item.id,
        jenis: "Surat Masuk",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.pengirim || "",
        tanggal: item.tanggalTerima || new Date().toISOString(),
        status: "Diterima",
        file_surat: item.file_surat || null,
      }));
    } catch (error) {
      console.error("Error fetching surat masuk:", error);
      return [];
    }
  },

  getSuratKeluar: async () => {
    try {
      const response = await api.get("/surat/suratKeluar");
      const suratKeluarData = Array.isArray(response.data) ? response.data : [];

      console.log("Surat Keluar Data:", suratKeluarData);

      // Transform data for display
      return suratKeluarData.map((item) => ({
        id: item.id,
        jenis: "Surat Keluar",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.penerima || "", // penerima disimpan di field pengirim untuk UI
        tanggal: item.tanggalKirim || new Date().toISOString(),
        status: "Terkirim",
        file_surat: item.file_surat || null,
      }));
    } catch (error) {
      console.error("Error fetching surat keluar:", error);
      return [];
    }
  },

  // POST methods
  addSuratMasuk: async (formData) => {
    try {
      const response = await api.post("/surat/addSuratMasuk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding surat masuk:", error);
      throw error;
    }
  },

  addSuratKeluar: async (formData) => {
    try {
      const response = await api.post("/surat/addSuratKeluar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding surat keluar:", error);
      throw error;
    }
  },

  // PUT methods
  updateSuratMasuk: async (id, formData) => {
    try {
      const response = await api.put(
        `/surat/update-surat-masuk/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating surat masuk:", error);
      throw error;
    }
  },

  updateSuratKeluar: async (id, formData) => {
    try {
      const response = await api.put(
        `/surat/update-surat-keluar/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating surat keluar:", error);
      throw error;
    }
  },

  // DELETE methods
  deleteSuratMasuk: async (id) => {
    try {
      const response = await api.delete(`/surat/delete-surat-masuk/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting surat masuk:", error);
      throw error;
    }
  },

  deleteSuratKeluar: async (id) => {
    try {
      const response = await api.delete(`/surat/delete-surat-keluar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting surat keluar:", error);
      throw error;
    }
  },

  // File methods
  getFileUrl: (fileName) => {
    return `${API_URL}/surat/file/${fileName}`;
  },
};

export default SuratService;

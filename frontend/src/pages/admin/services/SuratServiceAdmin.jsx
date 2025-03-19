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

const SuratServiceAdmin = {
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

      // Transform data for display
      const transformedMasuk = suratMasukData.map((item) => ({
        id: item.id,
        jenis: "Surat Masuk",
        nomor: item.nomorSurat || "",
        judul: item.perihal || "",
        perihal: item.perihal || "",
        pengirim: item.pengirim || "",
        tanggal: item.tanggalTerima || new Date().toISOString(),
        file_surat: item.file_surat || null,
        status: "Diterima",
        // Store original data for reference
        originalData: item,
      }));

      const transformedKeluar = suratKeluarData.map((item) => ({
        id: item.id,
        jenis: "Surat Keluar",
        nomor: item.nomorSurat || "",
        judul: item.perihal || "",
        perihal: item.perihal || "",
        pengirim: item.penerima || "", // penerima disimpan di field pengirim untuk UI
        tanggal: item.tanggalKirim || new Date().toISOString(),
        file_surat: item.file_surat || null,
        status: "Terkirim",
        // Store original data for reference
        originalData: item,
      }));

      const combinedData = [...transformedMasuk, ...transformedKeluar];
      return combinedData;
    } catch (error) {
      console.error("Error fetching all surat:", error);
      return [];
    }
  },

  getSuratMasuk: async () => {
    try {
      const response = await api.get("/surat/suratMasuk");
      const data = Array.isArray(response.data) ? response.data : [];

      return data.map((item) => ({
        id: item.id,
        jenis: "Surat Masuk",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.pengirim || "",
        tanggal: item.tanggalTerima || new Date().toISOString(),
        file_surat: item.file_surat || null,
        status: "Diterima",
        originalData: item,
      }));
    } catch (error) {
      console.error("Error fetching surat masuk:", error);
      return [];
    }
  },

  getSuratKeluar: async () => {
    try {
      const response = await api.get("/surat/suratKeluar");
      const data = Array.isArray(response.data) ? response.data : [];

      return data.map((item) => ({
        id: item.id,
        jenis: "Surat Keluar",
        nomor: item.nomorSurat || "",
        perihal: item.perihal || "",
        pengirim: item.penerima || "", // penerima disimpan di field pengirim untuk UI
        tanggal: item.tanggalKirim || new Date().toISOString(),
        file_surat: item.file_surat || null,
        status: "Terkirim",
        originalData: item,
      }));
    } catch (error) {
      console.error("Error fetching surat keluar:", error);
      return [];
    }
  },

  // POST methods
  addSuratMasuk: async (formData) => {
    try {
      const response = await api.post("/surat/suratMasuk", formData, {
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
      const response = await api.post("/surat/suratKeluar", formData, {
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
      const response = await api.put(`/surat/suratMasuk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating surat masuk:", error);
      throw error;
    }
  },

  updateSuratKeluar: async (id, formData) => {
    try {
      const response = await api.put(`/surat/suratKeluar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating surat keluar:", error);
      throw error;
    }
  },

  // DELETE methods
  deleteSuratMasuk: async (id) => {
    try {
      const response = await api.delete(`/surat/suratMasuk/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting surat masuk:", error);
      throw error;
    }
  },

  deleteSuratKeluar: async (id) => {
    try {
      const response = await api.delete(`/surat/suratKeluar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting surat keluar:", error);
      throw error;
    }
  },

  // File methods
  getFileUrl: (fileName) => {
    if (!fileName) return null;
    return `${API_URL}/surat/file/${fileName}`;
  },
};

export default SuratServiceAdmin;

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
      }));

      const combinedData = [...transformedMasuk, ...transformedKeluar];
      return combinedData;
    } catch (error) {
      console.error("Error fetching all surat:", error);
      return [];
    }
  },

  // Get surat by year
  getSuratByYear: async (year) => {
    try {
      const allSurat = await SuratService.getAllSurat();

      // Filter by year
      return allSurat.filter((surat) => {
        // Pastikan tanggal valid
        if (!surat.tanggal) return false;

        let suratYear;
        try {
          // Coba parse tanggal dengan berbagai format
          const date = new Date(surat.tanggal);

          // Periksa apakah tanggal valid
          if (isNaN(date.getTime())) {
            // Jika format tanggal tidak standar, coba ekstrak tahun dengan regex
            const yearMatch = surat.tanggal.match(/\d{4}/);
            suratYear = yearMatch ? yearMatch[0] : null;
          } else {
            suratYear = date.getFullYear().toString();
          }

          return suratYear === year;
        } catch (err) {
          console.error("Error parsing date:", surat.tanggal, err);
          return false;
        }
      });
    } catch (error) {
      console.error(`Error fetching surat for year ${year}:`, error);
      return [];
    }
  },

  // Get available years
  getAvailableYears: async () => {
    try {
      const allSurat = await SuratService.getAllSurat();

      // Extract unique years with better date handling
      const years = allSurat.reduce((acc, surat) => {
        if (!surat.tanggal) return acc;

        let year;
        try {
          // Coba parse tanggal dengan berbagai format
          const date = new Date(surat.tanggal);

          // Periksa apakah tanggal valid
          if (isNaN(date.getTime())) {
            // Jika format tanggal tidak standar, coba ekstrak tahun dengan regex
            const yearMatch = surat.tanggal.match(/\d{4}/);
            year = yearMatch ? yearMatch[0] : null;
          } else {
            year = date.getFullYear().toString();
          }

          if (year && !acc.includes(year)) {
            acc.push(year);
          }
        } catch (err) {
          console.error("Error parsing date:", surat.tanggal, err);
        }

        return acc;
      }, []);

      // Jika tidak ada tahun yang ditemukan, gunakan tahun default
      if (years.length === 0) {
        const currentYear = new Date().getFullYear();
        return [
          currentYear.toString(),
          (currentYear - 1).toString(),
          (currentYear - 2).toString(),
        ];
      }

      // Sort years in descending order
      return years.sort((a, b) => b - a);
    } catch (error) {
      console.error("Error fetching available years:", error);
      // Fallback to default years
      const currentYear = new Date().getFullYear();
      return [
        currentYear.toString(),
        (currentYear - 1).toString(),
        (currentYear - 2).toString(),
      ];
    }
  },

  // File methods
  getFileUrl: (fileName) => {
    if (!fileName) return null;
    return `${API_URL}/surat/file/${fileName}`;
  },

  // Get attachment
  getAttachment: async (fileName) => {
    if (!fileName) return null;

    try {
      const response = await api.get(`/surat/file/${fileName}`, {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching attachment:", error);
      return null;
    }
  },
};

export default SuratService;

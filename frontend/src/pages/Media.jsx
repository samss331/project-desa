"use client";

import { useState, useEffect } from "react";
import {
  FaImage,
  FaVideo,
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaDownload,
  FaPhotoVideo,
  FaPlay,
  FaSpinner,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MediaServiceClient from "../pages/admin/services/MediaServiceAdmin";

export default function Media() {
  // State untuk data
  const [mediaData, setMediaData] = useState({});
  const [availableYears, setAvailableYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk filter dan tampilan
  const [selectedYear, setSelectedYear] = useState("");
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch available years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const years = await MediaServiceClient.getAvailableYears();
        setAvailableYears(years);

        // Set selected year to the most recent year
        if (years.length > 0) {
          setSelectedYear(years[0]);
        }
      } catch (err) {
        console.error("Error fetching years:", err);
        setError("Gagal memuat data tahun.");
      }
    };

    fetchYears();
  }, []);

  // Fetch data for selected year
  useEffect(() => {
    if (!selectedYear) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await MediaServiceClient.getMediaByYear(selectedYear);

        // Organize data by type
        const organizedData = {
          images: data.filter((item) => item.tipe === "Foto"),
          videos: data.filter((item) => item.tipe === "Video"),
          documents: data.filter((item) => item.tipe === "Dokumen"),
        };

        // Update mediaData state with the fetched data
        setMediaData((prevData) => ({
          ...prevData,
          [selectedYear]: organizedData,
        }));
      } catch (err) {
        console.error(`Error fetching data for year ${selectedYear}:`, err);
        setError(`Gagal memuat data untuk tahun ${selectedYear}.`);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we already have data for this year
    if (!mediaData[selectedYear]) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [selectedYear]);

  // Get current year's data and combine images and videos
  const currentYearData = mediaData[selectedYear] || { images: [], videos: [] };
  const allMedia = [
    ...(currentYearData.images || []),
    ...(currentYearData.videos || []),
  ];

  // Filter data based on active tab and search query
  const filteredData = allMedia.filter((item) => {
    const matchesSearch =
      (item.nama?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.deskripsi?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeTab === "semua" ||
      (activeTab === "foto" && item.tipe === "Foto") ||
      (activeTab === "video" && item.tipe === "Video");

    return matchesSearch && matchesFilter;
  });

  // Count by type
  const countImages = currentYearData.images?.length || 0;
  const countVideos = currentYearData.videos?.length || 0;

  // Handle preview
  const handlePreview = (item) => {
    setCurrentItem(item);
    setShowPreviewModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);

      // Periksa apakah tanggal valid
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
  };

  // Get thumbnail for video
  const getVideoThumbnail = (item) => {
    // Jika ada thumbnail khusus, gunakan itu
    if (item.thumbnail) {
      return MediaServiceClient.getFileUrl(item.thumbnail);
    }

    // Jika tidak, gunakan placeholder
    return "/placeholder.svg?height=300&width=400";
  };

  return (
    <div
      className="flex flex-col bg-gray-50 min-h-screen pt-20"
      style={{ fontFamily: "poppins" }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-9xl font-bold bg-gradient-to-r from-[#6CABCA] to-[#315263] bg-clip-text text-transparent mb-2 py-5">
              Media Digital Desa
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto pt-5">
              Dokumentasi kegiatan dan momen penting desa dalam bentuk foto dan
              video
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Media
                </h3>
                <div className="bg-gray-100 bg-opacity-20 p-2 rounded-lg">
                  <FaPhotoVideo className="text-[#B9FF66] text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {allMedia.length}
              </div>
              <p className="text-sm text-gray-600">
                Media tersedia tahun {selectedYear}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Foto</h3>
                <div className="bg-gray-100 bg-opacity-20 p-2 rounded-lg">
                  <FaImage className="text-[#FE7C66] text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {countImages}
              </div>
              <p className="text-sm text-gray-600">Foto tersedia</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Video</h3>
                <div className="bg-gray-100 bg-opacity-20 p-2 rounded-lg">
                  <FaVideo className="text-[#5DE1C4] text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {countVideos}
              </div>
              <p className="text-sm text-gray-600">Video tersedia</p>
            </div>
          </div>

          {/* Filter and Search */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              {/* Year Selection */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#6CABCA]" />
                <span className="text-gray-700 font-medium">Pilih Tahun:</span>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA]"
                  onChange={(e) => setSelectedYear(e.target.value)}
                  value={selectedYear}
                  disabled={isLoading || availableYears.length === 0}
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CABCA] focus:border-[#6CABCA] w-full md:w-64"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("semua")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "semua"
                    ? "bg-[#B9FF66] text-gray-800 font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={isLoading}
              >
                <FaPhotoVideo
                  className={
                    activeTab === "semua" ? "text-gray-800" : "text-[#B9FF66]"
                  }
                />
                <span>Semua Media</span>
              </button>
              <button
                onClick={() => setActiveTab("foto")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "foto"
                    ? "bg-[#FE7C66] text-white font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={isLoading}
              >
                <FaImage
                  className={
                    activeTab === "foto" ? "text-white" : "text-[#FE7C66]"
                  }
                />
                <span>Foto</span>
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === "video"
                    ? "bg-[#5DE1C4] text-white font-medium shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={isLoading}
              >
                <FaVideo
                  className={
                    activeTab === "video" ? "text-white" : "text-[#5DE1C4]"
                  }
                />
                <span>Video</span>
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Gallery Media Tahun {selectedYear}
                </h2>
                <p className="text-gray-600 text-sm">
                  Dokumentasi kegiatan dan momen penting desa
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <FaSpinner className="animate-spin text-[#6CABCA] text-4xl mx-auto mb-4" />
                <p className="text-gray-600">Memuat data media...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
                <button
                  onClick={() => {
                    // Refetch data for the selected year
                    setMediaData((prevData) => {
                      const newData = { ...prevData };
                      delete newData[selectedYear];
                      return newData;
                    });
                  }}
                  className="mt-4 px-4 py-2 bg-[#6CABCA] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.map((media) => (
                  <div
                    key={media.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Media Title */}
                    <div className="p-3 border-b">
                      <h3 className="font-medium text-gray-800 truncate">
                        {media.nama}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <FaCalendarAlt />
                          <span>{formatDate(media.tanggal)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {media.tipe === "Foto" ? (
                            <span className="bg-gray-100 bg-opacity-20 text-[#FE7C66] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FaImage /> Foto
                            </span>
                          ) : (
                            <span className="bg-gray-100 bg-opacity-20 text-[#5DE1C4] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FaVideo /> Video
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Media Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {media.tipe === "Foto" ? (
                        <img
                          src={
                            MediaServiceClient.getFileUrl(media.url) ||
                            "/placeholder.svg?height=300&width=400" ||
                            "/placeholder.svg"
                          }
                          alt={media.nama}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <img
                            src={getVideoThumbnail(media) || "/placeholder.svg"}
                            alt={media.nama}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-3 text-white">
                              <FaPlay />
                            </div>
                          </div>
                          {media.durasi && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {media.durasi}
                            </div>
                          )}
                        </>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePreview(media)}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-[#6CABCA] hover:text-white transition-colors"
                            title="Lihat Detail"
                          >
                            <FaEye />
                          </button>
                          <a
                            href={MediaServiceClient.getFileUrl(media.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-2 rounded-full shadow-md hover:bg-[#B9FF66] hover:text-gray-800 transition-colors"
                            title="Unduh"
                          >
                            <FaDownload />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Media Description */}
                    <div className="p-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {media.deskripsi || "Tidak ada deskripsi"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaPhotoVideo className="text-gray-300 text-5xl mx-auto mb-3" />
                <p className="text-gray-500">Tidak ada media yang ditemukan</p>
                <p className="text-gray-400 text-sm">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {currentItem.tipe === "Foto" ? (
                  <>
                    <FaImage className="inline-block mr-2 text-[#FE7C66]" />{" "}
                    Foto
                  </>
                ) : (
                  <>
                    <FaVideo className="inline-block mr-2 text-[#5DE1C4]" />{" "}
                    Video
                  </>
                )}
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentItem.nama}
              </h2>

              <div className="bg-black rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                {currentItem.tipe === "Foto" ? (
                  <img
                    src={
                      MediaServiceClient.getFileUrl(currentItem.url) ||
                      "/placeholder.svg?height=600&width=800" ||
                      "/placeholder.svg"
                    }
                    alt={currentItem.nama}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={MediaServiceClient.getFileUrl(currentItem.url)}
                    controls
                    autoPlay
                    className="max-w-full max-h-[70vh]"
                    poster={getVideoThumbnail(currentItem)}
                  >
                    Browser Anda tidak mendukung pemutaran video.
                  </video>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-4">
                  {currentItem.deskripsi || "Tidak ada deskripsi"}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[#6CABCA]" />
                    <span className="font-medium">Tanggal:</span>{" "}
                    {formatDate(currentItem.tanggal)}
                  </p>
                  {currentItem.tipe === "Video" && currentItem.durasi && (
                    <p className="flex items-center gap-1">
                      <FaVideo className="text-[#5DE1C4]" />
                      <span className="font-medium">Durasi:</span>{" "}
                      {currentItem.durasi}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
              <a
                href={MediaServiceClient.getFileUrl(currentItem.url)}
                download
                className="px-4 py-2 bg-[#B9FF66] text-gray-800 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
              >
                <FaDownload />
                <span>Unduh</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

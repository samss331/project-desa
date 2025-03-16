"use client";

import { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaEnvelopeOpen,
  FaEnvelope,
  FaNewspaper,
  FaBullhorn,
  FaChartPie,
  FaChartBar,
  FaChartLine,
  FaCalendarAlt,
  FaArrowRight,
  FaCheck,
  FaExclamationTriangle,
  FaPhotoVideo, // Import FaPhotoVideo
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BerandaAdmin = () => {
  // Sample data for the dashboard
  const dashboardData = {
    surat: {
      total: 5,
      masuk: 2,
      keluar: 3,
      recent: [
        {
          id: 1,
          jenis: "Surat Masuk",
          nomor: "SM/2024/001",
          perihal: "Undangan Rapat Koordinasi",
          tanggal: "2024-02-01",
          status: "Diterima",
        },
        {
          id: 3,
          jenis: "Surat Masuk",
          nomor: "SM/2024/002",
          perihal: "Pemberitahuan Kegiatan",
          tanggal: "2024-02-10",
          status: "Diproses",
        },
        {
          id: 2,
          jenis: "Surat Keluar",
          nomor: "SK/2024/001",
          perihal: "Permohonan Kerjasama",
          tanggal: "2024-02-05",
          status: "Terkirim",
        },
      ],
      byMonth: [
        { month: "Jan", count: 2 },
        { month: "Feb", count: 3 },
        { month: "Mar", count: 1 },
        { month: "Apr", count: 4 },
        { month: "Mei", count: 2 },
        { month: "Jun", count: 0 },
      ],
    },
    berita: {
      total: 5,
      published: 3,
      draft: 2,
      recent: [
        {
          id: 1,
          judul: "Pembangunan Jalan Desa Telah Selesai",
          kategori: "Infrastruktur",
          tanggal: "2024-01-01",
          status: "Dipublikasi",
        },
        {
          id: 2,
          judul: "Kegiatan Posyandu Bulan Januari",
          kategori: "Kesehatan",
          tanggal: "2024-01-02",
          status: "Dipublikasi",
        },
        {
          id: 4,
          judul: "Jadwal Vaksinasi Covid-19 Tahap 3",
          kategori: "Kesehatan",
          tanggal: "2024-01-15",
          status: "Draft",
        },
      ],
      byCategory: [
        { category: "Kesehatan", count: 2 },
        { category: "Infrastruktur", count: 1 },
        { category: "Pendidikan", count: 1 },
        { category: "Pertanian", count: 1 },
      ],
    },
    pengumuman: {
      total: 5,
      active: 4,
      expired: 1,
      recent: [
        {
          id: 1,
          judul: "Jadwal Pemadaman Listrik",
          kategori: "Informasi",
          tanggal: "2024-01-05",
          status: "Aktif",
        },
        {
          id: 2,
          judul: "Pengambilan Kartu Keluarga",
          kategori: "Layanan",
          tanggal: "2024-01-06",
          status: "Aktif",
        },
        {
          id: 5,
          judul: "Pengumuman Pemenang Lomba Desa",
          kategori: "Acara",
          tanggal: "2023-12-20",
          status: "Kadaluarsa",
        },
      ],
      byPriority: [
        { priority: "Tinggi", count: 2 },
        { priority: "Sedang", count: 2 },
        { priority: "Rendah", count: 1 },
      ],
    },
    alerts: [
      {
        id: 1,
        type: "warning",
        message: "2 pengumuman akan kadaluarsa dalam 3 hari",
        link: "/admin/pengumuman",
      },
      {
        id: 2,
        type: "info",
        message: "5 berita baru ditambahkan bulan ini",
        link: "/admin/berita",
      },
    ],
  };

  // Simple Donut Chart Component
  const DonutChart = ({ data, colors }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let startAngle = 0;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = item.count / total;
            const angle = percentage * 360;
            const endAngle = startAngle + angle;

            // Calculate SVG arc path
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = `
            M 50 50
            L ${x1} ${y1}
            A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `;

            const currentPath = (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="#fff"
                strokeWidth="1"
              />
            );

            startAngle = endAngle;
            return currentPath;
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {total}
        </div>
      </div>
    );
  };

  // Simple Bar Chart Component
  const BarChart = ({
    data,
    colors,
    valueKey = "count",
    labelKey = "category",
  }) => {
    const maxValue = Math.max(...data.map((item) => item[valueKey]));

    return (
      <div className="w-full h-40">
        <div className="flex h-full items-end justify-around">
          {data.map((item, index) => {
            const height = (item[valueKey] / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-10 rounded-t-md transition-all duration-500 ease-in-out hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: colors[index % colors.length],
                    minHeight: "10%",
                  }}
                ></div>
                <div className="text-xs mt-1 font-medium text-gray-600">
                  {item[labelKey]}
                </div>
                <div className="text-xs font-bold">{item[valueKey]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Simple Line Chart Component
  const LineChart = ({
    data,
    color,
    valueKey = "count",
    labelKey = "month",
  }) => {
    const maxValue = Math.max(...data.map((item) => item[valueKey]));
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item[valueKey] / maxValue) * 100;
      return { x, y, value: item[valueKey], label: item[labelKey] };
    });

    // Generate SVG path
    const pathData = points
      .map(
        (point, index) => (index === 0 ? "M " : "L ") + point.x + " " + point.y
      )
      .join(" ");

    return (
      <div className="w-full h-40 mt-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="0"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="25"
            x2="100"
            y2="25"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="75"
            x2="100"
            y2="75"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="100"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />

          {/* Line path */}
          <path d={pathData} fill="none" stroke={color} strokeWidth="2" />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="white"
                stroke={color}
                strokeWidth="1.5"
              />
              <text
                x={point.x}
                y="100"
                textAnchor="middle"
                fontSize="8"
                fill="#6b7280"
                dy="10"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Diterima":
      case "Dipublikasi":
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Terkirim":
        return "bg-blue-100 text-blue-800";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Kadaluarsa":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Selamat Datang di Dashboard Admin
              </h1>
              <p className="text-gray-600">
                Kelola konten website desa dengan mudah dan efisien
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Alert Section */}
        {dashboardData.alerts.length > 0 && (
          <div className="mb-6">
            {dashboardData.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`mb-2 p-4 rounded-xl flex items-start gap-3 ${
                  alert.type === "warning"
                    ? "bg-amber-50 text-amber-800 border-l-4 border-amber-500"
                    : alert.type === "info"
                    ? "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
                    : "bg-gray-50 text-gray-800 border-l-4 border-gray-500"
                }`}
              >
                {alert.type === "warning" ? (
                  <FaExclamationTriangle className="text-amber-500 mt-0.5" />
                ) : (
                  <FaCheck className="text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">{alert.message}</div>
                <Link
                  href={alert.link}
                  className="text-sm font-medium hover:underline"
                >
                  Lihat
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Surat
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaFileAlt className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {dashboardData.surat.total}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Surat Masuk: {dashboardData.surat.masuk}</span>
              <span>Surat Keluar: {dashboardData.surat.keluar}</span>
            </div>
            <Link
              href="/admin/surat"
              className="mt-4 text-purple-600 text-sm font-medium flex items-center hover:underline"
            >
              Kelola Surat <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Berita
              </h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaNewspaper className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {dashboardData.berita.total}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Dipublikasi: {dashboardData.berita.published}</span>
              <span>Draft: {dashboardData.berita.draft}</span>
            </div>
            <Link
              href="/admin/berita"
              className="mt-4 text-blue-600 text-sm font-medium flex items-center hover:underline"
            >
              Kelola Berita <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Pengumuman
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaBullhorn className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {dashboardData.pengumuman.total}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Aktif: {dashboardData.pengumuman.active}</span>
              <span>Kadaluarsa: {dashboardData.pengumuman.expired}</span>
            </div>
            <Link
              href="/admin/pengumuman"
              className="mt-4 text-green-600 text-sm font-medium flex items-center hover:underline"
            >
              Kelola Pengumuman <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Distribusi Surat
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaChartPie className="text-purple-500 text-xl" />
              </div>
            </div>
            <DonutChart
              data={[
                { label: "Surat Masuk", count: dashboardData.surat.masuk },
                { label: "Surat Keluar", count: dashboardData.surat.keluar },
              ]}
              colors={["#3b82f6", "#10b981"]}
            />
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Surat Masuk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Surat Keluar</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Kategori Berita
              </h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaChartBar className="text-blue-500 text-xl" />
              </div>
            </div>
            <BarChart
              data={dashboardData.berita.byCategory}
              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
              labelKey="category"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Surat per Bulan
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaChartLine className="text-green-500 text-xl" />
              </div>
            </div>
            <LineChart data={dashboardData.surat.byMonth} color="#10b981" />
          </div>
        </div>

        {/* Recent Items Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Surat */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Surat Terbaru
              </h3>
              <Link
                href="/admin/surat"
                className="text-sm text-purple-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.surat.recent.map((surat) => (
                <div
                  key={surat.id}
                  className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {surat.perihal}
                      </h4>
                      <p className="text-sm text-gray-600">{surat.nomor}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        surat.status
                      )}`}
                    >
                      {surat.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      {surat.jenis === "Surat Masuk" ? (
                        <FaEnvelopeOpen className="text-blue-500" />
                      ) : (
                        <FaEnvelope className="text-green-500" />
                      )}
                      <span>{surat.jenis}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>
                        {new Date(surat.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Berita */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Berita Terbaru
              </h3>
              <Link
                href="/admin/berita"
                className="text-sm text-blue-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.berita.recent.map((berita) => (
                <div
                  key={berita.id}
                  className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {berita.judul}
                      </h4>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {berita.kategori}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        berita.status
                      )}`}
                    >
                      {berita.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaNewspaper className="text-blue-500" />
                      <span>Berita</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>
                        {new Date(berita.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Pengumuman */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Pengumuman Terbaru
              </h3>
              <Link
                href="/admin/pengumuman"
                className="text-sm text-green-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.pengumuman.recent.map((pengumuman) => (
                <div
                  key={pengumuman.id}
                  className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {pengumuman.judul}
                      </h4>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {pengumuman.kategori}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pengumuman.status
                      )}`}
                    >
                      {pengumuman.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaBullhorn className="text-green-500" />
                      <span>Pengumuman</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>
                        {new Date(pengumuman.tanggal).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Aksi Cepat
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/surat"
              className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <FaFileAlt className="text-purple-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Kelola Surat
              </span>
            </Link>
            <Link
              href="/admin/berita"
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <FaNewspaper className="text-blue-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Kelola Berita
              </span>
            </Link>
            <Link
              href="/admin/pengumuman"
              className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <FaBullhorn className="text-green-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Kelola Pengumuman
              </span>
            </Link>
            <Link
              href="/admin/media"
              className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
            >
              <FaPhotoVideo className="text-amber-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Kelola Gallery
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BerandaAdmin;

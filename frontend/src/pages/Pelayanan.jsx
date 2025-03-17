import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cs from "../assets/cs.png";
import { FaIdCard, FaUsers, FaEdit, FaArrowRight } from "react-icons/fa";

export default function Pelayanan() {
  // Service categories with icons
  const serviceCategories = [
    {
      title: "Dokumen Identitas",
      icon: <FaIdCard className="text-[#FE7C66] text-3xl" />,
      services: [
        {
          name: "Pembuatan KTP",
          link: "https://forms.gle/example1",
          description:
            "Layanan pembuatan Kartu Tanda Penduduk baru atau penggantian",
        },
        {
          name: "Pembuatan Kartu Keluarga",
          link: "https://forms.gle/example5",
          description: "Layanan pembuatan Kartu Keluarga baru",
        },
        {
          name: "Perubahan Data Kartu Keluarga",
          link: "https://forms.gle/example6",
          description: "Layanan perubahan data pada Kartu Keluarga",
        },
      ],
    },
    {
      title: "Kependudukan",
      icon: <FaUsers className="text-[#5DE1C4] text-3xl" />,
      services: [
        {
          name: "Pembuatan Surat Pindah",
          link: "https://forms.gle/example2",
          description: "Layanan pembuatan surat keterangan pindah domisili",
        },
        {
          name: "Pembuatan Surat Keterangan Domisili",
          link: "https://forms.gle/example7",
          description: "Layanan pembuatan surat keterangan domisili",
        },
      ],
    },
    {
      title: "Pencatatan Sipil",
      icon: <FaEdit className="text-[#6CABCA] text-3xl" />,
      services: [
        {
          name: "Pembuatan Akta Kelahiran",
          link: "https://forms.gle/example3",
          description: "Layanan pembuatan akta kelahiran",
        },
        {
          name: "Pembuatan Akta Kematian",
          link: "https://forms.gle/example4",
          description: "Layanan pembuatan akta kematian",
        },
      ],
    },
  ];

  return (
    <div
      className="flex flex-col bg-gray-50 items-center min-h-screen"
      style={{ fontFamily: "poppins" }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#6CABCA] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
                Pusat Pelayanan
                <br />
                Online Desa
              </h1>
              <p className="text-white text-lg md:text-xl mb-6 opacity-90">
                Akses layanan administrasi desa dengan mudah dan cepat melalui
                platform online kami.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#layanan"
                  className="px-6 py-3 bg-white text-[#6CABCA] font-medium rounded-lg hover:bg-opacity-90 transition shadow-md"
                >
                  Lihat Layanan
                </a>
                <a
                  href="#panduan"
                  className="px-6 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-[#6CABCA] transition border border-white border-opacity-30"
                >
                  Panduan
                </a>
              </div>
            </div>
            <div className="md:w-2/3 flex justify-center">
              <img
                src={cs || "/placeholder.svg"}
                alt="Icon Infografis"
                className="w-150 h-150 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div
        id="layanan"
        className="max-w-6xl mx-auto w-full px-4 md:px-8 py-12 md:pt-30"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Layanan Administrasi Desa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan administrasi desa yang dapat
            diakses secara online. Pilih layanan yang Anda butuhkan dan isi
            formulir yang tersedia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.services.map((service, index) => (
                    <a
                      key={index}
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-4 bg-gray-50 rounded-xl hover:bg-opacity-20 transition group
                        ${
                          idx === 0
                            ? "hover:bg-[#FE7C66]"
                            : idx === 1
                            ? "hover:bg-[#5DE1C4]"
                            : "hover:bg-[#6CABCA]"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-medium text-gray-800 
                          ${
                            idx === 0
                              ? "group-hover:text-[#FE7C66]"
                              : idx === 1
                              ? "group-hover:text-[#5DE1C4]"
                              : "group-hover:text-[#6CABCA]"
                          }`}
                        >
                          {service.name}
                        </span>
                        <FaArrowRight
                          className={`text-gray-400 transform group-hover:translate-x-1 transition-transform
                          ${
                            idx === 0
                              ? "group-hover:text-[#FE7C66]"
                              : idx === 1
                              ? "group-hover:text-[#5DE1C4]"
                              : "group-hover:text-[#6CABCA]"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {service.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div id="panduan" className="w-full bg-gray-100 pt-30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Cara Menggunakan Layanan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti langkah-langkah sederhana berikut untuk mengakses layanan
              administrasi desa secara online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-12 h-12 bg-[#B9FF66] bg-opacity-30 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#B9FF66] font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Pilih Layanan
              </h3>
              <p className="text-gray-600">
                Pilih jenis layanan yang Anda butuhkan dari daftar layanan yang
                tersedia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-12 h-12 bg-[#FE7C66] bg-opacity-30 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#FE7C66] font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Isi Formulir
              </h3>
              <p className="text-gray-600">
                Lengkapi formulir online dengan data yang diperlukan dan unggah
                dokumen pendukung.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-12 h-12 bg-[#5DE1C4] bg-opacity-30 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#5DE1C4] font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Ambil Dokumen
              </h3>
              <p className="text-gray-600">
                Setelah diproses, Anda akan dihubungi untuk mengambil dokumen di
                kantor desa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berikut adalah beberapa pertanyaan yang sering diajukan tentang
            layanan administrasi desa online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#FE7C66]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Berapa lama proses pembuatan dokumen?
            </h3>
            <p className="text-gray-600">
              Proses pembuatan dokumen umumnya membutuhkan waktu 3-5 hari kerja
              setelah semua persyaratan lengkap.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#B9FF66]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Apa saja dokumen yang perlu disiapkan?
            </h3>
            <p className="text-gray-600">
              Dokumen yang diperlukan bervariasi tergantung jenis layanan.
              Detail persyaratan dapat dilihat pada formulir masing-masing
              layanan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#5DE1C4]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Apakah layanan ini berbayar?
            </h3>
            <p className="text-gray-600">
              Sebagian besar layanan administrasi desa tidak dipungut biaya,
              kecuali untuk beberapa layanan tertentu sesuai peraturan yang
              berlaku.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#6CABCA]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Bagaimana jika saya kesulitan mengisi formulir?
            </h3>
            <p className="text-gray-600">
              Anda dapat menghubungi kantor desa melalui nomor telepon yang
              tertera di bagian bawah halaman untuk mendapatkan bantuan.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import { LineVertical } from "@phosphor-icons/react";
import Footer from "../components/Footer";

const Article = () => {
  return (
    <div>
      <Navbar />
      <div className="my-4 md:mx-40 pt-20">
        <div>
          <div className="mb-2">
            <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">TP PKK Morowali Peringati Hari Kesatuan Gerak PKK</h1>
            <img src="../../src/assets/berita1.jpg" alt="" className="md:w-full md:h-1/2 object-cover" />
          </div>
          <div className="flex items-center">
            <LineVertical size={32} />
            <div>
              <h3 className="font-semibold">KECAMATAN BUNGKU TENGAH</h3>
              <p>17 Maret 2025</p>
            </div>
          </div>
          <div className="flex">
            <div className="md:w-3/4 ">
              <p>
                Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP-PKK) Kabupaten Morowali memperingati Hari Kesatuan Gerak PKK ke-51, bertempat di Aula Lantai II Kantor Bupati Morowali, Desa Bente, Kecamatan Bungku Tengah, Sulteng,
                Rabu (9/8/2023).
              </p>
              <br />
              <p>
                Peringatan Hari Kesatuan Gerak PKK 2023 itu dengan tema "Bergerak Bersama Menuju Sejahtera dan Tangguh Wujudkan Indonesia Tumbuh". Dirangkaikan dengan Rapat Konsultasi (Rakon) TP-PKK Kabupaten Morowali Tahun 2023 dengan tema
                "Pemantapan Program Untuk Keberhasilan Rencana Induk Gerakan TP PKK Tahun 2021-2024".
              </p>
            </div>
            <div className="md:w-1/4 shadow-xl p-2">
            <h3 className="font-bold text-xl mb-4">Trending</h3>
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src="../../src/assets/berita1.jpg" />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <p className="text-xl font-bold">Post title</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Article;

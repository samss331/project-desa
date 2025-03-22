/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

export default function Pengumuman() {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 z-30
                 bg-gray-800  text-white py-3 px-4 rounded-xl shadow-lg
                 w-[96%] md:max-w-9xl flex items-center gap-3 overflow-hidden"
      style={{ fontFamily: "Poppins" }}
    >
      {/* Icon 📢 */}
      <div className="flex-shrink-0 absolute z-10 inset-0 bg-gray-800 top-2 w-fit px-3">
        <span className="text-2xl">📢</span>
      </div>
      {/* Teks Berjalan */}
      <motion.div
        className="whitespace-nowrap z-0"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <p className="text-sm md:text-base">
          ⚠ Pengumuman: Harap memperhatikan jadwal kegiatan desa terbaru yang
          telah diumumkan di papan informasi desa. Tetap pantau website ini
          untuk update penting lainnya.
        </p>
      </motion.div>
    </div>
  );
}

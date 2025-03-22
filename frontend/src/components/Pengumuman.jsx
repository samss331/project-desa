import { motion } from "framer-motion";

export default function Pengumuman() {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 z-30
                 bg-gray-800/80 backdrop-blur-md text-white py-3 px-4 rounded-xl shadow-lg
                 w-[96%] md:max-w-9xl flex items-center gap-10 overflow-hidden"
      style={{ fontFamily: "Poppins" }}
    >
      {/* Icon 📢 dengan background penuh */}
      <div className="flex-shrink-0 z-50 bg-gray-800">
        <div className="text-2xl">📢</div>
      </div>

      {/* Teks Berjalan */}
      <motion.div
        className="whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-80%" }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <p className="text-sm md:text-base">
          ⚠️ Pengumuman: Harap memperhatikan jadwal kegiatan desa terbaru yang
          telah diumumkan di papan informasi desa. Tetap pantau website ini
          untuk update penting lainnya.
        </p>
      </motion.div>
    </div>
  );
}

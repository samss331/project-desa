/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

export default function Pengumuman() {
  return (
    <div className="bg-gray-600 text-white py-2 overflow-hidden flex items-center">
      {/* Ikon 📢 */}
      <div className="w-1/12 flex justify-center items-center">
        <span className="text-2xl">📢</span>
      </div>

      {/* Teks Berjalan */}
      <motion.div
        className="w-11/12 whitespace-nowrap"
        initial={{ x: "100%" }} // Mulai dari luar layar (kanan)
        animate={{ x: "-100%" }} // Bergerak sampai keluar layar (kiri)
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }} // Animasi berjalan terus
      >
        <p className="text-lg">
          teks berjalan berisi pengumuman penting untuk pengunjung website desa
        </p>
      </motion.div>
    </div>
  );
}

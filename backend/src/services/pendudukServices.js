import pendudukRepo from "../repositories/pendudukRepo.js";
import { pendudukDTO } from "../dto/dto.js";
import kepalaKeluargaRepo from "../repositories/kepalaKeluargaRepo.js";

const getAllPenduduk = async () => {
  try {
    const results = await pendudukRepo.getAllPenduduk();
    return results.map(
      (p) =>
        new pendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggal_lahir,
          p.jenis_kelamin,
          p.agama,
          p.id_kepala_keluarga,
          p.nama_kepala_keluarga
        )
    );
  } catch (error) {
    throw new Error("Gagal mengambil data semua penduduk");
  }
};

const getPendudukByNik = async (nik) => {
  try {
    const result = await pendudukRepo.getPendudukByNik(nik);
    if (!result) {
      return null;
    }
    return new pendudukDTO(
      result.id,
      result.nama,
      result.nik,
      result.alamat,
      result.tanggal_lahir,
      result.jenis_kelamin,
      result.agama,
      result.id_kepala_keluarga,
      result.nama_kepala_keluarga
    );
  } catch (error) {
    throw new Error("Gagal mengambil data penduduk berdasarkan NIK");
  }
};

const addPenduduk = async (
  nama,
  nik,
  alamat,
  tanggal_lahir,
  jenis_kelamin,
  agama,
  id_kepala_keluarga,
  isKepalaKeluarga = false
) => {
  if (!nama || !nik || !alamat || !tanggal_lahir || !jenis_kelamin || !agama) {
    throw new Error("Semua data wajib diisi!");
  }

  // Cek apakah NIK sudah ada
  const existingPenduduk = await pendudukRepo.getPendudukByNik(nik);
  if (existingPenduduk) {
    throw new Error("NIK sudah terdaftar!");
  }

  try {
    let kepalaKeluargaId = id_kepala_keluarga;

    // Jika checkbox kepala keluarga dicentang, buat data kepala keluarga baru
    if (isKepalaKeluarga) {
      // Cek apakah NIK sudah ada di tabel kepala keluarga
      const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaByNik(nik);
      if (existingKK) {
        throw new Error("NIK sudah terdaftar sebagai kepala keluarga!");
      }

      await kepalaKeluargaRepo.addKepalaKeluarga(nama, nik);
      kepalaKeluargaId = null; // <--- Perbaikan: harus null untuk kepala keluarga
    } else if (id_kepala_keluarga) {
      // Jika tidak sebagai kepala keluarga, validasi id_kepala_keluarga yang dipilih
      const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaById(
        id_kepala_keluarga
      );
      if (!existingKK) {
        throw new Error(
          `Kepala keluarga dengan ID ${id_kepala_keluarga} tidak ditemukan!`
        );
      }
    }

    const result = await pendudukRepo.addPenduduk(
      nama,
      nik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      kepalaKeluargaId
    );

    return new pendudukDTO(
      result.id,
      result.nama,
      result.nik,
      result.alamat,
      result.tanggal_lahir,
      result.jenis_kelamin,
      result.agama,
      result.id_kepala_keluarga,
      result.nama_kepala_keluarga
    );
  } catch (error) {
    throw new Error("Gagal menambahkan data penduduk: " + error.message);
  }
};

const updateDataPenduduk = async (
  oldNik,
  nama,
  newNik,
  alamat,
  tanggal_lahir,
  jenis_kelamin,
  agama,
  id_kepala_keluarga,
  isKepalaKeluarga
) => {
  const existingPenduduk = await pendudukRepo.getPendudukByNik(oldNik);
  if (!existingPenduduk) {
    throw new Error("Data dengan NIK tersebut tidak ditemukan");
  }

  // Validasi: tidak boleh memilih diri sendiri sebagai kepala keluarga
  if (id_kepala_keluarga && existingPenduduk.id == id_kepala_keluarga) {
    throw new Error(
      "Tidak boleh memilih diri sendiri sebagai kepala keluarga!"
    );
  }

  // Cek status lama: apakah sebelumnya kepala keluarga?
  const wasKepalaKeluarga = !existingPenduduk.id_kepala_keluarga;
  // Cek status baru: apakah sekarang kepala keluarga?
  const nowKepalaKeluarga = !!isKepalaKeluarga;

  // Jika berubah dari kepala keluarga ke anggota
  if (wasKepalaKeluarga && !nowKepalaKeluarga) {
    // Hapus dari tabel kepala keluarga
    const kk = await kepalaKeluargaRepo.getKepalaKeluargaByNik(oldNik);
    if (kk) {
      await kepalaKeluargaRepo.deleteKepalaKeluarga(kk.id);
    }
    // Update penduduk: set id_kepala_keluarga sesuai input
    await pendudukRepo.updateDataPenduduk(
      oldNik,
      nama,
      newNik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      id_kepala_keluarga
    );
    return {
      success: true,
      message:
        "Status diubah menjadi anggota keluarga, data kepala keluarga dihapus.",
    };
  }

  // Jika berubah dari anggota ke kepala keluarga
  if (!wasKepalaKeluarga && nowKepalaKeluarga) {
    // Tambahkan ke tabel kepala keluarga
    const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaByNik(newNik);
    if (!existingKK) {
      await kepalaKeluargaRepo.addKepalaKeluarga(nama, newNik);
    }
    // Update penduduk: set id_kepala_keluarga = NULL
    await pendudukRepo.updateDataPenduduk(
      oldNik,
      nama,
      newNik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      null
    );
    return {
      success: true,
      message:
        "Status diubah menjadi kepala keluarga, data kepala keluarga ditambahkan.",
    };
  }

  // Jika tetap kepala keluarga
  if (wasKepalaKeluarga && nowKepalaKeluarga) {
    // Update data di tabel kepala keluarga jika nama/nik berubah
    const kk = await kepalaKeluargaRepo.getKepalaKeluargaByNik(oldNik);
    if (kk) {
      await kepalaKeluargaRepo.updateKepalaKeluarga(kk.id, nama, newNik);
    }
    // Update penduduk: id_kepala_keluarga tetap null
    await pendudukRepo.updateDataPenduduk(
      oldNik,
      nama,
      newNik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      null
    );
    return { success: true, message: "Data kepala keluarga diperbarui." };
  }

  // Jika tetap anggota
  if (!wasKepalaKeluarga && !nowKepalaKeluarga) {
    // Update penduduk: id_kepala_keluarga sesuai input
    await pendudukRepo.updateDataPenduduk(
      oldNik,
      nama,
      newNik,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      id_kepala_keluarga
    );
    return { success: true, message: "Data anggota keluarga diperbarui." };
  }
};

const deleteDataPenduduk = async (nik) => {
  try {
    const existingPenduduk = await pendudukRepo.getPendudukByNik(nik);
    if (!existingPenduduk) {
      return {
        success: false,
        message: "Data dengan NIK tersebut tidak ditemukan",
      };
    }
    const isDeleted = await pendudukRepo.deleteDataPenduduk(nik);
    if (!isDeleted) {
      return { success: false, message: "Gagal menghapus data" };
    }
    return { success: true, message: "Data berhasil dihapus" };
  } catch (error) {
    throw error;
  }
};

const getTotalPenduduk = async () => {
  try {
    return await pendudukRepo.getTotalPenduduk();
  } catch (error) {
    throw new Error("Gagal mengambil total penduduk");
  }
};

const getTotalKepalaKeluarga = async () => {
  try {
    return await pendudukRepo.getTotalKepalaKeluarga();
  } catch (error) {
    throw new Error("Gagal mengambil total kepala keluarga");
  }
};

const getTotalLakiLaki = async () => {
  try {
    return await pendudukRepo.getTotalLakiLaki();
  } catch (error) {
    throw new Error("Gagal mengambil total laki-laki");
  }
};

const getTotalPerempuan = async () => {
  try {
    return await pendudukRepo.getTotalPerempuan();
  } catch (error) {
    throw new Error("Gagal mengambil total perempuan");
  }
};

const getPendudukByAgama = async () => {
  try {
    return await pendudukRepo.getPendudukByAgama();
  } catch (error) {
    throw new Error("Gagal mengambil data berdasarkan agama");
  }
};

const getPendudukByUmur = async () => {
  try {
    return await pendudukRepo.getPendudukByUmur();
  } catch (error) {
    throw new Error("Gagal mengambil data berdasarkan umur");
  }
};

const getPendudukByKepalaKeluarga = async (id_kepala_keluarga) => {
  try {
    const results = await pendudukRepo.getPendudukByKepalaKeluarga(
      id_kepala_keluarga
    );
    return results.map(
      (p) =>
        new pendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggal_lahir,
          p.jenis_kelamin,
          p.agama,
          p.id_kepala_keluarga,
          p.nama_kepala_keluarga
        )
    );
  } catch (error) {
    throw new Error(
      "Gagal mengambil data penduduk berdasarkan kepala keluarga"
    );
  }
};

const searchPendudukByKepalaKeluarga = async (searchTerm) => {
  try {
    const results = await pendudukRepo.searchPendudukByKepalaKeluarga(
      searchTerm
    );
    return results.map(
      (p) =>
        new pendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggal_lahir,
          p.jenis_kelamin,
          p.agama,
          p.id_kepala_keluarga,
          p.nama_kepala_keluarga
        )
    );
  } catch (error) {
    throw new Error("Gagal mencari data penduduk berdasarkan kepala keluarga");
  }
};

export default {
  getAllPenduduk,
  getPendudukByNik,
  addPenduduk,
  updateDataPenduduk,
  deleteDataPenduduk,
  getPendudukByUmur,
  getTotalKepalaKeluarga,
  getTotalLakiLaki,
  getTotalPerempuan,
  getTotalPenduduk,
  getPendudukByAgama,
  getPendudukByKepalaKeluarga,
  searchPendudukByKepalaKeluarga,
};

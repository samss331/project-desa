import pendudukRepo from "../repositories/pendudukRepo.js"
import { PendudukDTO } from "../dto/dto.js"
import kepalaKeluargaRepo from "../repositories/kepalaKeluargaRepo.js"

const getAllPenduduk = async () => {
  try {
    const results = await pendudukRepo.getAllPenduduk()
    return results.map(
      (p) =>
        new PendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggalLahir,
          p.jenisKelamin,
          p.agama,
          p.id_kepalakeluarga,
          p.namaKepalaKeluarga,
        ),
    )
  } catch (error) {
    throw new Error("Gagal mengambil data semua penduduk")
  }
}

const getPendudukByNik = async (nik) => {
  try {
    const result = await pendudukRepo.getPendudukByNik(nik)
    if (!result) {
      return null
    }
    return new PendudukDTO(
      result.id,
      result.nama,
      result.nik,
      result.alamat,
      result.tanggalLahir,
      result.jenisKelamin,
      result.agama,
      result.id_kepalakeluarga,
      result.namaKepalaKeluarga,
    )
  } catch (error) {
    throw new Error("Gagal mengambil data penduduk berdasarkan NIK")
  }
}

const addPenduduk = async (
  nama,
  nik,
  alamat,
  tanggalLahir,
  jenisKelamin,
  agama,
  id_kepalakeluarga,
  isKepalaKeluarga = false,
) => {
  if (!nama || !nik || !alamat || !tanggalLahir || !jenisKelamin || !agama) {
    throw new Error("Semua data wajib diisi!")
  }

  // Cek apakah NIK sudah ada
  const existingPenduduk = await pendudukRepo.getPendudukByNik(nik)
  if (existingPenduduk) {
    throw new Error("NIK sudah terdaftar!")
  }

  try {
    let kepalaKeluargaId = id_kepalakeluarga

    // Jika checkbox kepala keluarga dicentang, buat data kepala keluarga baru
    if (isKepalaKeluarga) {
      // Cek apakah NIK sudah ada di tabel kepala keluarga
      const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaByNik(nik)
      if (existingKK) {
        throw new Error("NIK sudah terdaftar sebagai kepala keluarga!")
      }

      const kepalaKeluargaData = await kepalaKeluargaRepo.addKepalaKeluarga(nama, nik)
      kepalaKeluargaId = kepalaKeluargaData.id
    } else if (id_kepalakeluarga) {
      // Jika tidak sebagai kepala keluarga, validasi id_kepalakeluarga yang dipilih
      const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaById(id_kepalakeluarga)
      if (!existingKK) {
        throw new Error(`Kepala keluarga dengan ID ${id_kepalakeluarga} tidak ditemukan!`)
      }
    }

    const result = await pendudukRepo.addPenduduk(
      nama,
      nik,
      alamat,
      tanggalLahir,
      jenisKelamin,
      agama,
      kepalaKeluargaId,
    )

    return new PendudukDTO(
      result.id,
      result.nama,
      result.nik,
      result.alamat,
      result.tanggalLahir,
      result.jenisKelamin,
      result.agama,
      result.id_kepalakeluarga,
      result.namaKepalaKeluarga,
    )
  } catch (error) {
    throw new Error("Gagal menambahkan data penduduk: " + error.message)
  }
}

const updateDataPenduduk = async (
  oldNik,
  nama,
  newNik,
  alamat,
  tanggalLahir,
  jenisKelamin,
  agama,
  id_kepalakeluarga,
) => {
  const existingPenduduk = await pendudukRepo.getPendudukByNik(oldNik)
  if (!existingPenduduk) {
    throw new Error("Data dengan NIK tersebut tidak ditemukan")
  }

  if (newNik !== oldNik) {
    const nikExists = await pendudukRepo.getPendudukByNik(newNik)
    if (nikExists) {
      throw new Error("NIK baru sudah digunakan oleh penduduk lain")
    }
  }

  // Validasi kepala keluarga jika ada
  if (id_kepalakeluarga) {
    const existingKK = await kepalaKeluargaRepo.getKepalaKeluargaById(id_kepalakeluarga)
    if (!existingKK) {
      throw new Error(`Kepala keluarga dengan ID ${id_kepalakeluarga} tidak ditemukan!`)
    }
  }

  await pendudukRepo.updateDataPenduduk(
    oldNik,
    nama,
    newNik,
    alamat,
    tanggalLahir,
    jenisKelamin,
    agama,
    id_kepalakeluarga,
  )
  return {
    success: true,
    message: "Data berhasil diperbarui",
    nama,
    newNik,
    alamat,
    tanggalLahir,
    jenisKelamin,
    agama,
    id_kepalakeluarga,
  }
}

const deleteDataPenduduk = async (nik) => {
  try {
    const existingPenduduk = await pendudukRepo.getPendudukByNik(nik)
    if (!existingPenduduk) {
      return {
        success: false,
        message: "Data dengan NIK tersebut tidak ditemukan",
      }
    }
    const isDeleted = await pendudukRepo.deleteDataPenduduk(nik)
    if (!isDeleted) {
      return { success: false, message: "Gagal menghapus data" }
    }
    return { success: true, message: "Data berhasil dihapus" }
  } catch (error) {
    throw error
  }
}

const getTotalPenduduk = async () => {
  try {
    return await pendudukRepo.getTotalPenduduk()
  } catch (error) {
    throw new Error("Gagal mengambil total penduduk")
  }
}

const getTotalKepalaKeluarga = async () => {
  try {
    return await pendudukRepo.getTotalKepalaKeluarga()
  } catch (error) {
    throw new Error("Gagal mengambil total kepala keluarga")
  }
}

const getTotalLakiLaki = async () => {
  try {
    return await pendudukRepo.getTotalLakiLaki()
  } catch (error) {
    throw new Error("Gagal mengambil total laki-laki")
  }
}

const getTotalPerempuan = async () => {
  try {
    return await pendudukRepo.getTotalPerempuan()
  } catch (error) {
    throw new Error("Gagal mengambil total perempuan")
  }
}

const getPendudukByAgama = async () => {
  try {
    return await pendudukRepo.getPendudukByAgama()
  } catch (error) {
    throw new Error("Gagal mengambil data berdasarkan agama")
  }
}

const getPendudukByUmur = async () => {
  try {
    return await pendudukRepo.getPendudukByUmur()
  } catch (error) {
    throw new Error("Gagal mengambil data berdasarkan umur")
  }
}

const getPendudukByKepalaKeluarga = async (id_kepalakeluarga) => {
  try {
    const results = await pendudukRepo.getPendudukByKepalaKeluarga(id_kepalakeluarga)
    return results.map(
      (p) =>
        new PendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggalLahir,
          p.jenisKelamin,
          p.agama,
          p.id_kepalakeluarga,
          p.namaKepalaKeluarga,
        ),
    )
  } catch (error) {
    throw new Error("Gagal mengambil data penduduk berdasarkan kepala keluarga")
  }
}

const searchPendudukByKepalaKeluarga = async (searchTerm) => {
  try {
    const results = await pendudukRepo.searchPendudukByKepalaKeluarga(searchTerm)
    return results.map(
      (p) =>
        new PendudukDTO(
          p.id,
          p.nama,
          p.nik,
          p.alamat,
          p.tanggalLahir,
          p.jenisKelamin,
          p.agama,
          p.id_kepalakeluarga,
          p.namaKepalaKeluarga,
        ),
    )
  } catch (error) {
    throw new Error("Gagal mencari data penduduk berdasarkan kepala keluarga")
  }
}

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
}

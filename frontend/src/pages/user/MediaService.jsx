import fs from "fs";
import path from "path";

const addMedia = async (nama, tipe, tanggal, url, file) => {
  if (!nama || !tipe || !tanggal) {
    throw new Error("Nama, tipe, dan tanggal wajib diisi!");
  }

  // Jika file diupload, gunakan path file sebagai URL
  let mediaUrl = url;
  if (file) {
    mediaUrl = `/media/${file.filename}`;
  }

  // Jika tidak ada URL dan tidak ada file, throw error
  if (!mediaUrl) {
    throw new Error("URL atau file media wajib diisi!");
  }

  const result = await mediaRepository.addMedia(nama, tipe, tanggal, mediaUrl);
  return new MediaDTO(result.id, nama, tipe, tanggal, mediaUrl);
};

const getAllMedia = async () => {
  const result = await mediaRepository.getAllMedia();
  return result.map(
    (m) => new MediaDTO(m.id, m.nama, m.tipe, m.tanggal, m.url)
  );
};

const getMediaById = async (id) => {
  const result = await mediaRepository.getMediaById(id);
  if (!result) {
    throw new Error("Media tidak ditemukan");
  }
  return new MediaDTO(
    result.id,
    result.nama,
    result.tipe,
    result.tanggal,
    result.url
  );
};

const updateMedia = async (id, nama, tipe, tanggal, url, file) => {
  const existing = await mediaRepository.getMediaById(id);
  if (!existing) {
    return false;
  }

  // Jika file diupload, gunakan path file sebagai URL dan hapus file lama jika ada
  let mediaUrl = url;
  if (file) {
    mediaUrl = `/media/${file.filename}`;

    // Hapus file lama jika ada dan bukan URL eksternal
    if (existing.url && existing.url.startsWith("/media/")) {
      try {
        const oldFilePath = path.join("uploads", existing.url);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (error) {
        console.error("Error deleting old file:", error);
      }
    }
  }

  return await mediaRepository.updateMedia(id, nama, tipe, tanggal, mediaUrl);
};

const deleteMedia = async (id) => {
  const existing = await mediaRepository.getMediaById(id);
  if (!existing) {
    return false;
  }

  // Hapus file jika ada dan bukan URL eksternal
  if (existing.url && existing.url.startsWith("/media/")) {
    try {
      const filePath = path.join("uploads", existing.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return await mediaRepository.deleteMedia(id);
};

export default {
  addMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

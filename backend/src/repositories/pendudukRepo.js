import db from "../config/database.js";

const getAllPenduduk = async () => {
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPendudukByNik = async (nik) => {
    try {
        const [results] = await db.promise().query("SELECT * FROM PENDUDUK WHERE nik =?", [nik]);
        return results.length ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

const addPenduduk = async (nama, nik, alamat, tanggalLahir, jenisKelamin, agama, id_kepalakeluarga) => {
   try {
      const [results] = await db
        .promise()
        .query(
          "INSERT INTO penduduk (nama, nik, alamat, tanggalLahir, jenisKelamin, agama, id_kepalakeluarga) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [nama, nik, alamat, tanggalLahir, jenisKelamin, agama, id_kepalakeluarga],
        )
      return { id: results.insertId, nama, nik, alamat, tanggalLahir, jenisKelamin, agama, id_kepalakeluarga }
    } catch (error) {
       throw error
    }
}


const updateDataPenduduk = async (oldNik,nama,newNik,alamat,tanggalLahir,jenisKelamin,agama,id_kepalakeluarga) => {
    try {
      const [results] = await db
        .promise()
        .query( 
          "UPDATE penduduk SET nama = ?, nik = ?, alamat = ?, tanggalLahir = ?, jenisKelamin = ?, agama = ?, id_kepalakeluarga = ? WHERE nik = ?",
          [nama, newNik, alamat, tanggalLahir, jenisKelamin, agama, id_kepalakeluarga, oldNik],
        )
      return results
    } catch (error) {
      throw error
    }
}

const deleteDataPenduduk = async (nik) => {
    try {
        const [results] = await db.promise().query("DELETE FROM PENDUDUK WHERE nik = ?", [nik])
        return results.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}

const getTotalPenduduk = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK");
        return results[0].total;
    } catch (error) {
        throw error;
    }
}

const getTotalLakiLaki = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK WHERE jenisKelamin = 'laki-laki'");
        return results[0].total;
    } catch (error) {
        throw error;
    }
};

const getTotalPerempuan = async () => {
    try {
        const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM PENDUDUK WHERE jenisKelamin = 'perempuan'");
        return results[0].total;
    } catch (error) {
        throw error;
    }
};

const getPendudukByAgama = async () => {
    try {
        const [results] = await db.promise().query("SELECT agama, COUNT(*) AS total FROM PENDUDUK GROUP BY agama");
        return results;
    } catch (error) {
        throw error;
    }
};

const getPendudukByUmur = async () => {
    try {
        const [results] = await db.promise().query(`
            SELECT 
                CASE 
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 12 THEN 'Anak-anak'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 19 THEN 'Remaja'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 35 THEN 'Dewasa Muda'
                    WHEN TIMESTAMPDIFF(YEAR, tanggalLahir, CURDATE()) <= 59 THEN 'Dewasa'
                    ELSE 'Lansia'
                END AS kategori,
                COUNT(*) AS total
            FROM PENDUDUK
            GROUP BY kategori
        `);
        return results;
    } catch (error) {
        throw error;
    }
};


const getPendudukByKepalaKeluarga = async (id_kepalakeluarga) => {
  try {
    const [results] = await db.promise().query(
      `
            SELECT p.*, kk.nama as namaKepalaKeluarga 
            FROM penduduk p 
            LEFT JOIN kepalakeluarga kk ON p.id_kepalakeluarga = kk.id 
            WHERE p.id_kepalakeluarga = ?
        `,
      [id_kepalakeluarga],
    )
    return results
  } catch (error) {
    throw error
  }
}

const searchPendudukByKepalaKeluarga = async (searchTerm) => {
  try {
    const [results] = await db.promise().query(
      `
            SELECT p.*, kk.nama as namaKepalaKeluarga 
            FROM penduduk p 
            LEFT JOIN kepalakeluarga kk ON p.id_kepalakeluarga = kk.id 
            WHERE kk.nama LIKE ? OR kk.nik LIKE ?
        `,
      [`%${searchTerm}%`, `%${searchTerm}%`],
    )
    return results
  } catch (error) {
    throw error
  }
}

export default {
  getAllPenduduk,
  getPendudukByNik,
  addPenduduk,
  updateDataPenduduk,
  deleteDataPenduduk,
  getPendudukByAgama,
  getPendudukByUmur,
  getTotalLakiLaki,
  getTotalPenduduk,
  getTotalPerempuan,
  getPendudukByKepalaKeluarga,
  searchPendudukByKepalaKeluarga,
}
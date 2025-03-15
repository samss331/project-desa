class User {
    constructor(id, nama, email, password) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.password = password;
    }
}

class Penduduk {
    constructor(id, nama, nik, alamat, tanggalLahir, jenisKelamin, agama, kepalaKeluarga) {
        this.id = id;
        this.nama = nama;
        this.nik = nik;
        this.alamat = alamat;
        this.tanggalLahir = tanggalLahir;
        this.jenisKelamin = jenisKelamin;
        this.agama = agama;
        this.kepalaKeluarga = kepalaKeluarga;
    }
}

class SuratMasuk {
    constructor(id, nomorSurat, pengirim, perihal, tanggalTerima, file) {
        this.id = id;
        this.nomorSurat = nomorSurat;
        this.pengirim = pengirim;
        this.perihal = perihal;
        this.tanggalTerima = tanggalTerima;
        this.file = file; 
    }
}

class SuratKeluar {
    constructor(id, nomorSurat, penerima, perihal, tanggalKirim, file) {
        this.id = id;
        this.nomorSurat = nomorSurat;
        this.penerima = penerima;
        this.perihal = perihal;
        this.tanggalKirim = tanggalKirim;
        this.file = file;
    }
}

class Pengumuman {
    constructor(id, judul, isi, tanggalMulai, tanggalSelesai) {
        this.id = id;
        this.judul = judul;
        this.isi = isi;
        this.tanggalMulai = tanggalMulai;
        this.tanggalSelesai = tanggalSelesai;
    }
}

class Berita {
    constructor(id, judul, isi, tanggalTerbit, penulis) {
        this.id = id;
        this.judul = judul;
        this.isi = isi;
        this.tanggalTerbit = tanggalTerbit;
        this.penulis = penulis;
    }
}

class DanaMasuk {
    constructor(id, tahun, bulan, jumlah, sumber, keterangan, createdAt, updatedAt){
        this.id = id
        this.tahun = tahun
        this.bulan = bulan
        this.jumlah = jumlah
        this.sumber = sumber
        this.keterangan = keterangan
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

class DanaKeluar {
    constructor(id, tahun, bulan, jumlah, kategori, keterangan, createdAt, updatedAt){
        this.id = id
        this.tahun = tahun
        this.bulan = bulan
        this.jumlah = jumlah
        this.kategori = kategori
        this.keterangan = keterangan
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
export default { User, Penduduk, SuratMasuk, SuratKeluar, Pengumuman, Berita, DanaMasuk, DanaKeluar };
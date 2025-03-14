class UserDTO {
    constructor(id, nama, email, token) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.token = token;
    }
}

class PendudukDTO {
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

class SuratMasukDTO {
    constructor(id, nomorSurat, pengirim, perihal, tanggalTerima) {
        this.id = id;
        this.nomorSurat = nomorSurat;
        this.pengirim = pengirim;
        this.perihal = perihal;
        this.tanggalTerima = tanggalTerima;
    }
}

class SuratKeluarDTO {
    constructor(id, nomorSurat, penerima, perihal, tanggalKirim) {
        this.id = id;
        this.nomorSurat = nomorSurat;
        this.penerima = penerima;
        this.perihal = perihal;
        this.tanggalKirim = tanggalKirim;
    }
}

class PengumumanDTO {
    constructor(id, judul, isi, tanggalMulai, tanggalSelesai) {
        this.id = id;
        this.judul = judul;
        this.isi = isi;
        this.tanggalMulai = tanggalMulai;
        this.tanggalSelesai = tanggalSelesai;
    }
}

class BeritaDTO {
    constructor(id, judul, isi, tanggalTerbit, penulis) {
        this.id = id;
        this.judul = judul;
        this.isi = isi;
        this.tanggalTerbit = tanggalTerbit;
        this.penulis = penulis;
    }
}

export { UserDTO, PendudukDTO, SuratMasukDTO, SuratKeluarDTO, PengumumanDTO, BeritaDTO };

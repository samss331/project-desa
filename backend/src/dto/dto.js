class userDTO {
  constructor(id, nama, email, token, role, last_login) {
    this.id = id;
    this.nama = nama;
    this.email = email;
    this.token = token;
    this.role = role;
    this.last_login = last_login;
  }
}

class pendudukDTO {
  constructor(
    id,
    nama,
    nik,
    alamat,
    tanggal_lahir,
    jenis_kelamin,
    agama,
    id_kepala_keluarga,
    nama_kepala_keluarga = null
  ) {
    this.id = id;
    this.nama = nama;
    this.nik = nik;
    this.alamat = alamat;
    this.tanggal_lahir = tanggal_lahir;
    this.jenis_kelamin = jenis_kelamin;
    this.agama = agama;
    this.id_kepala_keluarga = id_kepala_keluarga;
    this.nama_kepala_keluarga = nama_kepala_keluarga;
  }
}

class surat_masukDTO {
  constructor(id, nomor_surat, pengirim, perihal, tanggal_terima, file) {
    this.id = id;
    this.nomor_surat = nomor_surat;
    this.pengirim = pengirim;
    this.perihal = perihal;
    this.tanggal_terima = tanggal_terima;
    this.file = file;
  }
}

class surat_keluarDTO {
  constructor(id, nomor_surat, penerima, perihal, tanggal_kirim, file) {
    this.id = id;
    this.nomor_surat = nomor_surat;
    this.penerima = penerima;
    this.perihal = perihal;
    this.tanggal_kirim = tanggal_kirim;
    this.file = file;
  }
}

class pengumumanDTO {
  constructor(id, judul, isi, tanggal_mulai, tanggal_selesai) {
    this.id = id;
    this.judul = judul;
    this.isi = isi;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_selesai = tanggal_selesai;
  }
}

class beritaDTO {
  constructor(
    id,
    judul,
    foto,
    isi,
    tanggal_terbit,
    penulis,
    status = "Dipublikasi",
    kategori = "Umum"
  ) {
    this.id = id;
    this.judul = judul;
    this.foto = foto;
    this.isi = isi;
    this.tanggal_terbit = tanggal_terbit;
    this.penulis = penulis;
    this.status = status;
    this.kategori = kategori;
  }
}

class dana_masukDTO {
  constructor(id, tahun, bulan, jumlah, sumber, keterangan) {
    this.id = id;
    this.tahun = tahun;
    this.bulan = bulan;
    this.jumlah = jumlah;
    this.sumber = sumber;
    this.keterangan = keterangan;
  }
}

class dana_keluarDTO {
  constructor(id, tahun, bulan, jumlah, kategori, keterangan) {
    this.id = id;
    this.tahun = tahun;
    this.bulan = bulan;
    this.jumlah = jumlah;
    this.kategori = kategori;
    this.keterangan = keterangan;
  }
}

class mediaDTO {
  constructor(id, nama, tipe, file, deskripsi, thumbnail) {
    this.id = id;
    this.nama = nama;
    this.tipe = tipe;
    this.file = file;
    this.deskripsi = deskripsi;
    this.thumbnail = thumbnail;
  }
}

class pelayananDTO {
  constructor(nama_layanan, kategori, deskripsi, link_google_form) {
    this.nama_layanan = nama_layanan;
    this.kategori = kategori;
    this.deskripsi = deskripsi;
    this.link_google_form = link_google_form;
  }
}

class kepala_keluargaDTO {
  constructor(id, nama, nik) {
    this.id = id;
    this.nama = nama;
    this.nik = nik;
  }
}

export {
  userDTO,
  pendudukDTO,
  surat_masukDTO,
  surat_keluarDTO,
  pengumumanDTO,
  beritaDTO,
  dana_masukDTO,
  dana_keluarDTO,
  mediaDTO,
  pelayananDTO,
  kepala_keluargaDTO,
};

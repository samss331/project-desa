-- Migration: Initial structure for Supabase/PostgreSQL

CREATE TABLE aparatur (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nip VARCHAR(30) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto BYTEA NOT NULL
);

CREATE TABLE berita (
  id SERIAL PRIMARY KEY,
  foto VARCHAR(255) NOT NULL,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_terbit DATE NOT NULL,
  penulis VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Dipublikasi'
);

CREATE TABLE dana_keluar (
  id SERIAL PRIMARY KEY,
  tahun INTEGER NOT NULL,
  bulan INTEGER NOT NULL,
  jumlah NUMERIC(15,2) NOT NULL,
  kategori VARCHAR(255) NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dana_masuk (
  id SERIAL PRIMARY KEY,
  tahun INTEGER NOT NULL,
  bulan INTEGER NOT NULL,
  jumlah NUMERIC(15,2) NOT NULL,
  sumber VARCHAR(255) NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kepala_keluarga (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nik VARCHAR(50) NOT NULL
);

CREATE TYPE media_tipe_enum AS ENUM ('foto', 'video', 'dokumen');
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  tipe media_tipe_enum NOT NULL,
  file VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  thumbnail VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE pelayanan_kategori_enum AS ENUM ('Dokumen Identitas','Kependudukan','Pencatatan Sipil');
CREATE TABLE pelayanan (
  id SERIAL PRIMARY KEY,
  nama_layanan VARCHAR(255) NOT NULL,
  kategori pelayanan_kategori_enum NOT NULL,
  deskripsi TEXT NOT NULL,
  link_google_form TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE penduduk_jenis_kelamin_enum AS ENUM ('Laki-laki','Perempuan');
CREATE TABLE penduduk (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nik VARCHAR(16) NOT NULL UNIQUE,
  alamat TEXT NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin penduduk_jenis_kelamin_enum NOT NULL,
  agama VARCHAR(50) NOT NULL,
  id_kepala_keluarga INTEGER REFERENCES kepala_keluarga(id)
);

CREATE TABLE pengumuman (
  id SERIAL PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL
);

CREATE TABLE surat_keluar (
  id SERIAL PRIMARY KEY,
  nomor_surat VARCHAR(50) NOT NULL UNIQUE,
  penerima VARCHAR(100) NOT NULL,
  perihal TEXT NOT NULL,
  tanggal_kirim DATE NOT NULL,
  file VARCHAR(255)
);

CREATE TABLE surat_masuk (
  id SERIAL PRIMARY KEY,
  nomor_surat VARCHAR(50) NOT NULL UNIQUE,
  pengirim VARCHAR(100) NOT NULL,
  perihal TEXT NOT NULL,
  tanggal_terima DATE NOT NULL,
  file VARCHAR(255)
);

CREATE TYPE user_role_enum AS ENUM ('superadmin', 'admin');
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role user_role_enum NOT NULL DEFAULT 'admin',
  last_login TIMESTAMP
);

-- Foreign key for penduduk
ALTER TABLE penduduk ADD CONSTRAINT fk_kepala_keluarga FOREIGN KEY (id_kepala_keluarga) REFERENCES kepala_keluarga(id);

# 🏢 HQuarters Website — Panduan Pengelolaan WordPress CMS (README)

Panduan ini ditujukan bagi Administrator, Editor, dan Klien untuk mengelola konten dan artikel pada website **HQuarters Business Residence** (`https://hquarters.co.id/`).

---

## 📌 Ringkasan Sistem
Website HQuarters dibangun dengan arsitektur modern berkecepatan tinggi (*Headless React + WordPress REST API*):
* **WordPress Dashboard (`/wp-admin`)**: Digunakan sebagai CMS terpusat untuk mengelola copywriting halaman, artikel/berita wawasan, dan optimasi SEO.
* **Frontend React (`/id` & `/en`)**: Menampilkan halaman dengan performa 99–100, terhubung secara instan (*live hydration*) ke WordPress REST API `/wp-json/hq/v1/content`.

---

## 🔑 1. Cara Mengakses WordPress Admin
1. Buka browser dan kunjungi: **`https://hquarters.co.id/wp-admin/`**
2. Masukkan **Username** dan **Password** akun Anda.
3. Setelah login, Anda akan melihat dashboard admin WordPress.

---

## ✏️ 2. Mengedit Copywriting Website (HQuarters CMS)

Di sidebar sebelah kiri, klik menu dengan ikon gedung: **`HQuarters CMS`**.

Di dalam menu ini terdapat 3 tab utama:
* **🇮🇩 Versi Indonesia (`?tab=id`)**: Untuk mengedit konten pada versi bahasa Indonesia (`https://hquarters.co.id/id/`).
* **🇬🇧 Versi English (`?tab=en`)**: Untuk mengedit konten pada versi bahasa Inggris (`https://hquarters.co.id/en/`).
* **📖 Panduan & Dokumentasi (`?tab=readme`)**: Ringkasan panduan penggunaan langsung di dalam WordPress.

### 🛡️ Keamanan Antar Bahasa (Anti-Overwrite):
> Setiap tab bahasa bersifat **100% independen**.  
> Mengedit dan menyimpan teks pada tab **Indonesia** tidak akan pernah menimpa atau merusak versi **English**, begitu pun sebaliknya.

### Bagian-Bagian yang Dapat Diedit:
1. **Beranda (Homepage):**
   * *Deskripsi Hero Utama*: Paragraf pembuka di bawah judul utama.
   * *Lokasi Gedung*: Badge, teks awal judul, teks highlight (oranye), deskripsi, dan tombol penunjuk arah.
   * *Fasilitas Gedung*: Judul fasilitas di beranda.
2. **Bagian Bawah & CTA (Call to Action):**
   * *Judul CTA*: Teks awal & teks highlight oranye (contoh: `"Sedang mencari ruang"` + `"untuk bisnis?"`).
   * *Deskripsi CTA*: Penjelasan konsultasi ruang kantor.
   * *Teks Tombol*: Label tombol aksi (contoh: `"Hubungi HQuarters"`).
3. **Footer Website:**
   * *Tagline/Deskripsi Ringkas*: Teks deskripsi gedung di bawah logo.
   * *Alamat Lengkap*: Alamat Jl. Asia Afrika No. 158.
   * *Telepon / WhatsApp*: Nomor kontak resmi.
   * *Email*: Alamat email resmi.
   * *Teks Hak Cipta (Copyright)*: Teks copyright di baris paling bawah.
4. **Pilihan Ruang (Spaces Hub):**
   * Judul dan deskripsi pilihan unit kerja.
5. **SOHO (Small Office Home Office):**
   * *Headline*: Judul oranye diferensiasi unit (contoh: `"Dua fungsi dalam satu unit"`).
   * *Deskripsi Headline*: Tata ruang fleksibel.
   * *Judul Aktivitas*: Headline sebelum galeri aktivitas unit.
6. **Premium Office & 3 Kartu Informasi:**
   * *Headline Pertumbuhan*: Headline oranye sebelum galeri kantor.
   * *Deskripsi Headline*.
   * *Kartu 1 (Kapasitas Kantor)*: Label, Judul, Deskripsi, dan Teks Tombol CTA.
   * *Kartu 2 (Tata Ruang Kantor)*: Label, Judul, Deskripsi, dan Teks Tombol CTA.
   * *Kartu 3 (Fasilitas Gedung)*: Label, Judul, Deskripsi, dan Teks Tombol CTA.
7. **Virtual Office & Serviced Office:**
   * Subheadline dan teks deskripsi legalitas & kesiapan unit.
8. **Halaman Fasilitas Gedung & Lokasi:**
   * Judul & deskripsi hero halaman fasilitas dan lokasi strategis.

### Cara Menyimpan:
* Setelah melakukan perubahan teks, klik tombol oranye **Simpan Perubahan** di bagian bawah halaman.
* Teks akan tersimpan ke sistem dan otomatis tampil di website live.

---

## 📰 3. Mengelola Berita & Artikel Wawasan (Insights)

Artikel yang tampil di halaman **Wawasan / Artikel** dikelola melalui menu standar WordPress:

1. Klik menu **Posts** (Artikel) di sidebar sebelah kiri.
2. **Menambah Artikel Baru:**
   * Klik tombol **Add New Post** (Tambah Baru).
   * Masukkan **Judul Artikel** dan **Isi Artikel**.
   * Di panel sebelah kanan:
     * Pilih **Categories** (Kategori).
     * Unggah **Featured Image** (Gambar Unggulan) yang akan tampil sebagai thumbnail.
   * Klik tombol **Publish** (Terbitkan).
3. **Mengedit Artikel:**
   * Arahkan kursor ke judul artikel di daftar `Posts`, lalu klik **Edit**.
   * Lakukan revisi konten, lalu klik **Update**.

---

## 🔍 4. Optimasi SEO (Yoast SEO)

Plugin **Yoast SEO** telah terpasang dan aktif di seluruh halaman dan artikel:
* Saat membuat atau mengedit halaman/post, gulir ke bagian bawah editor hingga menemukan kotak **Yoast SEO**.
* Anda dapat mengatur:
  * **Focus keyphrase**: Kata kunci pencarian target (contoh: `SOHO Bandung`, `Sewa Kantor Asia Afrika`).
  * **SEO title**: Judul yang akan tampil di hasil pencarian Google.
  * **Meta description**: Ringkasan 1–2 kalimat yang menarik calon pengunjung di Google.

---

## 💡 5. Tips & Troubleshooting

1. **Perubahan Teks Belum Muncul di Layar Anda?**
   * Browser sering menyimpan cache lokal (*browser cache*).
   * Lakukan **Hard Refresh**:
     * **Google Chrome / Edge (Windows):** Tekan `Ctrl + F5` atau `Ctrl + Shift + R`.
     * **Safari / Chrome (Mac):** Tekan `Cmd + Shift + R` (atau buka Safari > Kosongkan Cache `Option + Cmd + E`).
2. **Warna Teks Highlight:**
   * Pada field yang memiliki input terpisah (contoh: *Judul Prefix* dan *Judul Highlight*), teks yang dimasukkan pada kolom highlight akan otomatis diberi aksen warna emas/oranye resmi HQuarters (`#EA8E18`).
3. **Karakter Khusus / Baris Baru:**
   * Untuk teks deskripsi panjang (*textarea*), penulisan langsung rapi tanpa perlu menambahkan tag HTML.
4. **Bantuan Teknis:**
   * Jika ada kendala teknis atau kebutuhan penambahan section baru, hubungi tim developer pengelola website.

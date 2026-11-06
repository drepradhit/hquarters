# 🏢 HQuarters Website — Panduan Pengelolaan WordPress CMS & Headless Content Management (README)

Panduan resmi ini ditujukan bagi Administrator, Editor, dan Klien untuk mengelola seluruh konten, gambar, denah lantai (*floor plan*), harga unit, promo, visibilitas section, dan artikel pada website **HQuarters Business Residence** (`https://hquarters.co.id/`).

---

## 📌 Ringkasan Arsitektur Sistem

Website HQuarters dibangun dengan arsitektur modern berstandar enterprise (*Headless React SPA + WordPress REST API*):

1. **WordPress Backend (`/wp-admin`)**:
   Berfungsi sebagai Content Management System (CMS) terpusat untuk mengelola seluruh data website: teks copywriting, gambar dan denah lantai melalui WordPress Media Library, spesifikasi unit, status ketersediaan, popup promo, nomor WhatsApp resmi, artikel wawasan, dan konfigurasi Yoast SEO.
2. **Frontend React SPA (`/id` & `/en`)**:
   Menghadirkan performa maksimal dengan skor Google PageSpeed 99–100, navigasi instan tanpa reload, animasi interaktif halus, dan hidrasi data langsung (*live hydration*) dari endpoint REST API WordPress `/wp-json/hq/v1/content`.
3. **Mengapa tidak menggunakan Elementor Page Builder untuk halaman utama?**
   Elementor adalah builder monolitik tradisional berbasis PHP yang menghasilkan ribuan baris DOM berlebih dan file CSS/JS besar, yang akan menurunkan skor kecepatan website ke angka 30–40 serta merusak responsivitas mobile. Dengan arsitektur Headless CMS yang diterapkan, klien mendapatkan **dua keunggulan sekaligus**:
   * Website super cepat (PageSpeed 99–100) dan berstandar internasional.
   * Klien tetap dapat mengedit **100% konten, gambar, denah, harga, fasilitas, dan visibilitas section secara mandiri** langsung dari WordPress tanpa bantuan developer untuk perubahan rutin.

---

## 🔑 1. Cara Mengakses WordPress Admin

1. Buka browser dan kunjungi: **`https://hquarters.co.id/wp-admin/`**
2. Masukkan **Username** dan **Password** akun Anda.
3. Setelah login, Anda akan melihat Dashboard WordPress dengan widget pintasan **🏢 HQuarters CMS — Pusat Pengelolaan Konten Website**.

---

## ⚡ 2. Dua Jalur Pengelolaan Konten Halaman

Anda dapat mengelola halaman website melalui 2 jalur yang saling terhubung:

### Jalur A: Lewat Menu Standar WordPress `Pages` (Halaman)
1. Buka menu **Pages > All Pages** di sidebar sebelah kiri.
2. Pada daftar halaman (seperti `SOHO (ID)`, `Premium Office (ID)`, `Function Room (ID)`, `Home (EN)`, dll.), arahkan kursor ke judul halaman.
3. Klik tombol **⚡ Edit Konten HQuarters** untuk langsung membuka formulir pengeditan halaman tersebut.
4. Atau klik **Edit** untuk membuka editor halaman WordPress: di bagian bawah halaman terdapat kotak **Meta Box HQuarters** yang menyediakan tautan langsung ke live preview dan formulir CMS.

### Jalur B: Lewat Menu Terpusat `HQuarters CMS`
1. Klik menu berikon gedung **`HQuarters CMS`** di sidebar sebelah kiri.
2. Pilih tab navigasi di bagian atas:
   * **🇮🇩 Versi Indonesia (`?tab=id`)**: Mengontrol seluruh konten pada URL `https://hquarters.co.id/id/`.
   * **🇬🇧 Versi English (`?tab=en`)**: Mengontrol seluruh konten pada URL `https://hquarters.co.id/en/`.
   * **⚙️ Global, WA & Promo (`?tab=global`)**: Nomor WhatsApp resmi, toggle popup promo, banner promo, dan toggle visibilitas section.
   * **🕒 Riwayat & Restore (`?tab=history`)**: Daftar riwayat versi tersimpan dan tombol pemulihan (*rollback*) 1-klik.
   * **📖 Panduan / README (`?tab=readme`)**: Dokumentasi panduan lengkap.

> [!IMPORTANT]
> **Keamanan Multi-Bahasa (Anti-Overwrite):**  
> Tab bahasa Indonesia dan bahasa Inggris bersifat **100% terisolasi dan independen**. Menyimpan data di tab Indonesia tidak akan pernah menimpa atau mengosongkan versi bahasa Inggris, begitu pula sebaliknya.

---

## 🖼️ 3. Mengganti Gambar, Galeri, dan Denah Lantai (Media Library)

Klien tidak perlu menyalin link manual. Sistem telah terintegrasi dengan **WordPress Media Library** bawaan:

1. Pada kolom gambar (misal: *Foto Utama Unit SOHO*, *Denah Lantai*, *Foto Layout Function Room*, atau *Banner Promo*), klik tombol **Pilih dari Media Library**.
2. Jendela galeri WordPress akan terbuka:
   * **Pilih Foto yang Sudah Ada**: Klik salah satu foto yang ada di Media Library, lalu klik tombol **Gunakan Gambar Ini**.
   * **Upload Foto Baru**: Klik tab *Upload files*, seret (*drag & drop*) file dari komputer (format JPG, PNG, atau WebP), lalu klik **Gunakan Gambar Ini**.
3. Thumbnail preview gambar akan langsung tampil di formulir admin.
4. Klik tombol oranye **Simpan Perubahan** di bagian bawah layar. Gambar di website frontend akan langsung berubah secara instan.

---

## 🎯 4. Jawaban Terperinci atas 5 Pertanyaan Klien

### 1. SEO: Bagaimana title, meta description, canonical, dan schema dari Yoast diterapkan ke React?
* **Penerapan Teknis:**  
  Setiap halaman frontend React terhubung langsung dengan WordPress REST API. Saat halaman dimuat, file HTML awal (*pre-rendered HTML*) sudah memuat tag `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph Facebook, dan Twitter Card yang berasal dari konfigurasi Yoast SEO di WordPress.
* **Perpindahan Halaman (Client-Side Navigation):**  
  Ketika pengunjung berpindah antar halaman (misal dari `/id/` ke `/id/spaces/soho`), modul `updatePageSEO()` secara otomatis memperbarui `document.title`, deskripsi meta, dan canonical URL sesuai data Yoast SEO halaman tersebut.
* **Contoh Hasil Live:**
  * **Halaman Beranda ID (`/id/`):**
    * Title: `Sewa Kantor Bandung & SOHO Asia Afrika | HQuarters Business Residence`
    * Meta Description: `Gedung kantor modern dan SOHO di Jl. Asia Afrika No. 158 CBD Bandung. Menyediakan Virtual Office, Serviced Office, Premium Office, dan Function Room.`
    * Canonical URL: `https://hquarters.co.id/id/`
  * **Halaman SOHO ID (`/id/spaces/soho`):**
    * Title: `SOHO Bandung — Ruang Kerja & Hunian Fleksibel | HQuarters`
    * Canonical URL: `https://hquarters.co.id/id/spaces/soho`

---

### 2. Pemetaan Halaman: URL Website vs Menu WordPress

Berikut tabel pemetaan lengkap antara halaman WordPress, tab CMS, dan URL live frontend:

| Nama Produk / Halaman | Halaman WordPress (Pages) | ID Post | Tab di HQuarters CMS | Live URL Indonesia (/id) | Live URL English (/en) |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Beranda (Home)** | `hquarters-home` / `home-en` | 6712 / 6395 | Section 1: Beranda | `https://hquarters.co.id/id/` | `https://hquarters.co.id/en/` |
| **Pilihan Ruang (Hub)** | `spaces` / `spaces-en` | 6403 / 6723 | Section 1: Pilihan Ruang | `https://hquarters.co.id/id/spaces` | `https://hquarters.co.id/en/spaces` |
| **SOHO Duplex** | `soho` / `soho-en` | 6419 / 6766 | Section 2: SOHO | `https://hquarters.co.id/id/spaces/soho` | `https://hquarters.co.id/en/spaces/soho` |
| **Premium Office** | `premium-office` / `prem-en` | 6411 / 6757 | Section 3: Premium Office | `https://hquarters.co.id/id/spaces/premium-office` | `https://hquarters.co.id/en/spaces/premium-office` |
| **Serviced Office** | `serviced-office` / `so-en` | 6427 / 6773 | Section 5: Serviced Office | `https://hquarters.co.id/id/spaces/serviced-office` | `https://hquarters.co.id/en/spaces/serviced-office` |
| **Virtual Office** | `virtual-office` / `vo-en` | 6435 / 6778 | Section 5: Virtual Office | `https://hquarters.co.id/id/spaces/virtual-office` | `https://hquarters.co.id/en/spaces/virtual-office` |
| **Function Room (Events)** | `events` / `events-en` | 6443 / 6752 | Section 4: Function Room | `https://hquarters.co.id/id/events` | `https://hquarters.co.id/en/events` |
| **Fasilitas Gedung** | `building` / `building-en` | 6452 / 6734 | Section 6: Gedung | `https://hquarters.co.id/id/building` | `https://hquarters.co.id/en/building` |
| **Lokasi Gedung** | `location` / `location-en` | 6473 / 6739 | Section 6: Lokasi | `https://hquarters.co.id/id/location` | `https://hquarters.co.id/en/location` |
| **Daftar Tenant** | `companies` / `companies-en` | 6463 / 6747 | Posts & Content | `https://hquarters.co.id/id/companies` | `https://hquarters.co.id/en/companies` |
| **Konsultasi Ruang** | `find-space` / `find-space-en` | 6481 / 6799 | Form Konsultasi | `https://hquarters.co.id/id/find-space` | `https://hquarters.co.id/en/find-space` |
| **Wawasan & Artikel** | `Posts > All Posts` | — | WordPress Posts | `https://hquarters.co.id/id/insights` | `https://hquarters.co.id/en/insights` |

---

### 3. Preview dan Pemulihan Versi (Drafts & Rollback)
* **Live Preview:**  
  Di setiap halaman edit WordPress maupun di formulir HQuarters CMS, tersedia tombol **🔗 Lihat Halaman Live** untuk langsung mengecek tampilan di frontend.
* **Sistem Pemulihan Otomatis (Version History & Rollback):**  
  Setiap kali pengguna mengklik tombol **Simpan Perubahan**, sistem secara otomatis menyimpan cadangan (*snapshot*) versi sebelumnya (merekam tanggal, jam, dan nama editor).
* **Cara Mengembalikan Versi Sebelumnya:**
  1. Buka menu `HQuarters CMS` > klik tab **🕒 Riwayat & Restore**.
  2. Pilih versi yang ingin dikembalikan dari tabel riwayat.
  3. Klik tombol **🔄 Pulihkan (Restore)**. Seluruh data konten akan kembali ke kondisi versi tersebut seketika.

---

### 4. Pembuatan Halaman Baru / Landing Page Mandiri
* **Menambah Berita & Artikel Baru (100% Mandiri):**  
  Dikelola secara mandiri melalui menu standar WordPress `Posts > Add New Post`. Artikel baru otomatis memiliki layout artikel modern, featured image, tombol share, reading progress bar, dan tombol chat WhatsApp.
* **Membuat Landing Page Promosi Khusus:**  
  Jika klien membuat halaman baru di WordPress (`Pages > Add New`), halaman tersebut dapat dipublikasikan menggunakan template standar WordPress. Jika landing page membutuhkan tata letak interaktif khusus (animasi 3D atau formulir kustom), tim pengembang dapat mendaftarkan rute React baru dalam waktu singkat.

---

### 5. Panduan Lengkap: Komponen & Section yang Dapat Dikelola

Berikut daftar lengkap seluruh section dan komponen yang dapat diedit 100% mandiri per halaman:

#### A. Beranda (Homepage)
* **Hero Utama**: Deskripsi pengantar hero.
* **Lokasi Gedung**: Badge lokasi, teks judul awalan, teks judul highlight (oranye), paragraf deskripsi, teks tombol petunjuk arah.
* **Fasilitas Gedung**: Judul seksi fasilitas.
* **Section Visibility Toggle**: Opsi menampilkan / menyembunyikan logo tenant partner dan amenities.

#### B. SOHO (Small Office Home Office)
* **Media & Visual**: Foto utama unit SOHO (Media Library picker), Denah lantai / *floor plan* arsitektur (Media Library picker).
* **Harga & Ketersediaan**: Input teks harga mulai dari (contoh: *"Hubungi Tim Leasing"* atau nominal), Dropdown status ketersediaan unit (*"Tersedia"*, *"Unit Terbatas"*, *"Sold Out"*).
* **Spesifikasi Teknis**: Luas unit (contoh: *"80 - 120 m²"*), Pilihan lantai (*"Lantai 3–16"*), Kapasitas daya listrik (*"5.500 - 11.000 VA"*), Tinggi plafon (*"3.2 Meter"*).
* **Teks & Konten**: Headline pembeda unit, deskripsi headline, judul aktivitas unit.

#### C. Premium Office (Corporate Floors)
* **Media & Visual**: Foto utama suite Premium Office (Media Library picker), Denah tata ruang lantai korporat (Media Library picker).
* **Harga & Ketersediaan**: Input harga mulai, dropdown status ketersediaan (*"Tersedia"*, *"Unit Terbatas"*).
* **Spesifikasi Teknis**: Luas lantai (*"120 - 450 m²"*), Kekuatan beban lantai / *floor load* (*"250 kg/m²"*), Tinggi plafon (*"3.6 Meter"*).
* **3 Kartu Informasi Layanan**:
  * *Kartu 1 (Kapasitas Kantor)*: Label, judul kartu, isi deskripsi, teks tombol CTA.
  * *Kartu 2 (Tata Ruang Kantor)*: Label, judul kartu, isi deskripsi, teks tombol CTA.
  * *Kartu 3 (Fasilitas Gedung)*: Label, judul kartu, isi deskripsi, teks tombol CTA.

#### D. Function Room & Event Spaces
* **Media & Visual**: Foto layout Theatre (Media Library picker), Denah tata ruang function room (Media Library picker).
* **Harga Sewa**: Input teks harga sewa (contoh: *"Mulai Rp 1.500.000 / Jam"*).
* **Kapasitas Layout**:
  * *Theatre Setup*: Kapasitas pax (contoh: *"Hingga 280 Pax"*).
  * *Classroom Setup*: Kapasitas pax (contoh: *"Hingga 140 Pax"*).
  * *U-Shape Setup*: Kapasitas pax (contoh: *"Hingga 70 Pax"*).
  * *Round Table Banquet*: Kapasitas pax (contoh: *"Hingga 120 Pax"*).
* **Spesifikasi & Fasilitas**: Tinggi plafon akustik (*"3.8 Meter"*), deskripsi hero.

#### E. Serviced Office & Virtual Office
* **Serviced Office**: Subheadline, deskripsi kesiapan operasional, teks harga sewa (contoh: *"Mulai Rp 2.500.000 / Pax / Bulan"*).
* **Virtual Office**: Subheadline, deskripsi alamat legalitas, teks harga paket domisili (contoh: *"Mulai Rp 450.000 / Bulan"*).

#### F. Pengaturan Global, WhatsApp & Promo Modal (Tab `⚙️ Global, WA & Promo`)
* **Nomor WhatsApp Resmi**: Mengubah nomor kontak WhatsApp utama yang terhubung ke seluruh tombol chat di website (Header, Floating WhatsApp, Promo Modal, Footer).
* **Pesan Pembuka WhatsApp**: Mengatur teks pesan default saat calon klien menekan tombol WhatsApp.
* **Promo Modal Popup (Work. Live. Invest)**:
  * Checkbox aktifkan / nonaktifkan popup promo saat pengunjung scroll halaman.
  * Banner poster promo (Pilih file langsung dari Media Library).
  * Teks tombol aksi WhatsApp promo.
* **Toggle Visibilitas Section**:
  * Tampilkan / sembunyikan section logo tenant (*Partners*).
  * Tampilkan / sembunyikan section fasilitas gedung (*Building Highlights*).
  * Tampilkan / sembunyikan tombol mengapung *Floating WhatsApp*.
  * Tampilkan / sembunyikan section *CTA Konsultasi Bawah*.

---

## 💡 5. Tips & Troubleshooting

1. **Perubahan Belum Tampil di Browser Anda?**
   Browser sering menyimpan cache aset lama. Lakukan **Hard Refresh**:
   * **Google Chrome / Edge (Windows):** Tekan `Ctrl + F5` atau `Ctrl + Shift + R`.
   * **Safari / Chrome (Mac):** Tekan `Cmd + Shift + R` (atau buka menu Safari > *Clear Cache* via `Option + Cmd + E`).
2. **Teks Highlight Berwarna Oranye:**
   Pada kolom formulir yang terbagi dua (*Teks Awalan* dan *Teks Highlight*), teks yang dimasukkan pada kolom kedua secara otomatis diberi aksen warna emas/oranye resmi HQuarters (`#EA8E18`).
3. **Format Nomor WhatsApp:**
   Gunakan format nomor internasional dengan awalan `+62` atau `62` (contoh: `+62 811-1908-319`). Sistem secara otomatis membersihkan spasi dan tanda minus saat membuat tautan chat `wa.me`.

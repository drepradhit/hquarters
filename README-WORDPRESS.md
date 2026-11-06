# 🏢 BUKU PANDUAN LENGKAP PENGELOLAAN WEBSITE HQUARTERS
### Panduan Pengoperasian WordPress CMS & Pengelolaan Konten Mandiri
**Website Resmi:** [https://hquarters.co.id/](https://hquarters.co.id/)  
**Dashboard CMS:** [https://hquarters.co.id/wp-admin/](https://hquarters.co.id/wp-admin/)

---

## 📋 DAFTAR ISI
1. [Mengenal Arsitektur Website](#1-mengenal-arsitektur-website)
2. [Cara Login ke Dashboard WordPress](#2-cara-login-ke-dashboard-wordpress)
3. [Dua Cara Membuka Halaman yang Ingin Diedit](#3-dua-cara-membuka-halaman-yang-ingin-diedit)
4. [Tutorial Langkah demi Langkah (Step-by-Step) Per Halaman](#4-tutorial-langkah-demi-langkah-step-by-step-per-halaman)
   - [A. Mengedit Halaman Beranda (Home)](#a-mengedit-halaman-beranda-home)
   - [B. Mengedit SOHO Duplex (Foto, Denah, Harga, Ketersediaan, Spesifikasi)](#b-mengedit-soho-duplex)
   - [C. Mengedit Premium Office (Foto Suite, Denah, Kapasitas, 3 Kartu Layanan)](#c-mengedit-premium-office)
   - [D. Mengedit Function Room & Event Spaces (Layout, Kapasitas, Denah, Harga Sewa)](#d-mengedit-function-room--event-spaces)
   - [E. Mengedit Serviced Office & Virtual Office (Paket, Harga, Fasilitas)](#e-mengedit-serviced-office--virtual-office)
   - [F. Mengedit Halaman Fasilitas Gedung & Lokasi](#f-mengedit-halaman-fasilitas-gedung--lokasi)
   - [G. Mengedit Banner CTA Konsultasi & Footer Website](#g-mengedit-banner-cta-konsultasi--footer-website)
5. [Tutorial Mengganti Gambar & Upload Denah (Media Library)](#5-tutorial-mengganti-gambar--upload-denah-media-library)
6. [Tutorial Pengaturan Global, WhatsApp & Popup Promo](#6-tutorial-pengaturan-global-whatsapp--popup-promo)
   - [Mengubah Nomor WhatsApp Resmi](#mengubah-nomor-whatsapp-resmi)
   - [Mengatur Popup Promo & Banner Poster](#mengatur-popup-promo--banner-poster)
   - [Menampilkan / Menyembunyikan Section Website (Toggle)](#menampilkan--menyembunyikan-section-website-toggle)
7. [Tutorial Mengelola Artikel & Berita Wawasan (Insights)](#7-tutorial-mengelola-artikel--berita-wawasan-insights)
8. [Tutorial Optimasi SEO Google (Yoast SEO)](#8-tutorial-optimasi-seo-google-yoast-seo)
9. [Tutorial Preview & Mengembalikan Versi Sebelumnya (Restore / Rollback)](#9-tutorial-preview--mengembalikan-versi-sebelumnya-restore--rollback)
10. [Tabel Pemetaan Lengkap (Halaman WordPress vs URL Website)](#10-tabel-pemetaan-lengkap-halaman-wordpress-vs-url-website)
11. [Tanya Jawab & Pemecahan Masalah (Troubleshooting)](#11-tanya-jawab--pemecahan-masalah-troubleshooting)

---

## 1. Mengenal Arsitektur Website

Website **HQuarters Business Residence** dibangun dengan teknologi **Headless Architecture berstandar internasional**:
1. **Frontend Modern (React SPA):** Menghasilkan website dengan kecepatan luar biasa (**Google PageSpeed Score 99–100**, waktu muat <0.5 detik), navigasi instan tanpa refresh halaman, dan animasi yang elegan.
2. **Backend WordPress CMS:** Berfungsi sebagai pusat pengelolaan data bagi Anda. Anda dapat mengubah teks, mengganti foto dari Media Library, mengunggah denah lantai, memperbarui harga unit, mengatur status ketersediaan, hingga menyembunyikan/menampilkan section secara **100% mandiri tanpa bantuan developer untuk perubahan rutin**.

> [!NOTE]
> **Mengapa tidak menggunakan Elementor untuk halaman utama?**  
> Elementor menghasilkan kode berlebih (*DOM bloated*) yang membuat skor kecepatan turun drastis ke angka 30-an dan memperlambat akses bagi calon penyewa. Dengan sistem yang kami bangun, Anda mendapatkan kemudahan mengedit seperti di CMS biasa, namun website tetap berkinerja secepat kilat.

---

## 2. Cara Login ke Dashboard WordPress

1. Buka browser (Google Chrome, Safari, atau Edge).
2. Kunjungi alamat: **`https://hquarters.co.id/wp-admin/`**
3. Masukkan **Username** dan **Password** admin Anda.
4. Klik tombol **Log In**.
5. Setelah berhasil masuk, Anda akan disambut oleh widget pintasan **🏢 HQuarters CMS — Pusat Pengelolaan Konten Website** pada halaman depan dashboard.

---

## 3. Dua Cara Membuka Halaman yang Ingin Diedit

Anda dapat membuka dan mengedit konten melalui 2 jalur yang saling terhubung:

### Jalur 1: Dari Menu Standar WordPress `Pages` (Halaman)
Cocok jika Anda sudah terbiasa dengan menu halaman WordPress:
1. Di sidebar sebelah kiri, klik **Pages > All Pages**.
2. Arahkan kursor ke nama halaman yang ingin diedit (misal: `SOHO (ID)`, `Premium Office (ID)`, `Function Room (ID)`).
3. Klik tautan teks berwarna oranye: **`⚡ Edit Konten HQuarters`**.
4. Anda akan langsung diarahkan ke bagian formulir pengeditan halaman tersebut.

### Jalur 2: Dari Menu Terpusat `HQuarters CMS` (Direkomendasikan)
Cocok jika Anda ingin mengelola seluruh website dalam satu dasbor yang rapi:
1. Di sidebar sebelah kiri, klik menu berikon gedung **`HQuarters CMS`**.
2. Pilih salah satu tab di bagian atas:
   * **🇮🇩 Versi Indonesia (`?tab=id`)**: Mengedit konten website bahasa Indonesia (`https://hquarters.co.id/id/`).
   * **🇬🇧 Versi English (`?tab=en`)**: Mengedit konten website bahasa Inggris (`https://hquarters.co.id/en/`).
   * **⚙️ Global, WA & Promo (`?tab=global`)**: Nomor WhatsApp resmi, promo popup, dan saklar visibilitas section.
   * **🕒 Riwayat & Restore (`?tab=history`)**: Memulihkan versi konten sebelumnya jika ada kesalahan input.
   * **📖 Panduan / README (`?tab=readme`)**: Membaca panduan resmi ini di dalam WordPress.

> [!IMPORTANT]
> **Keamanan Multi-Bahasa (Anti-Overwrite):**  
> Tab Indonesia dan English dikelola secara **100% terpisah dan terisolasi**. Menyimpan perubahan di versi Indonesia tidak akan pernah menimpa atau menghapus versi English, begitu pula sebaliknya.

---

## 4. Tutorial Langkah demi Langkah (Step-by-Step) Per Halaman

---

### A. Mengedit Halaman Beranda (Home)
Digunakan untuk mengubah teks pembuka di bagian paling atas website dan seksi perkenalan lokasi.

1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **1. Beranda (Home / Hero Utama & Lokasi)**:
   * **Deskripsi Hero Utama:** Ketik paragraf pembuka di bawah judul utama (contoh: *"Ruang bisnis modern yang fleksibel, dalam satu gedung di jalan asia afrika CBD bandung"*).
   * **Badge Lokasi Gedung:** Teks label kecil di atas judul lokasi (contoh: *"LOKASI GEDUNG"*).
   * **Judul Lokasi Gedung:** 
     * Kolom 1 (*Teks awal*): Teks biasa berwarna gelap (contoh: *"Di Jl. Asia Afrika,"*).
     * Kolom 2 (*Teks oranye*): Teks highlight otomatis berwarna emas/oranye HQuarters (contoh: *"Bandung"*).
   * **Deskripsi Lokasi Gedung:** Teks penjelasan keunggulan lokasi di koridor bisnis Asia Afrika.
   * **Teks Tombol Lokasi:** Label tombol penunjuk arah (contoh: *"Buka petunjuk arah"*).
   * **Judul Fasilitas di Beranda:** Judul seksi fasilitas yang tampil di beranda (contoh: *"Fasilitas Gedung"*).
3. Gulir ke bagian paling bawah layar, klik tombol oranye **Simpan Perubahan**.

---

### B. Mengedit SOHO Duplex
Digunakan untuk mengelola unit Small Office Home Office (foto, denah, harga, ketersediaan, dan spesifikasi unit).

1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **2. SOHO (Small Office Home Office)**:
   * **Foto Utama / Hero Unit SOHO:** Klik tombol **Pilih dari Media Library** untuk mengganti foto utama unit SOHO.
   * **Denah Lantai / Floor Plan SOHO:** Klik tombol **Pilih dari Media Library** untuk mengunggah denah arsitektur unit. Jika diisi, seksi denah lantai akan otomatis tampil elegan di halaman SOHO.
   * **Headline SOHO:** Judul diferensiasi konsep SOHO (contoh: *"Dua fungsi dalam satu unit"*).
   * **Deskripsi Headline SOHO:** Penjelasan perpaduan ruang kerja dan hunian privat.
   * **Harga Mulai Unit SOHO:** Teks harga awal (contoh: *"Mulai Rp 1.9 Miliar"* atau *"Hubungi Tim Leasing"*). Teks ini tampil pada tombol aksi cek unit.
   * **Status Ketersediaan Unit:** Pilih salah satu dari dropdown:
     * `Tersedia (Available)`: Ditampilkan dengan badge status hijau/emas.
     * `Unit Terbatas (Limited Units)`: Memberikan kesan urgensi (*scarcity*) bagi calon pembeli.
     * `Sold Out / Penuh`: Jika unit sedang tidak tersedia.
   * **Ukuran Unit SOHO:** Contoh: `80 - 120 m²`.
   * **Pilihan Lantai:** Contoh: `Lantai 3-16`.
   * **Kapasitas Listrik:** Contoh: `5.500 - 11.000 VA`.
   * **Tinggi Plafon:** Contoh: `3.2 Meter`.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

### C. Mengedit Premium Office
Digunakan untuk mengelola ruang kantor skala korporasi dan lantai perkantoran.

1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **3. Premium Office (Korporasi & Corporate Floors)**:
   * **Foto Utama / Hero Premium Office:** Klik tombol **Pilih dari Media Library** untuk mengganti foto suite kantor korporasi.
   * **Denah Lantai / Floor Plan:** Klik tombol **Pilih dari Media Library** untuk mengunggah denah lantai tipikal kantor.
   * **Headline Pertumbuhan Kantor:** Contoh: *"Perusahaan Telah Bertumbuh. Saatnya Kantor Anda Berkembang."*
   * **Deskripsi Headline:** Penjelasan kantor sebagai representasi identitas korporasi.
   * **Rentang Ukuran Ruang:** Contoh: `120 - 450 m²` atau `Satu Lantai Penuh (Full Floor Plate)`.
   * **Kekuatan Beban Lantai (Floor Load):** Contoh: `250 kg/m²`.
   * **Tinggi Plafon:** Contoh: `3.6 Meter`.
   * **Status Ketersediaan:** Pilih `Tersedia` atau `Unit Terbatas`.
   * **3 Kartu Informasi Layanan (Kapasitas, Tata Ruang, Fasilitas):**
     * Anda dapat mengubah judul kartu, teks deskripsi panduan, dan teks tombol konsultasi pada masing-masing dari 3 kartu informasi.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

### D. Mengedit Function Room & Event Spaces
Digunakan untuk mengelola ruang pertemuan, seminar, pelatihan, dan perjamuan resmi.

1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **4. Function Room & Event Spaces**:
   * **Judul Hero Function Room:** Contoh: *"Function Room & Ruang Konferensi Modern"*.
   * **Deskripsi Hero:** Penjelasan fasilitas ruang serbaguna di pusat kota Bandung.
   * **Harga Sewa Mulai:** Contoh: *"Mulai Rp 1.500.000 / Jam"* atau *"Paket Half-Day & Full-Day"*.
   * **Kapasitas Layout Theatre:** Contoh: `Hingga 280 Pax` (atau sesuaikan dengan konfigurasi terbaru).
   * **Kapasitas Layout Classroom:** Contoh: `Hingga 140 Pax`.
   * **Kapasitas Layout U-Shape:** Contoh: `Hingga 70 Pax`.
   * **Kapasitas Layout Round Table (Banquet):** Contoh: `Hingga 120 Pax`.
   * **Tinggi Plafon Akustik:** Contoh: `3.8 Meter`.
   * **Foto Layout Theatre:** Klik tombol **Pilih dari Media Library** untuk mengganti foto susunan kursi theatre.
   * **Denah Tata Ruang Function Room:** Klik tombol **Pilih dari Media Library** untuk memasang denah tata letak ruangan.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

### E. Mengedit Serviced Office & Virtual Office
Digunakan untuk ruang kerja siap pakai (*move-in ready*) dan alamat legalitas bisnis.

1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **5. Serviced Office & Virtual Office**:
   * **Serviced Office - Subheadline:** Contoh: *"Ruang yang Siap Operasional Sejak Hari Pertama"*.
   * **Serviced Office - Deskripsi:** Penjelasan tanpa biaya renovasi (*zero fit-out cost*), furnished, dan internet cepat.
   * **Serviced Office - Harga Mulai:** Contoh: *"Mulai Rp 2.500.000 / Pax / Bulan"*.
   * **Virtual Office - Subheadline:** Contoh: *"Alamat Bisnis yang Membangun Kepercayaan"*.
   * **Virtual Office - Deskripsi:** Penjelasan alamat zonasi perkantoran komersial untuk legalitas PT/CV.
   * **Virtual Office - Harga Mulai:** Contoh: *"Mulai Rp 450.000 / Bulan"*.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

### F. Mengedit Halaman Fasilitas Gedung & Lokasi
1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **6. Halaman Gedung & Lokasi**:
   * **Gedung - Judul Hero & Deskripsi:** Informasi arsitektur bangunan, keamanan 24 jam, lift otomatis KONE, dan kolam renang/gym.
   * **Lokasi - Judul Hero & Deskripsi:** Informasi prestise alamat Jl. Asia Afrika No. 158 Bandung dan kedekatan dengan pusat perbankan.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

### G. Mengedit Banner CTA Konsultasi & Footer Website
1. Buka **HQuarters CMS** > pilih tab **🇮🇩 Versi Indonesia** (atau **🇬🇧 Versi English**).
2. Gulir ke bagian **7. Bagian Bawah (CTA Konsultasi & Footer)**:
   * **Judul CTA:** Terbagi atas teks awalan (contoh: *"Sedang mencari ruang"*) dan teks highlight oranye (contoh: *"untuk bisnis?"*).
   * **Deskripsi CTA:** Penjelasan konsultasi kebutuhan ruang kantor.
   * **Teks Tombol CTA:** Contoh: *"Hubungi HQuarters"* atau *"Konsultasi Gratis"*.
   * **Deskripsi Footer:** Teks perkenalan ringkas di bawah logo HQuarters pada bagian kaki halaman (*footer*).
   * **Alamat Lengkap Gedung:** Alamat resmi gedung di Jl. Asia Afrika No. 158.
   * **Teks Hak Cipta (Copyright):** Teks hak cipta di baris terbawah.
3. Klik tombol **Simpan Perubahan** di bagian bawah layar.

---

## 5. Tutorial Mengganti Gambar & Upload Denah (Media Library)

Setiap kolom gambar pada HQuarters CMS telah dilengkapi integrasi native WordPress Media Library:

1. Klik tombol **`Pilih dari Media Library`** di samping kolom input gambar yang ingin diganti.
2. Jendela pop-up Media Library WordPress akan muncul:
   * **Jika file sudah pernah diupload:** Klik tab **Media Library**, pilih foto yang diinginkan, lalu klik tombol biru **Gunakan Gambar Ini** di pojok kanan bawah.
   * **Jika ingin mengupload file baru dari komputer:** Klik tab **Upload files**, klik **Select Files** (atau tarik langsung file gambar dari folder komputer Anda ke jendela browser). Tunggu proses upload selesai, lalu klik **Gunakan Gambar Ini**.
3. URL gambar akan terisi otomatis dan thumbnail pratinjau (*preview*) akan langsung tampil di formulir admin.
4. Jika ingin menghapus atau mengosongkan gambar, klik tombol **Hapus**.
5. Klik tombol oranye **Simpan Perubahan** di bagian bawah halaman.

> [!TIP]
> **Rekomendasi Format & Ukuran Gambar:**
> * **Format:** Sangat direkomendasikan format **WebP** atau **JPG/PNG** terkompresi.
> * **Dimensi Foto Hero / Galeri:** Resolusi optimal $1920 \times 1080$ piksel (aspek rasio 16:9).
> * **Dimensi Denah Lantai (Floor Plan):** Resolusi optimal minimal lebar 1200 piksel dengan latar belakang putih atau transparan (PNG).

---

## 6. Tutorial Pengaturan Global, WhatsApp & Popup Promo

Untuk mengatur elemen global yang berdampak pada seluruh halaman website, buka menu **`HQuarters CMS`** lalu klik tab **`⚙️ Global, WA & Promo`**:

### Mengubah Nomor WhatsApp Resmi
1. Buka tab **⚙️ Global, WA & Promo**.
2. Pada bagian **1. Kontak WhatsApp Resmi**:
   * **Nomor WhatsApp Resmi:** Masukkan nomor kontak utama (contoh: `+62 811-1908-319`). Nomor ini akan otomatis memperbarui seluruh tombol chat WhatsApp di Header, Floating WhatsApp, Modal Promo, dan Footer.
   * **Pesan Default Pembuka WhatsApp:** Ketik pesan pembuka yang otomatis terisi saat calon penyewa mengklik tombol WhatsApp (contoh: *"Halo tim HQuarters Bandung! Saya ingin menanyakan tentang ketersediaan ruang kantor."*).
3. Klik **Simpan Pengaturan Global**.

### Mengatur Popup Promo & Banner Poster
Sistem dilengkapi modal pop-up promosi otomatis (*Work. Live. Invest*) yang muncul dengan animasi halus saat pengunjung scroll halaman:
1. Buka tab **⚙️ Global, WA & Promo**.
2. Pada bagian **2. Promo Popup Modal**:
   * **Aktifkan Popup Promo:** Centang kotak ini jika promo sedang berjalan, atau **hilangkan centang** jika ingin mematikan popup sementara waktu tanpa menghapus datanya.
   * **Banner Gambar Promo:** Klik tombol **Pilih dari Media Library** untuk mengganti poster promosi terbaru.
   * **Teks Tombol Aksi Promo:** Label tombol di bawah poster (contoh: *"Tanya Promo via WhatsApp"*).
3. Klik **Simpan Pengaturan Global**.

### Menampilkan / Menyembunyikan Section Website (Toggle)
Anda dapat menyembunyikan atau menampilkan section tertentu di website dengan satu klik:
1. Buka tab **⚙️ Global, WA & Promo**.
2. Pada bagian **3. Pengaturan Visibilitas Section Website**:
   * **Section Tenant / Partner Logos:** Centang untuk menampilkan baris logo perusahaan/tenant di beranda, atau hilangkan centang untuk menyembunyikannya.
   * **Section Building Highlights:** Centang untuk menampilkan ringkasan fasilitas gedung di beranda.
   * **Tombol Floating WhatsApp:** Centang untuk memunculkan tombol chat WhatsApp melayang di sudut kanan bawah layar.
   * **Section CTA Konsultasi Bawah:** Centang untuk memunculkan banner ajakan konsultasi sebelum footer.
3. Klik **Simpan Pengaturan Global**.

---

## 7. Tutorial Mengelola Artikel & Berita Wawasan (Insights)

Seluruh artikel pada halaman **Wawasan / Artikel** (`/id/insights` dan `/en/insights`) dikelola 100% mandiri melalui menu standar **Posts** di WordPress:

### Menambah Artikel Baru
1. Di sidebar sebelah kiri, klik **Posts > Add New Post**.
2. Masukkan **Judul Artikel** pada baris paling atas.
3. Tulis atau tempel (*paste*) isi artikel di area penulisan utama. Anda dapat menyisipkan sub-heading (H2, H3), paragraf, kutipan, dan foto di dalam teks.
4. Di panel pengaturan sebelah kanan (*Sidebar Settings*):
   * **Categories:** Centang kategori artikel (misal: *Memilih Kantor*, *Desain Kantor*, atau *Bisnis di Bandung*).
   * **Featured Image:** Klik *Set featured image*, lalu pilih foto sampul utama yang akan tampil di halaman daftar artikel dan thumbnail media sosial.
5. Klik tombol biru **Publish** di pojok kanan atas. Artikel akan langsung tayang secara rapi di website dengan fitur reading progress bar, tombol share, dan tautan WhatsApp otomatis.

### Mengedit atau Menghapus Artikel
1. Klik **Posts > All Posts**.
2. Cari artikel yang ingin diubah:
   * Klik **Edit** untuk memperbarui isi teks atau mengganti gambar, lalu klik **Update**.
   * Klik **Trash** jika ingin menghapus artikel.

---

## 8. Tutorial Optimasi SEO Google (Yoast SEO)

Setiap halaman dan artikel di website telah dilengkapi plugin **Yoast SEO** yang terhubung langsung ke mesin pencari Google:

1. Buka halaman atau artikel yang ingin dioptimasi (misal via `Pages > All Pages > Edit` atau `Posts > All Posts > Edit`).
2. Gulir ke bagian paling bawah editor hingga Anda menemukan kotak panel **Yoast SEO**.
3. Isi parameter penting berikut:
   * **Focus Keyphrase:** Masukkan kata kunci utama yang ditargetkan di Google (contoh: `sewa kantor bandung`, `soho bandung`, `function room bandung`).
   * **SEO Title:** Judul yang akan muncul di halaman hasil pencarian Google. Usahakan menarik dan mengandung nama brand HQuarters.
   * **Meta Description:** Ringkasan singkat 1–2 kalimat (maksimal 155 karakter) yang memicu calon klien untuk mengklik tautan Anda di Google.
4. Klik tombol **Update** pada halaman WordPress.
5. Modul frontend React akan otomatis memperbarui tag metadata HTML, canonical tag, OpenGraph Facebook, dan Twitter Card sesuai isian Yoast SEO Anda.

---

## 9. Tutorial Preview & Mengembalikan Versi Sebelumnya (Restore / Rollback)

### Melihat Pratinjau (Live Preview)
* Di setiap halaman pengeditan dan di formulir HQuarters CMS, klik tombol **🔗 Lihat Halaman Live** untuk membuka halaman website frontend di tab baru dan memastikan hasil editan sudah sesuai ekspektasi.

### Mengembalikan Konten ke Versi Sebelumnya (Rollback System)
Jika Anda salah mengedit teks, tidak sengaja menghapus deskripsi, atau ingin membatalkan perubahan yang baru saja disimpan:
1. Buka menu **`HQuarters CMS`**.
2. Klik tab **`🕒 Riwayat & Restore`**.
3. Di sana terdapat tabel riwayat versi yang otomatis tersimpan setiap kali tombol *Simpan Perubahan* diklik:
   * Menampilkan nomor versi, tanggal & jam penyimpanan, serta nama user yang menyimpan.
4. Cari versi tanggal yang ingin Anda kembalikan, lalu klik tombol **`🔄 Pulihkan`**.
5. Muncul kotak konfirmasi browser, klik **OK**.
6. Sistem akan mengembalikan seluruh data konten persis ke kondisi pada tanggal tersebut secara instan!

---

## 10. Tabel Pemetaan Lengkap (Halaman WordPress vs URL Website)

Untuk memudahkan Anda mengetahui halaman WordPress mana yang mengontrol halaman website tertentu:

| Nama Halaman Website | Menu Halaman WordPress | Bagian Form di HQuarters CMS | Alamat URL Website Live |
| :--- | :--- | :--- | :--- |
| **Beranda (Indonesia)** | `Pages > HQuarters – Home (ID)` | Tab Indonesia > Seksi 1: Beranda | `https://hquarters.co.id/id/` |
| **Beranda (English)** | `Pages > HQuarters – Home (EN)` | Tab English > Seksi 1: Beranda | `https://hquarters.co.id/en/` |
| **Pilihan Ruang / Spaces Hub** | `Pages > Spaces (ID)` / `Spaces (EN)` | Seksi 1: Pilihan Ruang | `https://hquarters.co.id/id/spaces` |
| **SOHO Duplex** | `Pages > SOHO (ID)` / `SOHO (EN)` | Seksi 2: SOHO | `https://hquarters.co.id/id/spaces/soho` |
| **Premium Office** | `Pages > Premium Office (ID)` / `(EN)` | Seksi 3: Premium Office | `https://hquarters.co.id/id/spaces/premium-office` |
| **Function Room & Events** | `Pages > Function Room (ID)` / `(EN)` | Seksi 4: Function Room | `https://hquarters.co.id/id/events` |
| **Serviced Office** | `Pages > Serviced Office (ID)` / `(EN)` | Seksi 5: Serviced Office | `https://hquarters.co.id/id/spaces/serviced-office` |
| **Virtual Office** | `Pages > Virtual Office (ID)` / `(EN)` | Seksi 5: Virtual Office | `https://hquarters.co.id/id/spaces/virtual-office` |
| **Fasilitas Gedung** | `Pages > Building (ID)` / `Building (EN)` | Seksi 6: Gedung | `https://hquarters.co.id/id/building` |
| **Lokasi Gedung** | `Pages > Location (ID)` / `Location (EN)` | Seksi 6: Lokasi | `https://hquarters.co.id/id/location` |
| **Daftar Tenant Perusahaan** | `Pages > Companies (ID)` / `(EN)` | Konten Tenant | `https://hquarters.co.id/id/companies` |
| **Konsultasi Ruang & Survei** | `Pages > Find Space (ID)` / `(EN)` | Form Lead Inquire | `https://hquarters.co.id/id/find-space` |
| **Wawasan & Artikel** | `Posts > All Posts` | WordPress Posts | `https://hquarters.co.id/id/insights` |

---

## 11. Tanya Jawab & Pemecahan Masalah (Troubleshooting)

#### Q: Saya sudah klik "Simpan Perubahan" di WordPress, kenapa saat saya buka website teksnya belum berubah?
**A:** Browser Anda menyimpan memori cache lama agar menghemat kuota internet. Lakukan **Hard Refresh**:
* **Windows (Google Chrome / Microsoft Edge):** Tekan tombol keyboard `Ctrl + F5` atau `Ctrl + Shift + R`.
* **Mac (Safari / Chrome):** Tekan tombol keyboard `Cmd + Shift + R` (atau buka menu Safari > *Preferences/Settings > Advanced* > centang Developer menu, lalu tekan `Option + Cmd + E` untuk Empty Caches, kemudian refresh).
* **Smartphone:** Tutup tab browser lalu buka kembali di mode Incognito/Private.

#### Q: Bagaimana cara membuat salah satu kata pada judul menjadi berwarna oranye khas HQuarters?
**A:** Pada kolom formulir yang terbagi dua (misal: *Judul Prefix* dan *Judul Highlight*):
* Isi kata awalan pada kolom pertama (akan tampil dengan warna hitam/gelap elegan).
* Isi kata penekanan pada kolom kedua (otomatis diberi aksen warna emas/oranye resmi HQuarters `#EA8E18`).

#### Q: Bagaimana format penulisan nomor WhatsApp yang benar?
**A:** Masukkan nomor dengan format internasional diawali kode negara Indonesia `+62` atau `62` (contoh: `+62 811-1908-319`). Sistem secara otomatis akan membersihkan spasi dan tanda minus saat mengarahkan calon klien ke aplikasi WhatsApp.

#### Q: Apakah aman jika staf admin mengedit versi Indonesia sementara staf lain mengedit versi English?
**A:** Sangat aman. Database versi Indonesia (`hq_copy_id`) dan versi English (`hq_copy_en`) dipisah 100% dan memiliki sistem penyimpanan independen (*Anti-Overwrite Protection*).

---

*Dokumentasi ini disusun secara resmi untuk HQuarters Business Residence. Jika membutuhkan bantuan teknis lanjutan, silakan hubungi tim pengembang website.*

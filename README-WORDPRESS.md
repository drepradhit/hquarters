# 🏢 Panduan Pengelolaan Website HQuarters
> **Buku Panduan Mandiri untuk Administrator & Tim Manajemen HQuarters**  
> 🌐 **Website Resmi:** [hquarters.co.id](https://hquarters.co.id/) &nbsp;|&nbsp; 🔐 **Dashboard CMS:** [hquarters.co.id/wp-admin/](https://hquarters.co.id/wp-admin/)

---

## ⚡ 3 Menit Quick Start: Cara Mengedit Apapun

```
[ 1. Login ] ➔ [ 2. Buka HQuarters CMS ] ➔ [ 3. Edit Konten / Foto ] ➔ [ 4. Klik Simpan ]
```

1. **Login:** Kunjungi [hquarters.co.id/wp-admin/](https://hquarters.co.id/wp-admin/) dan masukkan username serta password Anda.
2. **Buka Menu CMS:** Di sidebar kiri WordPress, klik menu berikon gedung **`HQuarters CMS`**.
3. **Pilih Bahasa / Pengaturan:**
   * 🇮🇩 **Versi Indonesia:** Untuk mengedit website bahasa Indonesia (`/id/`).
   * 🇬🇧 **Versi English:** Untuk mengedit website bahasa Inggris (`/en/`).
   * ⚙️ **Global, WA & Promo:** Untuk nomor WhatsApp, popup promo, dan saklar section.
4. **Edit & Simpan:** Ubah teks, pilih gambar dari Media Library, lalu klik tombol biru **Simpan Perubahan** di bagian bawah.

---

## 🗺️ Cheat Sheet: Mau Edit Apa Hari Ini?

Gunakan tabel praktis ini untuk menemukan lokasi pengaturan dalam hitungan detik:

| Yang Ingin Anda Lakukan | Lokasi di WordPress | Tombol / Kolom yang Digunakan |
| :--- | :--- | :--- |
| **Ganti Foto Hero / Banner** | `HQuarters CMS` > Tab Halaman Terkait | Tombol **Pilih dari Media Library** |
| **Upload / Ganti Denah Lantai (Floor Plan)** | `HQuarters CMS` > Bagian SOHO / Premium / Function | Tombol **Pilih dari Media Library** pada kolom *Denah* |
| **Ubah Harga Sewa / Jual** | `HQuarters CMS` > Bagian Produk Terkait | Kolom teks **Harga Mulai** |
| **Ubah Status Ketersediaan Unit** | `HQuarters CMS` > Bagian SOHO / Premium | Dropdown **Status Unit** (*Tersedia / Terbatas / Sold Out*) |
| **Ubah Nomor WhatsApp Resmi** | `HQuarters CMS` > Tab **⚙️ Global, WA & Promo** | Kolom **Nomor WhatsApp Resmi** |
| **Aktifkan / Matikan Popup Promo** | `HQuarters CMS` > Tab **⚙️ Global, WA & Promo** | Centang / Hapus centang **Aktifkan Popup Promo** |
| **Sembunyikan / Munculkan Section** | `HQuarters CMS` > Tab **⚙️ Global, WA & Promo** | Checkbox **Toggle Visibilitas Section** |
| **Tulis / Hapus Artikel Wawasan** | Menu sidebar **Posts > Add New Post** | Editor artikel standar WordPress |
| **Atur Judul & Meta Deskripsi Google (SEO)** | Menu **Pages > Edit** atau **Posts > Edit** | Kotak panel **Yoast SEO** di bagian bawah |
| **Kembalikan Data yang Salah Edit** | `HQuarters CMS` > Tab **🕒 Riwayat & Restore** | Tombol **🔄 Pulihkan** pada versi yang diinginkan |

---

## 📸 Tutorial 1: Mengganti Gambar & Upload Denah (Media Library)

Setiap kolom gambar sudah terintegrasi langsung dengan **WordPress Media Library**. Anda tidak perlu mengetik link atau URL gambar secara manual.

```
[ Klik "Pilih dari Media Library" ] ➔ [ Pilih / Upload Gambar ] ➔ [ Klik "Gunakan Gambar Ini" ]
```

1. Klik tombol **`Pilih dari Media Library`** di sebelah kolom gambar yang ingin Anda ganti.
2. Jendela pop-up Media WordPress akan terbuka:
   * **Pilih Foto yang Ada:** Buka tab *Media Library* dan klik foto yang diinginkan.
   * **Upload Foto Baru:** Buka tab *Upload files* > klik *Select Files* (atau drag & drop file dari laptop Anda).
3. Klik tombol biru **Gunakan Gambar Ini** di pojok kanan bawah.
4. Thumbnail preview gambar akan langsung muncul di formulir Anda.
5. Gulir ke bawah dan klik **Simpan Perubahan**.

> [!TIP]
> **Tips Format & Ukuran Gambar:**
> * **Format Terbaik:** Gunakan format **WebP** atau **JPG/PNG** terkompresi.
> * **Foto Ruangan / Banner:** Resolusi ideal $1920 \times 1080$ piksel (aspek rasio 16:9).
> * **Denah Lantai (Floor Plan):** Gunakan file PNG berlatar belakang putih atau transparan dengan resolusi minimal lebar 1200 piksel agar garis arsitektur terlihat tajam.

---

## 🏷️ Tutorial 2: Mengatur Harga, Spesifikasi & Status Ketersediaan Unit

Sistem telah dilengkapi pengaturan spesifikasi teknis dan badge ketersediaan otomatis untuk seluruh produk.

### 1. SOHO Duplex (`/id/spaces/soho`)
* **Harga Mulai:** Ketik nominal atau keterangan (contoh: `Mulai Rp 1.9 Miliar` atau `Hubungi Tim Leasing`).
* **Status Ketersediaan:** Pilih status dari menu dropdown:
  * `Tersedia`: Menampilkan badge hijau elegan (*Unit Tersedia*).
  * `Unit Terbatas`: Menampilkan badge aksen oranye (*Unit Terbatas*).
  * `Sold Out / Penuh`: Menampilkan badge abu-abu elegan (*Sold Out*).
* **Spesifikasi Unit:** Isi kolom *Ukuran Unit* (misal: `80 - 120 m²`), *Pilihan Lantai* (`Lantai 3–16`), *Daya Listrik* (`5.500 - 11.000 VA`), dan *Tinggi Plafon* (`3.2 Meter`).

### 2. Premium Office (`/id/spaces/premium-office`)
* **Spesifikasi Korporat:** Isi *Rentang Luas Lantai* (`120 - 450 m²`), *Kekuatan Beban Lantai* (`250 kg/m²`), dan *Tinggi Plafon* (`3.6 Meter`).
* **Status Unit:** Pilih `Tersedia` atau `Unit Terbatas`.
* **3 Kartu Layanan (Kapasitas, Tata Ruang, Fasilitas):** Anda dapat mengubah judul, teks deskripsi, dan tombol aksi WhatsApp pada ketiga kartu informasi tersebut.

### 3. Function Room & Event Spaces (`/id/events`)
* **Kapasitas 4 Konfigurasi Layout:**
  * 🎭 *Theatre Setup:* contoh `Hingga 280 Pax`
  * 🎓 *Classroom Setup:* contoh `Hingga 140 Pax`
  * 👥 *U-Shape Setup:* contoh `Hingga 70 Pax`
  * 🍽️ *Round Table (Banquet):* contoh `Hingga 120 Pax`
* **Harga Sewa:** Ketik tarif sewa (contoh: `Mulai Rp 1.500.000 / Jam`).
* **Visual:** Ganti foto layout theatre dan upload denah penataan ruangan via Media Library.

### 4. Serviced Office & Virtual Office (`/id/spaces/...`)
* **Serviced Office:** Ubah deskripsi kesiapan operasional (*move-in ready*) dan teks harga (contoh: `Mulai Rp 2.500.000 / Pax / Bulan`).
* **Virtual Office:** Ubah deskripsi domisili legalitas zonasi komersial dan teks harga (contoh: `Mulai Rp 450.000 / Bulan`).

---

## ⚙️ Tutorial 3: Nomor WhatsApp Resmi, Promo & Section Toggle

Semua pengaturan global dikelola terpusat di tab **`⚙️ Global, WA & Promo`**:

```
HQuarters CMS ➔ Tab [ ⚙️ Global, WA & Promo ] ➔ Lakukan Pengaturan ➔ Simpan
```

### A. Nomor Kontak WhatsApp Resmi
* **Nomor WhatsApp:** Masukkan nomor resmi diawali kode negara (contoh: `+62 811-1908-319`).  
  *Mengubah nomor di sini otomatis memperbarui seluruh tombol chat WhatsApp di Header, Tombol Melayang, Modal Promo, dan Footer website.*
* **Pesan Pembuka Default:** Masukkan kalimat sapaan otomatis saat pengunjung mengklik WhatsApp (contoh: *"Halo tim HQuarters! Saya ingin info ketersediaan unit."*).

### B. Popup Promo Otomatis (*Work. Live. Invest*)
* **Aktifkan / Matikan Promo:** Centang kotak *Aktifkan Popup Promo* jika program promo sedang berjalan. Untuk mematikannya sementara tanpa menghapus poster, cukup **hilangkan centang**.
* **Banner Poster Promo:** Ganti poster promo dengan klik *Pilih dari Media Library*.
* **Teks Tombol Promo:** Contoh: *"Tanya Promo via WhatsApp"*.

### C. Saklar Tampilan Section (Toggle ON/OFF)
Anda dapat menyembunyikan atau memunculkan section di website hanya dengan mencentang kotak:
* ☑️ **Logo Tenant / Partners:** Tampilkan atau sembunyikan deretan logo korporasi tenant.
* ☑️ **Building Highlights:** Tampilkan atau sembunyikan ringkasan fasilitas gedung di beranda.
* ☑️ **Floating WhatsApp:** Tampilkan atau sembunyikan tombol WhatsApp melayang di pojok kanan bawah.
* ☑️ **Section CTA Bawah:** Tampilkan atau sembunyikan banner ajakan konsultasi sebelum footer.

---

## ✍️ Tutorial 4: Mengelola Artikel & Berita Wawasan (Insights)

Seluruh artikel pada halaman `/id/insights` dan `/en/insights` dikelola secara mandiri lewat menu standar WordPress:

### 1. Menambah Artikel Baru
1. Di sidebar kiri, klik **Posts > Add New Post**.
2. Masukkan **Judul Artikel** pada baris paling atas.
3. Tulis isi artikel (Anda bebas menambahkan paragraf, sub-heading H2/H3, gambar di tengah tulisan, dan kutipan).
4. Di panel sebelah kanan (*Post Settings*):
   * **Categories:** Pilih salah satu topik (*Memilih Kantor*, *Investasi & Pembiayaan*, *Desain Kantor*, atau *Bisnis di Bandung*).
   * **Featured Image:** Klik *Set featured image* untuk memasang foto sampul artikel.
5. Klik tombol **Publish** di pojok kanan atas. Artikel Anda langsung tayang secara profesional di website!

### 2. Mengedit atau Menghapus Artikel
* Buka **Posts > All Posts**.
* Arahkan kursor ke artikel: klik **Edit** untuk mengubah teks/gambar, atau klik **Trash** untuk menghapusnya.

---

## 🔍 Tutorial 5: Optimasi SEO Google (Yoast SEO)

Setiap halaman dan artikel sudah terhubung langsung dengan plugin **Yoast SEO** yang dihidrasi otomatis oleh sistem frontend:

1. Buka halaman yang ingin dioptimasi (melalui menu **Pages > All Pages > Edit** atau **Posts > All Posts > Edit**).
2. Gulir ke bagian paling bawah editor hingga menemukan panel **Yoast SEO**.
3. Lengkapi 3 kolom utama:
   * **Focus Keyphrase:** Kata kunci target (misal: `sewa kantor bandung`, `soho asia afrika`).
   * **SEO Title:** Judul yang tampil di hasil pencarian Google.
   * **Meta Description:** Ringkasan menarik (1–2 kalimat, max 155 karakter) yang memicu calon penyewa untuk mengklik website Anda.
4. Klik tombol biru **Update**.  
   *Sistem frontend React secara otomatis memperbarui tag metadata HTML, canonical URL, dan kartu media sosial sesuai isian Yoast Anda.*

---

## 🛡️ Tutorial 6: Memulihkan Konten ke Versi Sebelumnya (Rollback System)

Jika Anda tidak sengaja menghapus deskripsi penting, salah ketik, atau ingin mengembalikan konten seperti minggu lalu:

```
HQuarters CMS ➔ Tab [ 🕒 Riwayat & Restore ] ➔ Pilih Tanggal ➔ Klik [ 🔄 Pulihkan ]
```

1. Buka menu **`HQuarters CMS`** > klik tab **`🕒 Riwayat & Restore`**.
2. Di sana tercatat daftar snapshot setiap kali Anda menekan tombol simpan, lengkap dengan tanggal, jam, dan nama admin.
3. Cari versi tanggal yang ingin Anda kembalikan, lalu klik tombol **`🔄 Pulihkan`**.
4. Muncul notifikasi konfirmasi pada browser, klik **OK**.
5. Seluruh konten website akan kembali persis ke kondisi pada tanggal tersebut dalam 1 detik!

---

## 🗺️ Tabel Pemetaan Halaman (WordPress vs URL Website)

| Halaman Website | Menu di WordPress (Pages) | Form di HQuarters CMS | URL Website Live |
| :--- | :--- | :--- | :--- |
| **Beranda (Indonesia)** | `Pages > HQuarters – Home (ID)` | Tab Indonesia > Seksi 1: Beranda | `https://hquarters.co.id/id/` |
| **Beranda (English)** | `Pages > HQuarters – Home (EN)` | Tab English > Seksi 1: Beranda | `https://hquarters.co.id/en/` |
| **Pilihan Ruang / Spaces** | `Pages > Spaces (ID / EN)` | Seksi 1: Pilihan Ruang | `https://hquarters.co.id/id/spaces` |
| **SOHO Duplex** | `Pages > SOHO (ID / EN)` | Seksi 2: SOHO | `https://hquarters.co.id/id/spaces/soho` |
| **Premium Office** | `Pages > Premium Office (ID / EN)` | Seksi 3: Premium Office | `https://hquarters.co.id/id/spaces/premium-office` |
| **Function Room & Events**| `Pages > Function Room (ID / EN)` | Seksi 4: Function Room | `https://hquarters.co.id/id/events` |
| **Serviced Office** | `Pages > Serviced Office (ID / EN)`| Seksi 5: Serviced Office | `https://hquarters.co.id/id/spaces/serviced-office` |
| **Virtual Office** | `Pages > Virtual Office (ID / EN)` | Seksi 5: Virtual Office | `https://hquarters.co.id/id/spaces/virtual-office` |
| **Fasilitas Gedung** | `Pages > Building (ID / EN)` | Seksi 6: Fasilitas Gedung | `https://hquarters.co.id/id/building` |
| **Lokasi Gedung** | `Pages > Location (ID / EN)` | Seksi 6: Lokasi Gedung | `https://hquarters.co.id/id/location` |
| **Daftar Tenant** | `Pages > Companies (ID / EN)` | Halaman Tenant | `https://hquarters.co.id/id/companies` |
| **Form Survei Ruang** | `Pages > Find Space (ID / EN)` | Halaman Inquire | `https://hquarters.co.id/id/find-space` |
| **Wawasan & Artikel** | `Posts > All Posts` | Daftar Tulisan Blog | `https://hquarters.co.id/id/insights` |

---

## ❓ Tanya Jawab & Solusi Cepat (FAQ)

#### Q1: Saya sudah klik "Simpan", kenapa saat buka website belum berubah?
> **Solusi:** Browser Anda sedang menyimpan cache lama. Lakukan **Hard Refresh**:
> * **Windows (Chrome / Edge):** Tekan `Ctrl + F5` atau `Ctrl + Shift + R`.
> * **Mac (Safari / Chrome):** Tekan `Cmd + Shift + R`.
> * **HP / Smartphone:** Buka di tab *Incognito / Mode Penyamaran*.

#### Q2: Bagaimana cara membuat salah satu kata pada judul menjadi berwarna oranye khas HQuarters?
> **Jawaban:** Pada kolom formulir yang terbagi dua (*Teks Awalan* dan *Teks Oranye*):
> * Isi kata awalan pada kolom pertama (akan tampil dengan warna hitam/gelap elegan).
> * Isi kata penekanan pada kolom kedua (otomatis diberi aksen warna emas/oranye resmi HQuarters `#EA8E18`).

#### Q3: Bagaimana jika staf admin mengedit versi Indonesia bersamaan dengan versi English?
> **Jawaban:** Sangat aman! Database versi Indonesia (`hq_copy_id`) dan versi English (`hq_copy_en`) dipisah 100% dan memiliki sistem penyimpanan independen (*Anti-Overwrite Protection*). Menyimpan versi Indonesia tidak akan pernah mengubah atau mengganggu versi English.

---

> 🏢 **HQuarters Business Residence**  
> *Jl. Asia Afrika No. 158, Kebon Pisang, Sumur Bandung, Kota Bandung, Jawa Barat 40112*  
> *Sistem Headless CMS Resmi & Hak Cipta Dilindungi.*

# 🚀 Task: UI/UX Redesign Halaman Utama Hookify (Dark Mode & Single Column)

## 📝 Deskripsi
Tugas ini bertujuan untuk merombak tampilan antarmuka (UI) halaman utama aplikasi **Hookify** agar terlihat lebih modern, simpel, dan futuristik dengan fokus pada **Dark Mode**. Desain interaksi utama harus dibuat se-intuitif mungkin, dengan layout satu kolom penuh (**tanpa sidebar**) yang terinspirasi dari alur antarmuka ChatGPT.

## 🎯 Spesifikasi Kebutuhan (Requirements)

1. **Header & Branding (Bagian Atas)**
   - Tampilkan logo kecil/ikonik "Hookify".
   - Tampilkan nama project "Hookify" dengan gaya tipografi yang modern dan futuristik.
   - Desain header harus *minimalist*, ditempatkan di paling atas, dan terintegrasi mulus dengan latar belakang gelap.

2. **Tema Visual Utama (Styling)**
   - **Gaya:** Simple, Bersih, dan Futuristik.
   - **Warna Utama:** Wajib menggunakan **Dark Mode** (latar belakang gelap, teks terang). Tambahkan aksen warna futuristik (misalnya border tipis bercahaya/*glow* atau efek *glassmorphism* transparan).

3. **Riwayat Prompt (Prompt History - Area Scroll)**
   - **PENTING: Tidak usah menggunakan sidebar.**
   - Tempatkan rekaman prompt sebelumnya (*history*) di area utama halaman, tepat di bawah header dan di atas area input.
   - Area ini harus dapat di-*scroll* (scrollable) secara vertikal sehingga pengguna bisa melihat riwayat lama tanpa harus berpindah halaman atau membuka menu samping.

4. **Area Interaksi / Input Prompt (Bagian Bawah)**
   - Implementasikan komponen `textarea` dan tombol kirim (Submit/Send) dengan gaya **ChatGPT**.
   - Posisikan area input ini tetap (*fixed* atau *sticky*) di bagian bawah layar.
   - `textarea` harus bisa membesar (auto-resize) secara otomatis menyesuaikan panjang teks.
   - **Tombol Kirim:** Harus diletakkan **berdampingan** dengan `textarea` (di sebelah kanannya) atau menyatu elegan di sudut kanan dalam kotak input, sama persis seperti tata letak ChatGPT.

## 🛠 Panduan Teknis Implementasi (Untuk Programmer/AI)
- Manfaatkan *utility classes* (misalnya dari Tailwind CSS) untuk mengatur *Dark Mode* secara konsisten.
- Untuk struktur *layout*, sangat disarankan menggunakan arsitektur *Flexbox* (kolom) dengan tinggi layar penuh (`h-screen` atau `100dvh`), di mana:
  - Header mengambil ruang secukupnya (`flex-none`).
  - Area Riwayat (History) mengambil sisa ruang yang ada dan dapat di-*scroll* (`flex-1 overflow-y-auto`).
  - Area Input berada di paling bawah (`flex-none`).
- Pastikan tampilan sepenuhnya **responsif** dan nyaman digunakan di perangkat *mobile* maupun *desktop*.

## ✅ Kriteria Penerimaan (Acceptance Criteria)
- [ ] Keseluruhan tampilan sudah menggunakan *Dark Mode*, terasa *simple*, dan *futuristic*.
- [ ] Header berisi logo dan nama "Hookify" terpasang rapi di bagian atas.
- [ ] **Tidak ada sidebar**.
- [ ] Riwayat prompt tampil berderet ke bawah di area utama dan bisa di-scroll.
- [ ] Area input berada di bagian bawah.
- [ ] *Textarea* dan tombol *send* posisinya saling berdampingan ala ChatGPT.
- [ ] Komponen input mendukung *auto-resize*.

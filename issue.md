# Issue: Mengganti Logo Hookify

## Deskripsi Tugas
Tugas ini bertujuan untuk mengganti logo default yang ada di dalam project dengan logo baru. Pekerjaan ini melibatkan penambahan aset gambar dan pembaruan komponen di halaman utama.

## Langkah-langkah Implementasi

1. **Tambahkan Aset Logo ke Folder Public**
   - Tempatkan/ganti file logo baru dengan nama `hookify.png` di dalam direktori `public/` pada root project (`public/hookify.png`).

2. **Perbarui Logo di Halaman Utama (`app/page.tsx`)**
   - Buka file `app/page.tsx`.
   - Import komponen `Image` dari `next/image` di bagian atas file:
     ```tsx
     import Image from "next/image";
     ```
   - Cari bagian kode header yang menampilkan logo saat ini. Saat ini menggunakan icon `Zap` dari `lucide-react` (berada di sekitar baris 135-137):
     ```tsx
     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white glow-indigo group-hover:scale-110 transition-transform">
       <Zap className="h-5 w-5 fill-current" />
     </div>
     ```
   - Ganti *container* dan icon tersebut dengan tag `<Image />` yang mengarah ke `/hookify.png`. Sesuaikan styling (ukuran dan border) agar terlihat harmonis, contohnya:
     ```tsx
     <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl group-hover:scale-110 transition-transform relative">
       <Image 
         src="/hookify.png" 
         alt="Hookify Logo" 
         fill
         className="object-cover"
       />
     </div>
     ```
   - Hapus import `Zap` dari `lucide-react` di bagian atas file **hanya jika** icon tersebut tidak lagi digunakan di tempat lain (perhatikan bahwa icon `Zap` sepertinya juga digunakan di tempat lain seperti di area loading dan area "Logic", jadi mungkin import-nya sebaiknya dibiarkan saja).

## Kriteria Penerimaan (Acceptance Criteria)
- [ ] File `hookify.png` sudah ada di folder `public/`.
- [ ] Logo di header pojok kiri atas halaman utama (`app/page.tsx`) berhasil berubah menjadi gambar `hookify.png`.
- [ ] Gambar tampil proporsional, tidak distorsi, dan efek *scale* saat hover tetap berfungsi.

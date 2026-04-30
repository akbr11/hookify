# Project Setup & Initial Layout: Hookify

## Overview
Inisialisasi project Next.js baru di direktori saat ini dengan nama "hookify", menggunakan App Router, TypeScript, dan beberapa dependency utama (Tailwind CSS, shadcn/ui, OpenRouter SDK, dan TanStack Query). Selain itu, buat tampilan halaman awal yang sederhana.

## Tech Stack & Dependencies
- Framework: **Next.js** (App Router)
- Bahasa: **TypeScript**
- Styling: **Tailwind CSS**
- UI Components: **shadcn/ui**
- AI Integration: **OpenRouter SDK** (bisa menggunakan package `openai` dengan custom baseURL OpenRouter)
- Data Fetching/State Management: **TanStack Query** (`@tanstack/react-query`)

## Tasks / Action Plan

### 1. Inisialisasi Project Next.js
- [ ] Jalankan perintah `npx create-next-app@latest ./` di folder saat ini.
- [ ] Pastikan konfigurasi menggunakan TypeScript, Tailwind CSS, ESLint, dan App Router.

### 2. Instalasi & Setup Dependencies
- [ ] Inisialisasi `shadcn/ui` (`npx shadcn-ui@latest init`).
- [ ] Install komponen shadcn yang dibutuhkan untuk halaman awal (contoh: `npx shadcn-ui@latest add button textarea`).
- [ ] Install `@tanstack/react-query` untuk state management request API.
- [ ] Install `openai` (sebagai OpenRouter SDK client).

### 3. Konfigurasi Provider
- [ ] Buat file provider untuk React Query (setup `QueryClientProvider`).
- [ ] Tambahkan provider tersebut ke dalam root layout (`app/layout.tsx`).

### 4. Pembuatan UI Halaman Awal (`app/page.tsx`)
Buat layout sederhana yang berisi:
- [ ] **Header**: Menampilkan Logo dan nama aplikasi **"hookify"**.
- [ ] **Input Section**: Menggunakan komponen `Textarea` untuk pengguna memasukkan ide konten.
- [ ] **Button Generate**: Menambahkan tombol "Generate" di bawah input text.
- [ ] **Area Hasil**: Menyediakan container kosong (placeholder) sebagai tempat untuk menampilkan hasil generate dari AI nantinya.

### 5. Styling & Finalisasi
- [ ] Hapus boilerplate code Next.js bawaan (dari `app/page.tsx` dan `globals.css`).
- [ ] Gunakan Tailwind CSS untuk memastikan layout terlihat rapi, responsif, modern, dan memberikan *user experience* yang baik.

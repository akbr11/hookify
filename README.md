# ⚡ Hookify AI

**Hookify** adalah generator konten viral berbasis AI yang dirancang untuk membantu kreator, marketer, dan pemilik bisnis membuat hook, caption, dan strategi konten sosial media yang sangat engaging dalam hitungan detik.

![Futuristic UI](https://img.shields.io/badge/UI-Futuristic_Dark-indigo)
![Next.js](https://img.shields.io/badge/Framework-Next.js_15-black)
![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-blue)

## ✨ Fitur Utama

- **Futuristic Dark Mode**: Antarmuka pengguna yang modern, bersih, dan bertema gelap untuk kenyamanan mata.
- **ChatGPT-Style Interaction**: Area input yang intuitif dengan textarea otomatis membesar dan tombol kirim berdampingan.
- **AI-Powered Content**: Menghasilkan hook viral, caption kreatif, dan hashtag populer menggunakan model AI terbaru via OpenRouter.
- **Prompt History**: Menyimpan riwayat prompt sebelumnya di bagian atas halaman (horizontal scroll) yang tersimpan di browser (`localStorage`).
- **Single Column Layout**: Desain simpel satu kolom tanpa sidebar yang berfokus pada konten.
- **Auto-Scroll to Results**: Fokus otomatis ke hasil yang baru digenerate atau dimuat dari history.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript.
- **Styling**: Tailwind CSS, Shadcn/UI, Lucide Icons.
- **State & Data**: TanStack Query (React Query).
- **AI Integration**: OpenRouter SDK.

## 🚀 Memulai

### Prasyarat

Pastikan Anda sudah menginstal Node.js (versi 18 atau lebih baru).

### Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/akbr11/hookify.git
   cd hookify
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi Environment Variables:
   Buat file `.env.local` di root direktori dan tambahkan API Key OpenRouter Anda:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan konten kreatif.

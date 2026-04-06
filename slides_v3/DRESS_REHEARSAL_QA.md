# Dress Rehearsal QA v3

Deck utama: `slides_v3/index.html`  
Durasi target: `120 menit`  
Format: live HTML slideshow

## 1. Preflight Teknis

Checklist:
- Buka [index.html](D:/Dev/Design%20Thinking/slides_v3/index.html) di browser yang akan dipakai saat presentasi.
- Pastikan semua gambar tampil:
  - hook expectation
  - hook reality
  - EMR forensic visual
  - AI original + heatmap
  - MRI before/after
  - alarm overload SVG
  - SATUSEHAT systems SVG
- Uji navigasi:
  - `Arrow Right/Left`
  - `Space`
  - mouse wheel
  - swipe jika pakai touch device
- Uji hotkeys:
  - `F` fullscreen
  - `B` blackout
  - `X` spotlight
  - `A` alarm demo
  - `C` colorblind mode
  - `P` projector mode
- Uji `cinema zoom`:
  - klik gambar EMR
  - klik gambar AI
  - tekan `Esc` untuk menutup
- Jika memakai clicker, uji apakah tombol blank screen / laser mode mengirim sinyal yang bentrok atau justru membantu `B` blackout.
- Klik semua panel `spoiler` dan pastikan reveal berjalan mulus.
- Pastikan counter menunjukkan `1 / 26` di awal dan berubah benar saat pindah slide.

## 2. Preflight Ruangan

Checklist:
- Cek apakah internet venue stabil.
- Jika internet meragukan, buka deck sekali sebelum masuk kelas agar font dan aset sudah tercache.
- Tes proyektor dari baris belakang:
  - apakah teks kecil masih terbaca?
  - apakah warna warm/deep tetap kontras?
  - apakah diagram SATUSEHAT masih terbaca?
- Jika proyektor redup:
  - aktifkan `P`
  - pertimbangkan pakai projector mode sejak awal
- Cek pointer atau mouse:
  - jika pointer tidak nyaman, siapkan spotlight `X` sebagai gantinya

## 3. Preflight Pedagogis

Checklist:
- Opening tidak dimulai dari definisi.
- Hook dipakai untuk bertanya, bukan langsung menjelaskan.
- Setiap case minimal memancing satu respons dari audiens.
- Jangan reveal solusi terlalu cepat pada slide spoiler.
- Kasus AI tidak dibawakan sebagai promosi AI; tetap tekankan trust, override, dan accountability.
- SATUSEHAT dibawakan sebagai contoh systems thinking, bukan sekadar promosi platform nasional.
- Closing dipakai untuk refleksi, bukan rangkuman berulang.

## 4. Pacing Target

Patokan waktu:
- Slide 1-6 selesai di menit `0-25`
- Slide 7-10 selesai di menit `25-45`
- Slide 11-19 selesai di menit `45-85`
- Slide 20-23 selesai di menit `85-110`
- Slide 24-26 selesai di menit `110-120`

Red flags:
- Jika baru masuk Slide 10 setelah menit `50`, Anda terlalu lama di teori.
- Jika kasus selesai sebelum menit `70`, Anda terlalu cepat dan kurang interaksi.
- Jika aktivitas mulai setelah menit `100`, potong satu aktivitas.

## 5. Slide Risk Review

### Slide 2
Risiko:
- Anda terlalu cepat menjelaskan tanpa memberi ruang audiens menjawab.

Perbaikan:
- tahan 3-5 detik setelah pertanyaan.
- jika masih hening, pertahankan jeda sedikit lebih lama sebelum memberi pancingan.

### Slide 7
Risiko:
- lima lensa terasa terlalu abstrak.

Perbaikan:
- beri satu contoh singkat per lensa, maksimal satu kalimat.

### Slide 12
Risiko:
- mahasiswa tenggelam membaca screenshot EMR.

Perbaikan:
- arahkan perhatian ke dua atau tiga hotspot saja.

### Slide 14
Risiko:
- alarm demo terasa gimmicky.

Perbaikan:
- pakai `A` singkat, hanya sekali, lalu segera kaitkan dengan beban kognitif.

### Slide 16
Risiko:
- diskusi AI melebar jadi debat teknologi umum.

Perbaikan:
- kembalikan ke pertanyaan: apakah klinisi bisa mempercayai dan menindaklanjuti output ini?

### Slide 18
Risiko:
- SATUSEHAT terasa terlalu makro dan jauh.

Perbaikan:
- selalu tutup dengan "apa artinya untuk kalian sebagai calon perancang sistem?"

### Slide 21-23
Risiko:
- kelompok terlalu lama diskusi tanpa output.

Perbaikan:
- paksa output menjadi satu redesign utama, bukan banyak ide.
- jika energi kelas turun, ubah diskusi menjadi berdiri dan berpindah posisi per tim.

## 6. Stagecraft Opsional

Pilih maksimal dua agar tidak terasa gimmicky:
- `B` blackout saat cerita kritis atau penutup
- `X` spotlight saat membedah lensa atau UI
- `Bloody Glove Test` di Slide 24
- `F12 Reality Check` hanya jika Anda nyaman melakukannya cepat

Jangan lakukan semuanya sekaligus.

## 7. Fallback Plan

Jika waktu sangat sempit:
- lewati Slide 4
- gabungkan Slide 8-10 menjadi satu narasi singkat
- pilih hanya 4 kasus: EMR, Alarm, AI, SATUSEHAT
- jadikan Activity 2 dan 3 satu aktivitas gabungan

Jika proyektor bermasalah:
- aktifkan `P`
- kurangi penggunaan `X`
- fokus ke narasi dan pertanyaan, bukan detail visual kecil

Jika diskusi kelas pasif:
- pindah ke pertanyaan paksa:
  - "Siapa user yang paling dirugikan?"
  - "Lensa mana yang paling gagal?"
  - "Apa redesign pertama yang paling murah tapi berdampak?"

## 8. Final Go/No-Go

Go jika:
- semua visual tampil
- hotkeys berfungsi
- Anda bisa menjelaskan 5 lensa tanpa membaca
- Anda bisa menyebut 1 punchline per kasus
- Anda tahu bagian mana yang dipotong jika waktu lari

No-Go jika:
- gambar tidak muncul
- spoiler tidak jalan
- Anda belum memutuskan aktivitas mana yang wajib dan mana yang opsional
- Anda belum mencoba fullscreen di ruangan yang akan dipakai

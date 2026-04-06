# Visual Sourcing Guide

## Tujuan
`slides_v3` memakai pendekatan visual-forensik. Artinya, gambar tidak dipakai sebagai dekorasi, tetapi sebagai bukti yang membantu mahasiswa melihat kegagalan desain secara nyata.

## Prinsip Umum
- Pilih gambar yang memperjelas masalah, bukan gambar stock yang terlalu generik.
- Utamakan visual dengan kontras makna yang kuat: ideal vs realita, before vs after, black box vs explainable.
- Jika memakai screenshot, beri anotasi tipis di luar deck atau edit gambarnya terlebih dahulu agar fokus visual tetap tajam.
- Hindari foto yang terlalu ramai jika tidak membantu argumen slide.

## Slide Prioritas

### Hook
File: `index.html`
Target: slide "Apa yang kalian lihat pada sistem yang sama?"

Isi yang dicari:
- Satu gambar dashboard medis yang sangat rapi, estetik, dan terasa seperti mockup ideal.
- Satu gambar monitor ICU atau ruang monitor nyata yang terlihat sibuk, penuh kabel, label, dan clutter.

Tujuan:
- Membenturkan ekspektasi engineer dengan realita klinis.

### Case 1: EMR Burden
Target:
- Screenshot EMR lama, order-entry screen, atau antarmuka prescribing yang padat.
- Jika memungkinkan, gambar yang menampilkan dropdown, satuan dosis, atau warning alert yang berdesakan.

Tujuan:
- Menunjukkan bahwa error tidak selalu berasal dari manusia, tetapi dari medan antarmuka.

### Case 2: Alarm Fatigue
Target:
- Kolase waveform monitor, indikator alarm, atau foto ruang ICU dengan banyak perangkat aktif.
- Boleh juga mockup buatan sendiri yang menumpuk sinyal visual.

Tujuan:
- Menunjukkan overload perseptual, bukan hanya menceritakannya.

### Case 4: AI in Clinic
Target:
- Heatmap radiologi, CAM/Grad-CAM, atau visual explanation lain yang menunjukkan area fokus AI.

Tujuan:
- Membuat perbedaan antara AI sebagai black box dan AI sebagai co-pilot terlihat konkret.

### Case 5: Pirate Ship MRI
Target:
- Foto MRI konvensional yang steril dan terasa dingin.
- Foto Adventure Series MRI atau ruang MRI bertema anak.

Tujuan:
- Menunjukkan bahwa redesign experience bisa jauh lebih kuat daripada redesign mesin.

### Case 6: SATUSEHAT
Target:
- Diagram interoperabilitas, alur data antar fasilitas, atau visual arsitektur ekosistem kesehatan.

Tujuan:
- Menggeser cara pikir mahasiswa dari "satu aplikasi" ke "satu ekosistem".

## Catatan Hak Pakai
- Untuk presentasi kelas internal, gambar editorial atau dokumentasi publik bisa cukup, tetapi tetap lebih baik menyimpan sumbernya.
- Untuk publikasi formal, unggahan daring, atau repositori publik, cek izin penggunaan dan atribusi.

## Rekomendasi Praktis
- Isi dulu 4 slide terpenting: Hook, EMR, AI, Pirate Ship MRI.
- Jika waktu sempit, lebih baik 4 visual yang sangat kuat daripada 10 visual yang generik.

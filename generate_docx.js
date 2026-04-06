const { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, AlignmentType, PageBreak, Tab, TabStopPosition, TabStopType, Table, TableRow, TableCell, WidthType, ShadingType } = require("docx");
const fs = require("fs");

// ─── Helpers ───
const p = (text, opts = {}) => {
  const runs = [];
  // Parse bold **text** and italic *text* markers
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  parts.forEach(part => {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, font: "Calibri", size: opts.size || 22 }));
    } else if (part.startsWith("*") && part.endsWith("*")) {
      runs.push(new TextRun({ text: part.slice(1, -1), italics: true, font: "Calibri", size: opts.size || 22 }));
    } else if (part) {
      runs.push(new TextRun({ text: part, font: "Calibri", size: opts.size || 22, ...opts.runOpts }));
    }
  });
  return new Paragraph({
    children: runs,
    spacing: { after: opts.after ?? 120 },
    alignment: opts.align || AlignmentType.LEFT,
    indent: opts.indent ? { left: opts.indent } : undefined,
    ...(opts.paraOpts || {})
  });
};

const heading = (text, level = HeadingLevel.HEADING_1, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: "Calibri", bold: true, size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 26 : 22, color: level === HeadingLevel.HEADING_1 ? "1B3A5C" : level === HeadingLevel.HEADING_2 ? "2E5984" : "3B3B3B" })],
  heading: level,
  spacing: { before: opts.before ?? 240, after: 120 },
  ...(opts.paraOpts || {})
});

const stageDir = (text) => new Paragraph({
  children: [new TextRun({ text, font: "Calibri", size: 20, italics: true, color: "666666" })],
  spacing: { after: 80 },
  indent: { left: 360 }
});

const divider = () => new Paragraph({
  children: [new TextRun({ text: "─".repeat(70), font: "Calibri", size: 16, color: "CCCCCC" })],
  spacing: { before: 200, after: 200 },
  alignment: AlignmentType.CENTER
});

const slideLabel = (num, title) => new Paragraph({
  children: [
    new TextRun({ text: `SLIDE ${num}`, font: "Calibri", bold: true, size: 20, color: "FFFFFF" }),
    new TextRun({ text: `  —  ${title}`, font: "Calibri", size: 20, color: "FFFFFF" })
  ],
  spacing: { before: 300, after: 120 },
  shading: { type: ShadingType.CLEAR, fill: "2E5984" },
  indent: { left: 120, right: 120 }
});

const quoteBlock = (text) => new Paragraph({
  children: [new TextRun({ text: `"${text}"`, font: "Calibri", size: 22, italics: true, color: "1B3A5C" })],
  spacing: { after: 120 },
  indent: { left: 720 },
  border: { left: { style: BorderStyle.SINGLE, size: 6, color: "2E5984", space: 10 } }
});

// ─── Build Document ───
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } // ~2cm
      }
    },
    children: [
      // ═══ COVER ═══
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        children: [new TextRun({ text: "PRESENTER SCRIPT", font: "Calibri", bold: true, size: 44, color: "1B3A5C" })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Verbatim Handout untuk Rehearsal & Live", font: "Calibri", size: 24, color: "666666" })],
        alignment: AlignmentType.CENTER, spacing: { after: 300 }
      }),
      divider(),
      new Paragraph({
        children: [new TextRun({ text: "Design Thinking & Human Factors", font: "Calibri", bold: true, size: 36, color: "2E5984" })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "dalam Manajemen Inovasi Digital di Kedokteran", font: "Calibri", size: 26, color: "3B3B3B" })],
        alignment: AlignmentType.CENTER, spacing: { after: 300 }
      }),
      divider(),
      p("**Total:** 26 Slides · 120 Menit", { align: AlignmentType.CENTER }),
      p("**Audiens:** Mahasiswa S1 Teknologi Kedokteran", { align: AlignmentType.CENTER }),
      new Paragraph({ spacing: { after: 400 } }),
      p("**Cara pakai:** Baca verbatim atau parafrase sesuai gaya Anda.", { size: 20 }),
      p("[JEDA] = beri jeda dramatis · [TANYA] = lempar ke audiens · [KLIK] = pindah slide", { size: 20 }),

      // ═══ ACT 1 ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("ACT 1: HANCURKAN ILUSI", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 00:00 – 00:10*"),
      divider(),

      // SLIDE 1
      slideLabel(1, "Title"),
      stageDir("[Biarkan slide ini tampil saat mahasiswa masuk. Mulai bicara setelah semua duduk.]"),
      p("Selamat pagi semuanya."),
      p("Hari ini kita akan bicara tentang dua hal yang mungkin terdengar seperti bukan urusan mahasiswa Teknologi Kedokteran: Design Thinking dan Human Factors."),
      p("Tapi saya jamin — setelah dua jam ke depan — Anda akan melihat bahwa ini bukan hanya urusan Anda. Ini adalah **inti** dari apa yang membuat teknologi kedokteran benar-benar bekerja — atau benar-benar gagal."),
      p("Kita punya dua jam. Ada teori, ada enam kasus nyata dari dunia nyata, dan ada workshop di mana Anda sendiri akan mendesain dan mengkritik solusi."),
      p("Siap?"),
      stageDir("[JEDA]"),
      p("Mari kita mulai."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 2
      slideLabel(2, "Tesis Besar"),
      p("Ini adalah tesis besar yang ingin saya sampaikan hari ini. Bacalah pelan-pelan."),
      stageDir("[JEDA — biarkan mahasiswa membaca 5 detik]"),
      p("Inovasi digital di kedokteran — **bukan** masalah \"membuat teknologi yang canggih.\""),
      p("Saya ulangi: **bukan** masalah membuat teknologi yang canggih."),
      p("Ini adalah masalah **merancang sistem sosio-teknikal berisiko tinggi**. Sistem yang harus selaras dengan manusia — dengan alur kerja klinis — dengan organisasi — dengan regulasi — dan yang paling penting, dengan **keselamatan pasien**."),
      p("Apa artinya ini? Artinya, mesin yang secara teknis paling hebat di dunia bisa tetap menjadi **desain yang buruk** — jika ia tidak memahami manusia yang menggunakannya."),
      p("Dan itulah yang terjadi berulang kali di dunia kesehatan."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 3
      slideLabel(3, "Musuh Utama: Techno-Solutionism"),
      p("Sekarang saya perkenalkan musuh bersama kita hari ini."),
      p("Namanya: **Engineer's Bias** — atau kalau mau pakai istilah yang lebih tajam: **Techno-Solutionism**."),
      p("Apa itu? Ini adalah keyakinan—seringkali tidak disadari—bahwa kalau kita tambahkan **lebih banyak fitur**, tambahkan **lebih banyak data**, pasang **lebih banyak AI**, buat **lebih banyak otomasi** — maka hasilnya pasti akan lebih baik."),
      stageDir("[JEDA]"),
      p("Di banyak industri, asumsi itu mungkin benar. Tapi di kesehatan?"),
      p("Lihat empat fakta ini:"),
      p("Lebih banyak fitur — bisa menambah **beban kognitif** perawat yang sudah overload.", { indent: 360 }),
      p("Lebih banyak alert — bisa memicu **alert fatigue** — dan alarm kritis justru **diabaikan**.", { indent: 360 }),
      p("Demo yang sempurna di lab — bisa **gagal total** di bangsal yang berisik, gelap, dan penuh tekanan.", { indent: 360 }),
      p("Dan desain yang salah — bukan sekadar inkonveniensi — bisa berkontribusi langsung pada **error klinis**.", { indent: 360 }),
      p("Jadi tugas kita hari ini, sebagai calon profesional teknologi kedokteran: belajar melihat melampaui kecanggihan teknis. Belajar melihat **manusia** di balik layar."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 4
      slideLabel(4, "6 Prinsip Inti"),
      p("Sebelum kita masuk ke teori, saya ingin Anda menyimpan enam kalimat ini di kepala Anda. Ini bukan saya yang mengarang — ini adalah wisdom dari dunia patient safety, healthcare design, dan human factors engineering."),
      stageDir("[Baca satu per satu, pelan, dengan penekanan]"),
      quoteBlock("Di kesehatan, interface bukan sekadar layar — ia bagian dari keputusan klinis."),
      quoteBlock("Kompetitor utama inovasi bukan teknologi lama, tapi workflow lama."),
      quoteBlock("Sistem yang aman hanya saat user segar dan fokus — bukanlah sistem yang benar-benar aman."),
      quoteBlock("Human error sering merupakan gejala desain yang buruk, bukan kegagalan individu."),
      quoteBlock("Teknologi terbaik di klinik sering bukan yang paling terlihat, tapi yang paling rendah friksi dan paling dipercaya."),
      quoteBlock("Jangan mendigitalisasi proses yang memang dari awal sudah rusak."),
      stageDir("[JEDA]"),
      p("Keenam prinsip ini akan terus muncul sepanjang lecture. Sekarang mari kita lihat peta perjalanan kita hari ini."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 5
      slideLabel(5, "Struktur / Agenda"),
      p("Ini rencana dua jam kita."),
      p("Kita sudah di Act 1 sekarang — menghancurkan ilusi bahwa teknologi sama dengan solusi."),
      p("Berikutnya, kita masuk ke blok teori: Design Thinking dan Human Factors Engineering. Saya akan berikan Anda kerangka berpikir dan alat evaluasi yang bisa langsung dipakai."),
      p("Setelah itu, kita break sepuluh menit. Tapi break kita bukan break biasa — saya akan minta Anda melakukan sesuatu: **mengetik dengan sarung tangan medis**. Kita sebut ini Bloody Glove Demo. Anda akan merasakan sendiri apa artinya cognitive load dan physical constraint dalam desain."),
      p("Lalu kita masuk ke Act 2: enam kasus nyata. Dari yang paling dekat — EHR yang membakar dokter — sampai level sistem nasional: SATUSEHAT."),
      p("Dan kita tutup dengan Act 3: Anda sendiri yang akan bermain. Bad Design Detective — menemukan kegagalan desain. Lalu Redesign Sprint — mendesain ulang solusinya."),
      p("OK. Mari kita mulai blok teori."),
      stageDir("[KLIK]"),

      // ═══ BLOK TEORI ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("BLOK TEORI: DESIGN THINKING + HUMAN FACTORS", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 00:10 – 00:35*"),
      divider(),

      // SLIDE 6
      slideLabel(6, "Section Header: Design Thinking + Human Factors"),
      stageDir("[Slide transisi — biarkan 3 detik, lalu langsung klik]"),
      p("Dua fondasi yang tidak bisa dipisahkan: Design Thinking dan Human Factors."),
      p("Design Thinking tanpa Human Factors menghasilkan solusi yang kreatif tapi belum tentu aman. Human Factors tanpa Design Thinking menghasilkan sistem yang aman tapi belum tentu diinginkan pengguna."),
      p("Kita butuh keduanya."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 7
      slideLabel(7, "Lima Tahapan Design Thinking"),
      p("Design Thinking punya lima tahapan. Ini bukan proses linear—ini proses **iteratif**. Anda boleh mundur, boleh loncat, boleh balik dari tahap lima ke tahap satu."),
      p("Tahap satu: **Empathize**. Ini yang paling sering dilewatkan oleh engineer. Anda belum boleh mendesain apa pun sebelum Anda benar-benar memahami pengguna Anda. Bukan dari kuesioner — dari **shadowing**. Ikuti perawat selama 12 jam. Duduk di ruang tunggu pasien. Amati apa yang terjadi di lapangan, bukan di meeting room."),
      p("Prinsipnya: **shadowing lebih berguna dari surveying**. Observasi nyata mengalahkan kuesioner ideal."),
      p("Tahap dua: **Define**. Setelah Anda mengamati, rumuskan masalah yang sebenarnya. Bukan \"kita butuh aplikasi baru\" — tapi \"perawat ICU kehilangan informasi kritis karena terlalu banyak alarm yang tidak relevan.\" Alat yang kita pakai: POV Statement dan pertanyaan \"How Might We.\""),
      p("Tahap tiga: **Ideate**. Buat ide sebanyak mungkin. Jangan menilai dulu. Kuantitas dulu, kualitas belakangan. Teknik: brainstorming, Crazy 8s — sketsa delapan ide dalam delapan menit — dan SCAMPER."),
      p("Tahap empat: **Prototype**. Buat model nyata dari ide Anda. Tapi ingat prinsipnya: **Cardboard Before Code**. Paper prototype dulu, coding belakangan. Jangan langsung bangun aplikasi — gambar dulu di kertas, tempel di dinding, uji cepat."),
      p("Tahap lima: **Test**. Validasi dengan pengguna nyata. Usability testing, think-aloud protocol, A/B test. Dan kalau hasilnya menunjukkan masalah — kembali ke tahap yang relevan. Iterate. Fail fast, learn fast."),
      stageDir("[Tunjuk ke iterate bar di slide]"),
      p("Ini bukan waterfall. Ini siklus."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 8
      slideLabel(8, "Human Factors Engineering: 3 Pilar"),
      p("Sekarang kita ke fondasi kedua: Human Factors Engineering. Tiga pilar."),
      p("**Pilar pertama** — dan ini yang paling penting untuk mengubah cara berpikir Anda: perbedaan antara **USE error** dan **USER error**."),
      p("Paradigma lama mengatakan: perawat salah menekan tombol, salah perawat. Salahkan perawatnya. Kirim ke pelatihan ulang."),
      p("Paradigma Human Factors mengatakan: tunggu dulu. Kalau desain tombol itu membingungkan — kalau tombol \"start\" dan tombol \"stop\" warnanya sama dan ukurannya sama dan posisinya bersebelahan — maka yang salah bukan perawatnya. **Yang salah desainnya.**"),
      quoteBlock("Human error is a consequence of poor design, not user incompetence."),
      p("**Pilar kedua**: Cognitive Load dan lingkungan klinis."),
      p("Bayangkan Anda seorang perawat. Anda sudah bekerja 10 jam dari shift yang seharusnya 12 jam. Ruangan berisik. Anda memakai sarung tangan. Anda baru saja menerima kabar bahwa pasien di bed 3 menurun kondisinya. Dan sekarang Anda harus memprogram infusion pump dengan menu bertingkat lima."),
      p("Itulah konteks nyata di mana teknologi medis digunakan. Bukan di lab yang tenang. Bukan oleh user yang fresh. Tapi oleh manusia yang **kelelahan, terganggu, dan di bawah tekanan**."),
      p("Maka tes yang harus kita terapkan: **3 A.M. Exhaustion Test**. Apakah desain ini tetap aman digunakan jam 3 pagi, ketika user sudah 10 jam bekerja?"),
      p("**Pilar ketiga**: Sociotechnical Systems. Teknologi tidak beroperasi dalam vakum. Ada manusia, ada tugas, ada organisasi, ada lingkungan — semuanya saling memengaruhi. Solusi yang bagus untuk satu departemen bisa menciptakan bottleneck di departemen lain."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 9
      slideLabel(9, "5 Lensa Evaluasi Inovasi MedTech"),
      p("Sekarang saya berikan Anda satu alat yang bisa langsung Anda pakai — hari ini, besok, dan seterusnya sepanjang karir Anda. Lima Lensa untuk menilai apakah sebuah inovasi MedTech benar-benar baik."),
      p("Sebelum sebuah ide dianggap bagus — paksa ia lolos kelima lensa ini."),
      p("**Lensa 1 — Empathy Lens.** Apakah ini benar-benar menyelesaikan kebutuhan pengguna nyata? Atau ini adalah solusi yang kita buat karena kita bisa, bukan karena dibutuhkan?"),
      p("**Lensa 2 — Safety dan Usability Lens.** Apakah ini tetap aman saat user lelah? Saat sibuk? Saat tergesa? Saat memakai sarung tangan? Saat jam 3 pagi?"),
      p("**Lensa 3 — Systems Lens.** Apakah ini memperbaiki satu titik tapi merusak workflow lain? Mengurangi beban di satu unit tapi menambah beban di unit sebelahnya?"),
      p("**Lensa 4 — Clinical Lens.** Apakah outputnya membantu dokter membuat keputusan klinis yang lebih baik? Atau justru mengaburkan, membingungkan, atau bahkan mengambil alih tanggung jawab klinisi?"),
      p("**Lensa 5 — Implementation Lens.** Dan terakhir — pertanyaan yang paling sering dilupakan oleh inovator: apakah ini realistis? Realistis untuk konteks rumah sakit Indonesia. Untuk puskesmas. Untuk regulasi kita. Untuk anggaran kita. Untuk pelatihan yang tersedia."),
      p("Lima lensa. Hafal ini. Nanti di workshop, Anda akan memakainya."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 10
      slideLabel(10, "Rumusan Elegan"),
      p("Sekarang izinkan saya meringkas semuanya dalam rumusan yang paling elegan."),
      p("**Design Thinking** membantu kita menemukan solusi yang **layak dibuat**.", { indent: 360 }),
      p("**Human Factors** memastikan solusi itu **layak dipakai dan aman**.", { indent: 360 }),
      p("**Systems Thinking** membantu kita melihat **efek domino** lintas unit.", { indent: 360 }),
      p("**Clinical Reasoning** menjaga **relevansi medis** dan tanggung jawab klinis.", { indent: 360 }),
      p("**Implementation Thinking** memastikan solusi **benar-benar hidup di lapangan**.", { indent: 360 }),
      p("Jadi inovasi digital di kesehatan harus memenuhi lima syarat sekaligus: **desirable — usable — safe — clinically meaningful — dan implementable**."),
      p("Kalau satu saja tidak terpenuhi, kita punya masalah."),
      p("Oke. Itu teorinya. Sekarang kita break dulu sepuluh menit."),
      stageDir("[KLIK]"),

      // ═══ BREAK ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("BREAK + BLOODY GLOVE DEMO", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 00:35 – 00:45*"),
      divider(),
      stageDir("[Tidak ada slide khusus — tetap di slide 10 atau matikan layar]"),
      stageDir("[Bagikan sarung tangan medis — cukup beberapa pasang untuk dicoba bergantian]"),
      p("Oke break sepuluh menit. Silakan ambil kopi, ke kamar kecil."),
      p("Tapi sebelum Anda santai — saya punya satu tantangan kecil."),
      stageDir("[Tunjukkan sarung tangan medis]"),
      p("Coba pakai sarung tangan medis ini. Dua lapis kalau bisa — seperti yang dipakai perawat di ICU. Sekarang coba buka HP Anda. Ketik pesan singkat. Coba buka aplikasi. Coba pencet tombol kecil."),
      stageDir("[Biarkan mahasiswa mencoba 2–3 menit]"),
      p("Rasakan betapa frustrasinya."),
      stageDir("[JEDA]"),
      p("Sekarang bayangkan: Anda harus melakukan itu — bukan untuk mengetik pesan WhatsApp — tapi untuk **memprogram dosis obat** di infusion pump. Dengan tombol yang lebih kecil. Dengan menu yang lebih rumit. Dengan tekanan hidup-mati pasien di tangan Anda. Dan Anda sudah bekerja sepuluh jam."),
      p("Itulah mengapa Human Factors **bukan opsional**. Itulah mengapa desain **bisa membunuh**."),
      p("Oke, break selesai. Mari kita masuk ke kasus nyata."),
      stageDir("[KLIK]"),

      // ═══ ACT 2 ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("ACT 2: 6 KASUS NYATA (Deep Dive)", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 00:45 – 01:30*"),
      divider(),

      // SLIDE 11
      slideLabel(11, "Section Header: 6 Kasus Nyata"),
      p("Enam kasus. Kita mulai dari yang paling dekat dengan keseharian kita, lalu eskalasi sampai ke level sistem nasional."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 12
      slideLabel(12, "Kasus 1: EHR yang Membakar Dokter"),
      p("Kasus pertama. Ini yang paling dekat dari Anda."),
      p("Electronic Health Records — Rekam Medis Elektronik. Teknologi yang seharusnya **membantu** dokter. Tapi ada fakta yang mengejutkan."),
      p("Dokter rata-rata menghabiskan **dua jam dokumentasi** untuk setiap **satu jam** tatap muka dengan pasien. Dua banding satu."),
      p("Dan ada fenomena yang disebut \"pajama time\" — dokter mengisi catatan medis di rumah, setelah shift, karena tidak sempat menyelesaikannya di klinik."),
      p("EHR — yang diciptakan untuk efisiensi — justru menjadi salah satu sumber utama **burnout** dokter."),
      p("Kenapa? Lihat breakdown-nya. Terlalu banyak klik untuk tugas sederhana. Alert dan pop-up yang berlebihan. Copy-paste notes yang membuat catatan membengkak. Dan yang paling fundamental: sistem ini tidak dirancang berdasarkan workflow klinis yang nyata."),
      stageDir("[TANYA] Siapa yang pernah melihat dokter mengeluh tentang sistem komputer di RS?"),
      p("Solusinya datang dari Design Thinking. Salah satu yang paling menarik: **Ambient Clinical Intelligence** — seperti DAX Copilot dari Microsoft-Nuance. AI yang mendengarkan percakapan dokter-pasien secara real-time, dan otomatis mengisi catatan medis."),
      p("Tapi — dan ini penting — kalau AI yang mencatat, **siapa yang bertanggung jawab** kalau AI salah? Ini pertanyaan Clinical Lens dan Implementation Lens yang belum sepenuhnya terjawab."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 13
      slideLabel(13, "Kasus 2: Alarm Fatigue di ICU"),
      p("Sekarang kita naikkan levelnya. Dari ketidaknyamanan dokter — ke **nyawa pasien**."),
      p("Lihat angka ini. **Tiga ratus lima puluh alarm lebih. Per shift. Dua belas jam. Di ICU.**"),
      p("Dan dari semua alarm itu, **delapan puluh lima sampai sembilan puluh sembilan persen — tidak memerlukan tindakan apa pun**. Non-actionable. False alarm. Noise."),
      p("Apa yang terjadi ketika seseorang dibombardir tiga ratus lima puluh alarm per shift, dan hampir semuanya palsu?"),
      stageDir("[JEDA]"),
      p("Mereka berhenti mendengarkan. Mereka menjadi **desensitized**. Dan ketika alarm yang benar-benar kritis akhirnya berbunyi — alarm itu **diabaikan**."),
      p("Root cause-nya ironis. Setiap vendor perangkat medis menambahkan alarm agar produknya terlihat \"lebih aman\" — secara **hukum**. Tapi tanpa memikirkan beban kognitif perawat. Ini adalah **techno-solutionism dalam bentuk paling berbahaya**."),
      p("Solusi HFE-nya: stratifikasi alarm berdasarkan severity. Machine learning untuk prediksi false alarm. Desain multi-sensori. Dan personalisasi ambang per pasien."),
      p("Tapi perhatikan Systems Lens: Kalau kita mengurangi alarm, ada risiko baru: perawat jadi terlalu percaya pada sistem. Ini butuh **graceful degradation**."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 14
      slideLabel(14, "Kasus 3: Infusion Pump — 56,000 Adverse Events"),
      p("FDA menerima **lima puluh enam ribu** laporan adverse event terkait infusion pump. Dalam empat tahun. Bukan karena pompa-pompa itu rusak. Karena **antarmukanya membingungkan**."),
      p("Tombol kecil dan rapat — coba tekan dengan sarung tangan. Menu berlapis — perawat frustrasi dan **bypass fitur keamanan**. Tampilan angka ambigu — bingung antara \"1.0\" dan \"10.\" Bedanya? **Sepuluh kali lipat dosis.** Overdose."),
      quoteBlock("Sistem yang aman hanya saat user segar dan fokus — bukanlah sistem yang benar-benar aman."),
      p("Solusi: Interface intuitif. Drug library dengan **Dose Error Reduction System**. Integrasi EHR. Dan **hard limits** — untuk parameter berisiko tinggi, blokir total."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 15
      slideLabel(15, "Kasus 4: Telemedicine Indonesia"),
      p("Sekarang kita geser perspektif — dari tenaga kesehatan ke **pasien**. Dan dari RS besar ke **daerah 3T**."),
      p("Indonesia. Tujuh belas ribu lebih pulau. Rasio dokter 0.4 per seribu penduduk. Internet 2G/3G di pelosok. Literasi digital bervariasi."),
      stageDir("[TANYA] Siapa yang pernah pakai Halodoc atau Alodokter?"),
      p("Inovasi yang sudah berjalan: Halodoc/Alodokter, Tele-ECG dari BRIN, low-bandwidth mode, AI Radiology untuk TB screening."),
      p("Tapi — Implementation Lens: Solusi Silicon Valley **tidak selalu bekerja di Indonesia**. Desain harus mempertimbangkan smartphone entry-level, UU PDP, integrasi BPJS, dan pelatihan bidan desa."),
      p("**Konteks lokal matters. Desain lokal matters.**"),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 16
      slideLabel(16, "Kasus 5: Pirate Ship MRI"),
      p("Ingat slide pertama tadi? Tentang mesin MRI yang membuat anak menangis? Inilah cerita lengkapnya."),
      p("Doug Dietz. Lead Industrial Designer di GE Healthcare. Dia merancang mesin MRI terbaru. Secara teknis, salah satu yang terbaik di dunia."),
      p("Suatu hari dia berkunjung ke rumah sakit. Dan dia melihat seorang anak kecil menangis ketakutan, menolak masuk ke mesin yang **dia** rancang."),
      p("**Delapan puluh persen** anak di bawah tujuh tahun membutuhkan **sedasi** untuk MRI. Dari perspektif anak, mesin MRI itu bukan alat medis. Itu **monster**."),
      stageDir("[JEDA dramatis]"),
      p("Dia **tidak** membuat mesin lebih sunyi. Dia **tidak** menambah fitur sedasi otomatis. Dia bertanya: bagaimana kalau yang perlu didesain ulang bukan **mesinnya** — tapi **pengalamannya**?"),
      p("Dia menerapkan lima tahap Design Thinking. Empathize — observasi di daycare. Define — masalah bukan mesin tapi lingkungan. Ideate — brainstorm dengan ahli museum anak. Prototype — stiker, naskah cerita, soundscapes. Test — pilot di RS."),
      p("Hasil? MRI jadi Pirate Island. Sedasi turun hingga 80%. Kepuasan naik ~90%."),
      p("Dan seorang anak berkata:"),
      quoteBlock("Mommy, can we come back tomorrow?"),
      stageDir("[JEDA panjang]"),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 17
      slideLabel(17, "Insight dari Pirate Ship"),
      p("Lihat kontrasnya. Di sisi kiri — pendekatan techno-solutionist: \"Buat MRI lebih sunyi.\" \"Tambah fitur sedasi.\" \"Scan lebih cepat.\""),
      p("Di sisi kanan — Design Thinking: \"Ubah pengalaman jadi petualangan.\" \"Buat anak merasa aman.\" \"Latih teknisi jadi story-teller.\""),
      quoteBlock("The real unit of design is not the app. It is the workflow."),
      quoteBlock("Kadang yang perlu didesain ulang bukan mesinnya, tapi pengalamannya."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 18
      slideLabel(18, "Kasus 6: SATUSEHAT"),
      p("Kasus terakhir. Level tertinggi: **ekosistem nasional**."),
      p("Ribuan faskes, sistem IT berbeda-beda, data pasien tidak terintegrasi. SATUSEHAT: satu platform, satu pasien, satu data."),
      p("Mari uji dengan lima lensa kita:"),
      p("Empathy: siapa user utama? Dokter? Admin? Pasien? Bidan desa?", { indent: 360 }),
      p("Safety: keamanan data pasien dan UU PDP?", { indent: 360 }),
      p("Systems: integrasi dengan sistem legacy RS?", { indent: 360 }),
      p("Clinical: apakah data membantu keputusan klinis?", { indent: 360 }),
      p("Implementation: siapa bayar? Siapa latih? Berapa lama?", { indent: 360 }),
      stageDir("[TANYA] Menurut Anda, lensa mana yang paling kritis untuk SATUSEHAT?"),
      p("Intinya: inovasi digital bukan cuma membuat aplikasi. Itu tentang **tata kelola data dan ekosistem**."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 19
      slideLabel(19, "Bonus: Apple Watch ECG"),
      p("Bonus case. Apple Watch ECG — deteksi AFib dari pergelangan tangan."),
      p("AFib meningkatkan risiko stroke **lima kali lipat**. Sering asimptomatik. Apple Heart Study: 419,000+ partisipan. Sentuhan 30 detik → ECG clinical-grade."),
      p("Tapi caveat: **AI as Co-Pilot, not Autopilot**. Ini screening tool, bukan diagnostik. Harus ada clinical workflow untuk follow-up."),
      stageDir("[KLIK]"),

      // ═══ ACT 3 ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("ACT 3: WORKSHOP", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 01:30 – 01:55*"),
      divider(),

      // SLIDE 20
      slideLabel(20, "Section Header: Workshop"),
      p("Teori selesai. Kasus selesai. Sekarang giliran Anda. Dua aktivitas: pertama Anda jadi **detektif**, kedua Anda jadi **desainer**."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 21
      slideLabel(21, "Bad Design Detective"),
      p("Saya menampilkan antarmuka/skenario alat medis digital. Tugas kelompok: temukan **5 titik gagal Human Factors**."),
      p("1. Identifikasi 5 masalah usability", { indent: 360 }),
      p("2. Siapa yang terdampak dan apa risikonya", { indent: 360 }),
      p("3. Uji dengan **3 A.M. Exhaustion Test**", { indent: 360 }),
      p("4. Uji dengan **Bloody Glove Test**", { indent: 360 }),
      p("Waktu: **8 menit**. Presentasi: **2 menit** per kelompok."),
      stageDir("[Timer 8 menit → presentasi → KLIK]"),
      divider(),

      // SLIDE 22
      slideLabel(22, "7-Minute Redesign Challenge"),
      p("Sekarang Anda bukan detektif — Anda **desainer**."),
      p("2 menit: Empathize + Define → tulis POV Statement.", { indent: 360 }),
      p("3 menit: Ideate → Crazy 4s — sketsa 4 ide, 1 per kotak.", { indent: 360 }),
      p("2 menit: Pitch → Masalah → Solusi → Mengapa lolos 5 Lensa?", { indent: 360 }),
      p("Challenge: A. Antrian Poli — B. Alarm Fatigue — C. Telemedicine Papua — D. Hasil Lab Membingungkan"),
      stageDir("[Timer 7 menit → presentasi → KLIK]"),
      divider(),

      // SLIDE 23
      slideLabel(23, "Red Teaming (Bonus)"),
      stageDir("[Opsional — jalankan jika waktu cukup]"),
      p("Setelah kelompok lain presentasi, tugas Anda: **hancurkan ide itu** secara konstruktif."),
      p("Systems: \"Bagaimana jika merusak workflow unit lain?\"", { indent: 360 }),
      p("Safety: \"Bagaimana jika user salah pakai jam 3 pagi?\"", { indent: 360 }),
      p("Clinical: \"Apakah dokter mau pakai ini?\"", { indent: 360 }),
      p("Implementation: \"Siapa bayar? Siapa latih?\"", { indent: 360 }),
      p("Failure: \"Apa yang terjadi jika jaringan/listrik/sensor gagal?\"", { indent: 360 }),
      p("Prinsip: **Graceful Degradation** — sistem harus turun fungsi secara aman saat gagal."),
      stageDir("[KLIK]"),

      // ═══ CLOSING ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("CLOSING & REFLEKSI", HeadingLevel.HEADING_1, { before: 0 }),
      p("*Waktu: 01:55 – 02:00*"),
      divider(),

      // SLIDE 24
      slideLabel(24, "Key Takeaways"),
      p("Lima hal yang saya minta Anda bawa pulang hari ini."),
      p("**Satu.** Teknologi yang secara teknis sempurna bukan otomatis desain yang baik. **Empati adalah superpower.**"),
      p("**Dua.** Human Factors Engineering **bukan opsional** — persyaratan regulasi IEC 62366-1."),
      p("**Tiga.** Selalu uji dengan **lima lensa**: Empathy, Safety, Systems, Clinical, Implementation."),
      p("**Empat.** Konteks Indonesia **unik**. 17,000 pulau. Desain lokal matters."),
      p("**Lima.** **AI as Co-Pilot, not Autopilot.**"),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 25
      slideLabel(25, "One-Liners"),
      stageDir("[Baca pelan, satu per satu, dengan penekanan]"),
      quoteBlock("In healthcare, a good idea is not enough."),
      quoteBlock("The real unit of design is not the app. It is the workflow."),
      quoteBlock("If your system works only for ideal users — it does not work."),
      quoteBlock("Teknologi yang hebat bukan membuat nakes bekerja untuk sistem — tetapi membuat sistem bekerja untuk nakes dan pasien."),
      stageDir("[KLIK]"),
      divider(),

      // SLIDE 26
      slideLabel(26, "Closing Reflection"),
      p("Terakhir. Satu pertanyaan untuk Anda bawa pulang."),
      p("Sebutkan **satu** teknologi kedokteran yang menurut Anda perlu **didesain ulang**. Mengapa? Lensa mana yang paling krusial untuk memperbaikinya?"),
      stageDir("[JEDA]"),
      p("Dua buku rekomendasi: **\"Change by Design\"** — Tim Brown. **\"The Design of Everyday Things\"** — Don Norman. Online: Stanford d.school dan Mayo Clinic Center for Innovation."),
      p("Semoga dua jam ini mengubah cara Anda melihat teknologi — bukan sebagai tujuan akhir, tapi sebagai **alat yang harus melayani manusia**."),
      p("**Terima kasih.**"),
      stageDir("[SELESAI]"),

      // ═══ TIMING CHEAT SHEET ═══
      new Paragraph({ children: [new PageBreak()] }),
      heading("TIMING CHEAT SHEET", HeadingLevel.HEADING_1, { before: 0 }),
      divider(),
      ...([
        ["00:00","1","Title — mulai bicara"],
        ["00:02","2","Tesis Besar"],
        ["00:04","3","Musuh: Techno-Solutionism"],
        ["00:06","4","6 Prinsip Inti"],
        ["00:08","5","Agenda"],
        ["00:10","6","Section: Blok Teori"],
        ["00:11","7","5 Tahapan Design Thinking"],
        ["00:18","8","HFE 3 Pilar"],
        ["00:25","9","5 Lensa"],
        ["00:30","10","Rumusan Elegan"],
        ["00:35","—","BREAK + Bloody Glove Demo"],
        ["00:45","11","Section: 6 Kasus Nyata"],
        ["00:46","12","Kasus 1: EHR"],
        ["00:53","13","Kasus 2: Alarm Fatigue"],
        ["01:00","14","Kasus 3: Infusion Pump"],
        ["01:07","15","Kasus 4: Telemedicine Indonesia"],
        ["01:14","16–17","Kasus 5: Pirate Ship MRI"],
        ["01:21","18","Kasus 6: SATUSEHAT"],
        ["01:27","19","Bonus: Apple Watch"],
        ["01:30","20","Section: Workshop"],
        ["01:31","21","Bad Design Detective"],
        ["01:43","22","Redesign Sprint"],
        ["01:53","23","Red Teaming (opsional)"],
        ["01:55","24","Key Takeaways"],
        ["01:57","25","One-Liners"],
        ["01:58","26","Closing Reflection"],
        ["02:00","—","SELESAI"],
      ].map(([time, slide, desc]) => 
        new Paragraph({
          children: [
            new TextRun({ text: time.padEnd(10), font: "JetBrains Mono", size: 20, bold: true, color: "2E5984" }),
            new TextRun({ text: `Slide ${slide}`.padEnd(14), font: "JetBrains Mono", size: 20, color: "666666" }),
            new TextRun({ text: desc, font: "Calibri", size: 20 })
          ],
          spacing: { after: 60 }
        })
      )),

      // ═══ READY CHECK ═══
      divider(),
      heading("READY-CHECK SEBELUM LIVE", HeadingLevel.HEADING_2),
      p("☐  Laptop terhubung ke proyektor, slides terbuka di browser fullscreen (tekan F)"),
      p("☐  Arrow keys / clicker berfungsi"),
      p("☐  Sarung tangan medis tersedia (minimal 5 pasang)"),
      p("☐  Timer (HP atau stopwatch) siap untuk workshop"),
      p("☐  Kertas A4 dan spidol untuk Crazy 4s tersedia di meja kelompok"),
      p("☐  Backup: file LECTURE_MODULE.md terbuka di tab lain sebagai referensi"),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("d:\\Dev\\Design Thinking\\PRESENTER_SCRIPT.docx", buf);
  console.log("✅ PRESENTER_SCRIPT.docx created successfully");
});

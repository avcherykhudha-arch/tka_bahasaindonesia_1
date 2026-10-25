/**
 * 10 Stimulus Packages (Pusmendik TKA Bahasa Indonesia Wajib 2026)
 * Carefully written with authentic literary and academic quality (250-300 words).
 */

import { StimulusPackage } from '../types/assessment';

export const STIMULI: StimulusPackage[] = [
  // PAKET 1: Perubahan Lingkungan Perkotaan
  {
    id: 'stimulus-1',
    packetNumber: 1,
    title: 'Paradoks Ruang Terbuka Hijau dalam Dinamika Tata Kota Megapolitan',
    genre: 'Teks Informasi Argumentatif Kompleks',
    wordCount: 278,
    authorOrSource: 'Pusat Telaah Wacana Perkotaan Kontemporer (2026)',
    fullText: `Pemerintah kota metropolitan gencar mencanangkan program revitalisasi ruang terbuka hijau (RTH) sebagai ikhtiar mitigasi krisis ekologis sekaligus peredam anomali iklim mikro. Di atas kertas, konversi lahan tidur menjadi taman tematik dan koridor vegetasi publik berhasil mendongkrak persentase tutupan hijau hingga menyentuh angka 14,2 persen. Akan tetapi, di balik retorika pemulihan lingkungan tersebut, terselip paradoks tata ruang yang memicu friksi sosio-ekologis di kalangan warga akar rumput.

Pembangunan RTH acap kali terkonsentrasi di koridor jalan protokol dan kawasan residensial kelas menengah ke atas, dengan dalih efisiensi estetika lansekap dan daya tarik investasi properti hijau. Sebaliknya, kawasan permukiman padat kumuh di bantaran kali—yang justru mengalami kerentanan ekologis tertinggi terhadap polutan udara dan kenaikan suhu permukaan—sering kali hanya menjadi obyek penertiban sepihak berlabel “normalisasi bantaran”. Kondisi demikian melahirkan fenomena gentrifikasi hijau: revitalisasi lingkungan yang secara tidak langsung menggusur kelompok marjinal karena lonjakan biaya hidup dan pajak bumi di sekitar kawasan yang dipercantik.

Selain itu, keberhasilan RTH kerap diukur semata-mata dari luasan fisik (kuantitas), bukan pada fungsi ekologis vegetasi (kualitas). Penanaman pohon peneduh eksotis impor yang berakar dangkal dan rakus air terbukti tidak efektif menyerap limpasan air hujan bila dibandingkan dengan vegetasi endemik berakar tunggang. Akibatnya, alokasi anggaran bernilai puluhan miliar rupiah sering kali berakhir sebagai proyek kosmetik perkotaan belaka tanpa menyentuh akar perbaikan daya dukung lingkungan perkotaan secara berkesinambungan. Intervensi kebijakan tata ruang perkotaan semestinya tidak menukar keadilan akses sosio-ekologis warga demi mengejar target angka statistik pembangunan.`,
    visual: {
      type: 'chart',
      caption: 'Distribusi Luasan RTH dan Efektivitas Penyerapan Air per Wilayah Kota (Simulasi Hipotetis 2026)',
      chartData: [
        { label: 'Protokol Pusat', value: 38, unit: '% Luas RTH' },
        { label: 'Residensial Elit', value: 32, unit: '% Luas RTH' },
        { label: 'Kawasan Padat Industri', value: 16, unit: '% Luas RTH' },
        { label: 'Bantaran Permukiman', value: 14, unit: '% Luas RTH' },
      ],
    },
  },

  // PAKET 2: Pendidikan, Keluarga, dan Konflik Nilai
  {
    id: 'stimulus-2',
    packetNumber: 2,
    title: 'Denting Jam Bandul di Sudut Bengkel',
    genre: 'Cerita Pendek Realis',
    wordCount: 284,
    authorOrSource: 'Kumpulan Cerpen Pilihan TKA 2026',
    fullText: `Surat penerimaan beasiswa teknik penerbangan di ibu kota itu terlipat rapi di balik saku kemeja lusuh Satria, menghangatkan dadanya dengan letupan harapan sekaligus menekannya dengan beban rasa bersalah yang tak terperi. Di sudut bengkel bubut peninggalan almarhum ayahnya, derit mesin bubut manual berdengung monoton, diselingi batuk rejan ibunya yang tengah merapikan tumpukan baut berlumur oli bekas. Bengkel reyot itu adalah satu-satunya penopang dapur keluarga serta biaya sekolah kedua adiknya yang masih duduk di bangku sekolah dasar.

“Ibu sudah bicara dengan Pak Darmo,” ujar sang ibu lirih tanpa menoleh, tangannya tetap telaten menyeka oli dengan perca kain perca. “Pak Darmo bersedia membeli mesin bubut besar ini seharga lima belas juta. Uangnya cukup untuk modal kamu berangkat ke Jawa, Satria. Jangan risaukan kami di sini. Adik-adikmu masih bisa makan dari warung kopi kecil yang nanti Ibu buka di teras.”

Satria membeku di ambang pintu. Matanya terpaku pada telapak tangan ibunya yang legam, bergaris-garis kasar oleh gesekan logam puluhan tahun demi mengantarkannya lulus SMK dengan predikat terbaik. Menjual mesin bubut itu sama saja mencabut napas kehormatan keluarga dan menjual kenangan kerja keras ayahnya. Di sisi lain, jika ia menolak beasiswa langka tersebut, ia akan terperangkap dalam lingkaran keterbatasan yang sama, selamanya menjadi penambal mesin usang di kota kecamatan yang kian sepi ditinggalkan para perantau. Jam bandul tua di dinding berdentang tiga kali, membelah kebimbangan antara kepatuhan berbakti dan panggilan masa depan.`,
  },

  // PAKET 3: Teknologi Digital dan Literasi Informasi (Dua Teks Komparatif)
  {
    id: 'stimulus-3',
    packetNumber: 3,
    title: 'Dua Perspektif Algoritma Kurasi dan Kematangan Berpikir Kritis Generasi Muda',
    genre: 'Dua Teks Informasi Komparatif',
    wordCount: 292,
    authorOrSource: 'Wacana Transformasi Digital dan Kognitif SMA 2026',
    fullText: 'Bandingkan kedua teks berikut pada masing-masing tab untuk menganalisis keterkaitan gagasan.',
    tabs: [
      {
        label: 'Teks A: Optimalisasi Kognitif',
        subtitle: 'Pendekatan Efisiensi Personalisasi Konten Digital',
        content: `Perkembangan kecerdasan buatan dalam mempersonalisasi konten digital sering dituding sebagai biang keladi penyempitan cakrawala berpikir. Namun, pandangan ini mengabaikan peran krusial algoritma kurasi adaptif dalam memangkas beban kognitif berlebih (cognitive overload) di era ledakan data global. Tanpa bantuan kurasi pintar, seorang pelajar rata-rata menghabiskan 40 persen energi mentalnya hanya untuk memilah sampah informasi yang tidak relevan dan hoaks berseliweran sebelum menemukan referensi ilmiah yang valid.

Algoritma personalisasi modern bekerja menyerupai mentor privat yang memetakan zona perkembangan proksimal pengguna. Dengan menyajikan materi belajar yang bergradasi sesuai daya serap kognitif individu, platform edukasi digital mampu meningkatkan retensi pemahaman konsep kompleks hingga 35 persen lebih tinggi dibanding metode pencarian konvensional yang acak. Oleh sebab itu, persoalan pokok bukan terletak pada keberadaan algoritma kurasi, melainkan pada kebiasaan pengguna dalam menyetel preferensi data dan disiplin diri untuk menyeimbangkan antara kenyamanan informasi yang disukai dan tantangan gagasan baru.`,
      },
      {
        label: 'Teks B: Risiko Polarisasi Epistemik',
        subtitle: 'Kritik Ruang Gema dan Erosi Penilaian Kritis',
        content: `Personalisasi konten secara algoritmik di ruang maya hakikatnya adalah arsitektur isolasi intelektual yang dibungkus ilusi kemudahan. Ketika sistem platform media sosial terus-menerus mengumpankan informasi yang selaras dengan kecenderungan, prasangka emosional, dan riwayat klik sebelumnya, pengguna secara perlahan terkurung dalam bilik gema (echo chamber) dan perangkap gelembung saringan (filter bubble). Dampaknya bukan sekadar penyempitan wawasan, melainkan kepunahan bertahap pada kemampuan menguji argumen yang berseberangan.

Sebuah riset literasi media menunjukkan bahwa remaja yang terbiasa mengonsumsi informasi hasil kurasi algoritmik mengalami penurunan sebesar 28 persen dalam keterampilan membedakan opini berbalut emosi dengan fakta terverifikasi. Mereka cenderung mengalami disonansi kognitif akut dan bersikap resisten saat dihadapkan pada realitas fakta yang mendegradasi keyakinan awalnya. Ketergantungan pasif pada kurasi mesin telah menumpulkan pisau nalar skeptis yang semestinya menjadi benteng utama literasi berpikir kritis. Ketika kenyamanan algoritma menggantikan kerja keras verifikasi mandiri, kedewasaan berdemokrasi berada dalam ancaman serius.`,
      },
    ],
  },

  // PAKET 4: Drama Konflik Sosial
  {
    id: 'stimulus-4',
    packetNumber: 4,
    title: 'Retak di Meja Balai Warga',
    genre: 'Naskah Drama Orisinal',
    wordCount: 275,
    authorOrSource: 'Antologi Drama Realisme Sosial Indonesia (2026)',
    fullText: `PANGGUNG MENGGAMBARKAN RUANG RAPAT BALAI DESA YANG SURAM. DI TENGAH RUANGAN, SEBUAH MEJA KAYU JATI TUA BERLAPIS TAPLAK PUTIH YANG SUDAH MENGUNING. PAK BASUKI (55 TAHUN, KETUA KOPERASI, MEMAKAI BATIK RAPI TAPI KERAHNYA LUSUH) BERDIRI TEGANG SAMBIL MENGGULUNG BERKAS KONTRAK. RADEN SALEH (40 TAHUN, WAKIL PENGEMBANG KAWASAN INDUSTRI, MEMAKAI SETELAN JAS TANPA DASI) DUDUK TENANG DENGAN SENYUM DINGIN.

RADEN SALEH: (Mengetuk-ngetuk bolpoin emas ke meja)
Pak Basuki, jangan jadikan idealisme semu sebagai alasan menahan masa depan warga. Lahan rawa di ujung desa itu toh selama ini cuma sarang nyamuk dan genangan air payau. Pabrik semen ini bukan saja menyerap delapan ratus pemuda desa, tapi juga menjamin kompensasi tunai yang cukup untuk merombak rumah-rumah gedek mereka jadi dinding semen permanen. Mengapa bapak bersikukuh menolak membubuhkan stempel koperasi?

PAK BASUKI: (Menatap tajam, mencondongkan badan ke depan)
Karena semen yang kamu tawarkan itu nantinya akan membungkus sumur-sumur resapan air bersih kami, Raden! Delapan ratus pemuda itu mungkin menjadi buruh kasar selama dua tahun awal. Tetapi sesudah tanah resapan mengering dan limbah kalsium mencemari tambak udang, uang kompensasi bapak akan habis dibelanjakan untuk membeli air galon kemasan dari truk tangki perusahaan bapak sendiri. 

RADEN SALEH: (Menghela napas panjang, tersenyum mengejek)
Bapak selalu berpikir seperti aktivis panggung keliling. Zaman ini tidak digerakkan oleh nostalgia sawah dan caping, Pak Basuki. Kemajuan butuh tumbal batu dan kerikil. Kalau bapak menolak, minggu depan bupati akan menerbitkan surat penetapan lokasi strategis nasional. Buka mata bapak: warga di luar sana sudah berbaris menunggu pembagian uang muka!`,
  },

  // PAKET 5: Sains dan Fenomena Masyarakat
  {
    id: 'stimulus-5',
    packetNumber: 5,
    title: 'Eutrofikasi Danau Vulkanik dan Runtuhnya Rantai Tropik Akuatik',
    genre: 'Teks Eksplanasi Ilmiah Populer',
    wordCount: 288,
    authorOrSource: 'Jurnal Limnologi dan Ekologi Terapan Tropika (2026)',
    fullText: `Danau vulkanik tropis memiliki stabilitas stratifikasi termal alami yang menjaga keseimbangan biogeokimia kolom air. Namun, dalam kurun waktu dua dekade terakhir, akselerasi aktivitas budidaya perikanan jaring apung tak terkendali dan limpasan limbah domestik kaya fosfat telah memicu sindrom eutrofikasi akut. Eutrofikasi merupakan proses pengayaan nutrien anorganik berlebih—terutama senyawa nitrogen (N) dan fosfor (P)—dalam badan perairan, yang memicu ledakan populasi fitoplankton dan alga mikroskopis (blooming algae) secara eksponensial di lapisan permukaan.

Pada fase awal, biomassa alga yang menghijau tampak subur dan meningkatkan fotosintesis di zona fotik. Kendati demikian, konsekuensi mematikan baru terjadi ketika populasi alga tersebut mati massal dan tenggelam ke dasar danau (zona hipolimnion). Bakteri dekomposer aerobik membutuhkan suplai oksigen terlarut (dissolved oxygen) dalam jumlah sangat masif untuk mengurai tumpukan bahan organik tersebut. Hal ini menyebabkan terjadinya kondisi hipoksia, bahkan anoksia total (penurunan drastis konsentrasi oksigen mendekati nol miligram per liter), pada perairan dalam.

Ketiadaan oksigen di dasar perairan memicu reaksi reduksi kimiawi yang melepaskan gas-gas beracun seperti hidrogen sulfida (H₂S) dan metana (CH₄) dari sedimen lumpur. Ketika angin kencang atau fenomena pembalikan massa air (upwelling) musiman terjadi, massa air anoksik beracun tersebut terangkat ke permukaan danau secara mendadak. Peristiwa membalik ini secara seketika mencekik insang ribuan ton ikan budidaya maupun ikan endemik lokal. Kerugian ekonomi miliaran rupiah yang diderita para petambak hakikatnya merupakan gema akumulatif dari pelanggaran daya dukung ekologis danau itu sendiri.`,
  },

  // PAKET 6: Fiksi Absurd dan Simbolisme
  {
    id: 'stimulus-6',
    packetNumber: 6,
    title: 'Petugas Pengukur Bayangan Kota',
    genre: 'Prosa Fiksi Absurd dan Simbolisme',
    wordCount: 265,
    authorOrSource: 'Kumpulan Cerpen Eksperimental Nusantara (2026)',
    fullText: `Tepat pukul dua belas siang, ketika matahari berada tegak lurus di atas ubun-ubun dan bayangan manusia seharusnya lenyap menciut di bawah telapak kaki, Kalandra wajib membentangkan pita ukur baja di alun-alun kota. Kementerian Ketertiban Visual telah menerbitkan dekrit nomor nol: setiap warga negara dilarang memiliki panjang bayangan melebihi tinggi badannya sendiri. Bayangan yang terlalu panjang dicurigai sebagai sarang pikiran subversif, rahasia pribadi yang tak dilaporkan, dan bibit ketidakpatuhan sipil.

Hari ini, Kalandra menemukan bayangan seorang kakek penjual arum manis menjulur sejauh tujuh meter ke arah timur, merayap melewati trotoar dan membelai tiang lampu jalan raya. Padahal matahari sedang menyengat terik tanpa awan sehelai pun. 

“Kakek menyembunyikan masa lalu di balik mantel,” bisik Kalandra dengan tangan bergetar memegang kapur merah penanda pelanggaran.

Kakek itu tersenyum tenang, menatap pita ukur Kalandra yang berkarat di ujungnya. “Anak muda, bayangan bukan dihasilkan oleh lampu sorot kantormu. Bayangan adalah sisa air mata dan doa-doa leluhur yang belum sempat kamu tebus dengan uang pajak. Kalau kamu memotong bayanganku, badanmu sendiri yang akan kehilangan bobot dan terombang-ambing ditiup angin petang.”

Kalandra menatap ke bawah kakinya sendiri. Pita ukur itu terlepas dari genggamannya. Di bawah sol sepatunya yang mengilap, bayangannya sendiri sama sekali tidak ada. Ia telah mengikis bayangannya sendiri hingga licin demi selembar lencana pegawai negeri.`,
  },

  // PAKET 7: Kebijakan Literasi dan Perpustakaan (Dua Teks Informasi)
  {
    id: 'stimulus-7',
    packetNumber: 7,
    title: 'Evaluasi Efektivitas Program Transformasi Perpustakaan Berbasis Inklusi Sosial',
    genre: 'Dua Teks Informasi Kebijakan',
    wordCount: 295,
    authorOrSource: 'Kajian Kebijakan Pendidikan dan Kebudayaan Nasional (2026)',
    fullText: 'Cermati Teks 1 dan Teks 2 pada tab berikut untuk menilai keselarasan dan keterbatasan kebijakan literasi.',
    tabs: [
      {
        label: 'Teks 1: Narasi Program Nasional',
        subtitle: 'Laporan Ekspansi dan Capaian Inklusi Sosial',
        content: `Program Transformasi Perpustakaan Berbasis Inklusi Sosial (TPBIS) yang digulirkan pemerintah pusat sejak lima tahun lalu telah berhasil merevitalisasi peran perpustakaan daerah dari sekadar gudang buku pasif menjadi episentrum pemberdayaan ekonomi masyarakat. Melalui diversifikasi layanan berupa lokakarya kecakapan hidup, pelatihan teknologi informasi gratis, dan pendampingan pemasaran digital bagi pelaku UMKM di pelosok desa, perpustakaan kini bertransformasi menjadi ruang interaksi sosial produktif.

Data resmi kementerian mencatat peningkatan kunjungan fisik dan virtual perpustakaan desa hingga 180 persen. Ribuan ibu rumah tangga dan kelompok pemuda putus sekolah berhasil merintis usaha mikro mandiri berbasis informasi aplikatif yang mereka serap dari buku-buku panduan terbitan pemerintah. Indeks Pembangunan Literasi Masyarakat (IPLM) di wilayah percontohan mengalami lonjakan signifikan, membuktikan bahwa pendekatan literasi yang bertumpu pada kemanfaatan ekonomi praktis jauh lebih berhasil menggerakkan minat baca warga dibanding kampanye literasi tekstual yang kaku.`,
      },
      {
        label: 'Teks 2: Analisis Tantangan dan Keterbatasan',
        subtitle: 'Evaluasi Kualitas Koleksi dan Keberlanjutan Intelektual',
        content: `Di balik gegap gempita klaim keberhasilan program TPBIS, evaluasi kritis independen menemukan distorsi konseptual yang membahayakan esensi literasi jangka panjang. Dominasi kegiatan vokasional berorientasi pasar sering kali mengorbankan fungsi primordial perpustakaan sebagai laboratorium pemikiran kritis dan konservasi khazanah keilmuan bangsa. Pengadaan buku di daerah didominasi buku saku tips praktis beroplah murah, sementara koleksi sains murni, karya sastra klasik, dan buku humaniora bermutu tinggi diabaikan karena dianggap tidak memiliki nilai jual instan.

Selain itu, angka statistik kunjungan yang melambung kerap bersifat artifisial, terdorong oleh iming-iming bantuan modal usaha atau sembako yang dibagikan panitia pelatihan, bukan oleh kesadaran membaca mandiri. Ketika masa pendanaan program proyek berakhir, ruang baca kembali sunyi senyap karena ketiadaan pustakawan profesional yang mampu memandu pembacaan kritis. Literasi tidak boleh direduksi semata-mata sebagai instrumen pencetak tenaga kerja siap pakai berupah murah.`,
      },
    ],
  },

  // PAKET 8: Puisi, Diksi, dan Pengalaman Manusia
  {
    id: 'stimulus-8',
    packetNumber: 8,
    title: 'Kidung Besi dan Tanah Sengketa',
    genre: 'Puisi Orisinal Berlapis Makna',
    wordCount: 220,
    authorOrSource: 'Antologi Puisi Humaniora Modern (2026)',
    fullText: `Di atas tanah liat yang retak merekah,
kami mengeja nama-nama benih yang padam di lumbung.
Ekskavator meraung di batas fajar berkabut,
moncong bajanya merobek urat-urat padas berlumut,
menggali parit pemisah antara warisan leluhur dan surat segel bertinta emas.

Ibu masih setia menyalakan tungku di bawah genting tiris,
meniup abu jerami dengan sisa napas sengau yang gerimis.
“Batu kali ini pernah menyimpan jejak telapak buyutmu,” katanya pelan,
pada setiap geram uap yang membubung ke langit tembaga.
Namun juru ukur berompi jingga hanya mencatat angka:
nol koma tujuh hektare, setara uang ganti rugi lima belas gram kalung cina.

Kini burung kutilang enggan hinggap di dahan dadap yang patah.
Suara azan asar tersendat oleh decit kabel derek dan debu kapur.
Kami duduk melingkari tapak batas yang digeser malam hari,
menatap jejak lumpur di roda traktor:
apakah kemajuan selalu datang dengan lidah api,
dan pergi meninggalkan anak-anak kami mengunyah debu cerobong semen?`,
  },

  // PAKET 9: Sejarah Sosial dan Kehidupan Kewargaan
  {
    id: 'stimulus-9',
    packetNumber: 9,
    title: 'Transformasi Ruang Publik dan Pudarnya Solidaritas Kolektif di Perkotaan Pascapandemi',
    genre: 'Teks Informasi Analitis Sosiologis',
    wordCount: 282,
    authorOrSource: 'Kajian Sosiologi Perkotaan Indonesia (2026)',
    fullText: `Pola interaksi sosial masyarakat perkotaan pascapandemi memperlihatkan pergeseran tektonik dari modalitas paguyuban gotong royong menuju privatisasi ruang publik yang kian terfragmentasi. Secara historis, keberadaan pos ronda, balai RW, dan pelataran musala di permukiman padat berfungsi sebagai arena mediasi kultural nonformal yang menjembatani disparitas ekonomi antarketua warga. Ruang-ruang organik tersebut memfasilitasi sirkulasi empati komunal, pertukaran informasi informal yang egaliter, serta resolusi konflik berbasis musyawarah kekeluargaan.

Akan tetapi, penetrasi digitalisasi layanan perumahan terpadu dan pembangunan klaster perumahan tertutup (gated community) dengan sistem pengawasan kamera pintar telah menggantikan mekanisme pengawasan sosial partisipatif. Warga kini mendelegasikan rasa aman kepada sensor gerak dan satuan pengamanan komersial, mereduksi kewajiban bertetangga menjadi sebatas transaksi iuran kebersihan digital melalui aplikasi telepon pintar. Interaksi tatap muka yang hangat menyusut menjadi komunikasi asinkronus dalam grup percakapan daring yang rentan salah paham dan polarisasi gosip tak berdasar.

Erosi ruang perjumpaan fisik yang inklusif ini melahirkan apa yang disebut para sosiolog sebagai "soliter di tengah kerumunan" (crowded loneliness). Ironisnya, di tengah klaim kota cerdas (smart city) yang serba efisien dan terkoneksi kabel serat optik, tingkat kecemasan sosial dan keterasingan individu justru melonjak drastis. Masyarakat modern perkotaan menikmati kemudahan logistik dalam genggaman, namun kehilangan jangkar solidaritas organik saat krisis kemanusiaan lokal tiba-tiba melanda.`,
  },

  // PAKET 10: Cerpen Kompleks dengan Alur Campuran
  {
    id: 'stimulus-10',
    packetNumber: 10,
    title: 'Surat Wasiat yang Ditelan Ombak Malabero',
    genre: 'Cerpen Psikologis Alur Maju-Mundur',
    wordCount: 290,
    authorOrSource: 'Kumpulan Cerpen Realisme Psikologis Pesisir (2026)',
    fullText: `Bau amis garam dan formalin menusuk hidung Banyu saat ia menginjakkan kaki kembali di dermaga Malabero setelah dua belas tahun merantau ke tanah seberang. Di kantong jaket kanvasnya, secarik surat wasiat bertarikh 2014 milik pamannya, Kapten Marzuki, terasa seperti lempengan timah panas. Selama belasan tahun, Banyu memelihara dendam kesumat yang membara terhadap pamannya itu; ia meyakini Marzukilah yang sengaja membiarkan perahu motor ayahnya berlayar menembus badai barat daya demi merebut bagian warisan tambak garam di tanjung selatan.

Ingatannya melompat ke malam kelam tahun 2014 silam. Ombak setinggi empat meter menghantam karang pemecah ombak. Marzuki berdiri di anjungan dermaga, berteriak parau melarang siapa pun menarik tuas jangkar. Banyu yang kala itu masih remaja menatap mata pamannya yang merah saga, mengutuk pria itu sebagai pengecut yang membiarkan sang adik kandung tenggelam di palung laut.

Namun, di kamar reot panti jompo tadi pagi, seorang mantan juru mudi tua menyerahkan buku log harian kapal yang selamat dari karam. Banyu membaca baris tulisan tangan ayahnya yang gemetar sebelum sinyal radio terputus: “Marzuki, jangan sekali-kali kamu susul perahuku. Lambung kapal ini bocor dihantam kayu gelondongan liar. Simpan bahan bakar kapal penyelamat untuk anak-anak kita di darat. Jaga Banyu, jadikan dia orang terpelajar.”

Banyu bersimpuh di bibir dermaga. Pasang laut malam mulai merayap naik membasahi lutut celananya. Angin barat mendesirkan penyesalan yang terlambat, membuyarkan tabir prasangka yang selama ini ia bangun menjadi tugu kebencian.`,
  },
];

export const quizzes = {
  '01': [
    {
      q: 'Apa fungsi utama dari DNS?',
      options: ['Menyimpan database website', 'Menerjemahkan domain ke IP address', 'Mengirim email', 'Mengamankan koneksi internet'],
      answer: 1,
    },
    {
      q: 'HTTP method mana yang digunakan untuk mengubah data?',
      options: ['GET', 'DELETE', 'PUT/PATCH', 'POST'],
      answer: 2,
    },
    {
      q: 'Apa kepanjangan dari REST?',
      options: ['Representational State Transfer', 'Remote Execution State Tool', 'Request-Response Service Transfer', 'Rapid Entity State Transport'],
      answer: 0,
    },
    {
      q: 'Mengapa CORS error terjadi?',
      options: ['Server mati', 'Domain pada request berbeda dengan domain server', 'Koneksi internet lambat', 'File tidak ditemukan'],
      answer: 1,
    },
    {
      q: 'Dalam arsitektur client-server, apa tugas client?',
      options: ['Mengelola database', 'Menangani logika bisnis', 'Menampilkan UI dan interaksi pengguna', 'Menyimpan file statis'],
      answer: 2,
    },
  ],
  '02': [
    {
      q: 'Apa yang lebih dulu dieksekusi: microtask atau macrotask?',
      options: ['Macrotask', 'Microtask', 'Sama-sama', 'Tergantung browser'],
      answer: 1,
    },
    {
      q: 'Apa output dari: console.log(typeof (() => {}))?',
      options: ['object', 'function', 'undefined', 'array'],
      answer: 1,
    },
    {
      q: 'Closure memungkinkan fungsi untuk...',
      options: ['Mengubah tipe data variable', 'Mengakses variable parent scope setelah parent selesai', 'Menghapus variable global', 'Membuat variable baru'],
      answer: 1,
    },
    {
      q: 'Apa hasil dari: console.log(0.1 + 0.2 === 0.3)?',
      options: ['true', 'false', 'undefined', 'Error'],
      answer: 1,
    },
    {
      q: 'Bagaimana cara menentukan nilai this dalam sebuah fungsi?',
      options: ['Dari lokasi fungsi ditulis', 'Dari cara fungsi dipanggil', 'Dari nama fungsi', 'Dari panjang fungsi'],
      answer: 1,
    },
  ],
  '03': [
    {
      q: 'Apa kegunaan Virtual DOM di React?',
      options: ['Menyimpan data dalam memori', 'Mempercepat proses rendering dengan meminimalkan manipulasi DOM nyata', 'Menggantikan CSS', 'Menghapus komponen yang tidak dipakai'],
      answer: 1,
    },
    {
      q: 'Hook mana yang digunakan untuk side effect seperti fetch data?',
      options: ['useState', 'useEffect', 'useRef', 'useMemo'],
      answer: 1,
    },
    {
      q: 'Apa yang terjadi jika kita panggil hook di dalam kondisi if?',
      options: ['Berjalan normal', 'Error karena melanggar rules of hooks', 'Hanya dijalankan sekali', 'Membuat infinite loop'],
      answer: 1,
    },
    {
      q: 'Apa perbedaan props dan state?',
      options: ['Props bisa diubah, state tidak', 'State bisa diubah, props tidak', 'Tidak ada perbedaan', 'Props untuk object, state untuk array'],
      answer: 1,
    },
    {
      q: 'Fungsi apa yang digunakan untuk navigasi programmatic di React Router?',
      options: ['navigate()', 'redirect()', 'go()', 'changeUrl()'],
      answer: 0,
    },
  ],
  '04': [
    {
      q: 'Apa kepanjangan MVC di Laravel?',
      options: ['Model View Controller', 'Main View Code', 'Module Virtual Component', 'Memory Virtual Cache'],
      answer: 0,
    },
    {
      q: 'Eloquent ORM menggunakan pola desain apa?',
      options: ['Singleton', 'Factory', 'Active Record', 'Observer'],
      answer: 2,
    },
    {
      q: 'Di mana kita menempatkan logika autentikasi di Laravel?',
      options: ['View', 'Blade', 'Middleware', 'Migration'],
      answer: 2,
    },
    {
      q: 'Apa fungsi dari Blade @yield?',
      options: ['Menyisipkan CSS', 'Mendefinisikan section yang bisa diisi oleh child layout', 'Menghapus cache', 'Membuat loop'],
      answer: 1,
    },
    {
      q: 'Apa tujuan dari migration di Laravel?',
      options: ['Memindahkan file ke server', 'Version control untuk skema database', 'Migrasi data dari CSV', 'Mengubah bahasa aplikasi'],
      answer: 1,
    },
  ],
  '05': [
    {
      q: 'JOIN mana yang mengembalikan semua baris dari tabel kiri dan baris yang cocok dari tabel kanan?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
      answer: 1,
    },
    {
      q: 'Apa dampak negatif dari terlalu banyak index?',
      options: ['Mempercepat query', 'Memperlambat INSERT/UPDATE', 'Meningkatkan keamanan', 'Mengurangi ukuran database'],
      answer: 1,
    },
    {
      q: 'Normalisasi bentuk ke-3 (3NF) melarang apa?',
      options: ['Duplikasi data', 'Partial dependency', 'Transitive dependency', 'Null values'],
      answer: 2,
    },
    {
      q: 'Apa yang dimaksud dengan Atomicity dalam ACID?',
      options: ['Data tidak bisa diubah', 'Transaksi berhasil seluruhnya atau gagal seluruhnya', 'Data disimpan dalam atom', 'Database hanya bisa diakses satu user'],
      answer: 1,
    },
    {
      q: 'Kapan kita pakai COMMIT dalam transaksi SQL?',
      options: ['Saat ingin membatalkan perubahan', 'Saat ingin menyimpan perubahan secara permanen', 'Saat memulai koneksi', 'Saat menghapus tabel'],
      answer: 1,
    },
  ],
  '06': [
    {
      q: 'Apa prinsip OOP yang menyembunyikan detail implementasi?',
      options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
      answer: 2,
    },
    {
      q: 'Kompleksitas waktu O(n log n) biasanya ditemukan di algoritma apa?',
      options: ['Bubble Sort', 'Binary Search', 'Merge Sort', 'Linear Search'],
      answer: 2,
    },
    {
      q: 'Apa pola desain yang memastikan sebuah class hanya punya satu instance?',
      options: ['Factory', 'Singleton', 'Observer', 'Repository'],
      answer: 1,
    },
    {
      q: 'Prinsip SOLID mana yang menyatakan "class harus punya satu alasan untuk berubah"?',
      options: ['Open-Closed', 'Liskov Substitution', 'Interface Segregation', 'Single Responsibility'],
      answer: 3,
    },
    {
      q: 'Struktur data apa yang cocok untuk menyimpan pasangan key-value?',
      options: ['Array', 'Stack', 'Hash Table', 'Queue'],
      answer: 2,
    },
  ],
  '07': [
    {
      q: 'Apa kelebihan utama JWT dibanding session?',
      options: ['Lebih aman', 'Stateless — tidak perlu simpan session di server', 'Lebih cepat', 'Mendukung semua browser'],
      answer: 1,
    },
    {
      q: 'Di mana sebaiknya JWT disimpan agar aman dari XSS?',
      options: ['localStorage', 'sessionStorage', 'httpOnly cookie', 'Variable global'],
      answer: 2,
    },
    {
      q: 'Header CORS mana yang menentukan domain mana yang diizinkan?',
      options: ['Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Max-Age'],
      answer: 1,
    },
    {
      q: 'Validasi upload file sebaiknya dilakukan di...',
      options: ['Client saja', 'Server saja', 'Client dan server', 'Tidak perlu validasi'],
      answer: 2,
    },
    {
      q: 'Apa yang harus dihindari saat deployment?',
      options: ['Menggunakan environment variable', 'Hardcode secret key di kode', 'Build frontend', 'Cek error log'],
      answer: 1,
    },
  ],
  '08': [
    {
      q: 'Kapan waktu yang tepat untuk membaca cheatsheet?',
      options: ['Seminggu sebelum interview', 'H-1 interview sebagai final refresh', 'Saat interview', 'Setelah interview'],
      answer: 1,
    },
    {
      q: 'Apa fokus utama dari modul cheatsheet?',
      options: ['Penjelasan detail', 'Contoh kode panjang', 'Ringkasan sintaks dan konsep penting', 'Sejarah teknologi'],
      answer: 2,
    },
    {
      q: 'Cheatsheet sebaiknya digunakan sebagai...',
      options: ['Sumber belajar utama', 'Referensi cepat untuk review', 'Pengganti dokumentasi resmi', 'Buku cetak'],
      answer: 1,
    },
  ],
  '09': [
    {
      q: 'Apa langkah pertama saat mengerjakan soal coding interview?',
      options: ['Langsung nulis kode', 'Baca soal dengan teliti', 'Minta ganti soal', 'Nyalakan AI'],
      answer: 1,
    },
    {
      q: 'Mengapa kita perlu explain our thinking saat coding interview?',
      options: ['Membuang waktu', 'Interviewer menilai proses berpikir, bukan cuma jawaban akhir', 'Supaya terlihat pintar', 'Mengisi keheningan'],
      answer: 1,
    },
    {
      q: 'Apa yang harus dilakukan sebelum menulis kode final?',
      options: ['Langsung submit', 'Cek edge case seperti input kosong atau nilai negatif', 'Tanya teman', 'Restart komputer'],
      answer: 1,
    },
  ],
}

function makeTester(userCode, fnName, tests) {
  const logs = []
  const mockLog = (...args) => logs.push(args.join(' '))
  try {
    const fn = new Function('console', userCode + `\nreturn ${fnName};`)
    const userFn = fn({ log: mockLog })
    const results = tests.map(t => {
      const actual = Array.isArray(t.input) ? userFn(...t.input) : userFn(t.input)
      const pass = JSON.stringify(actual) === JSON.stringify(t.expected)
      return { ...t, actual, pass }
    })
    const pass = results.every(r => r.pass)
    return { pass, results, logs, failDetail: pass ? null : results.find(r => !r.pass)?.desc }
  } catch (e) {
    return { pass: false, error: e.message, results: [], logs: [] }
  }
}

export const problems = [
  // ========== MUDAH ==========
  {
    id: 'add',
    level: 'Mudah',
    title: 'Penjumlahan',
    icon: '+',
    desc: 'Buat fungsi `add(a, b)` yang mengembalikan hasil penjumlahan a + b.',
    starterCode: `function add(a, b) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan operator `+` untuk menjumlahkan dua angka.',
    run: (code) => makeTester(code, 'add', [
      { input: [2, 3], expected: 5, desc: 'add(2, 3)' },
      { input: [-1, 5], expected: 4, desc: 'add(-1, 5)' },
      { input: [0, 0], expected: 0, desc: 'add(0, 0)' },
    ])
  },
  {
    id: 'iseven',
    level: 'Mudah',
    title: 'Bilangan Genap',
    icon: 'E',
    desc: 'Buat fungsi `isEven(n)` yang mengembalikan `true` jika n genap, `false` jika ganjil.',
    starterCode: `function isEven(n) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan operator modulus `%` untuk cek sisa bagi 2.',
    run: (code) => makeTester(code, 'isEven', [
      { input: 4, expected: true, desc: 'isEven(4)' },
      { input: 7, expected: false, desc: 'isEven(7)' },
      { input: 0, expected: true, desc: 'isEven(0)' },
    ])
  },
  {
    id: 'maxtwo',
    level: 'Mudah',
    title: 'Nilai Terbesar dari 2 Angka',
    icon: 'M',
    desc: 'Buat fungsi `maxTwo(a, b)` yang mengembalikan angka terbesar di antara a dan b.',
    starterCode: `function maxTwo(a, b) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan if/else atau Math.max().',
    run: (code) => makeTester(code, 'maxTwo', [
      { input: [5, 9], expected: 9, desc: 'maxTwo(5, 9)' },
      { input: [3, 1], expected: 3, desc: 'maxTwo(3, 1)' },
      { input: [7, 7], expected: 7, desc: 'maxTwo(7, 7)' },
    ])
  },
  {
    id: 'reverse',
    level: 'Mudah',
    title: 'Membalik Kata',
    icon: 'R',
    desc: 'Buat fungsi `reverse(str)` yang mengembalikan string yang dibalik.',
    starterCode: `function reverse(str) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan split(), reverse(), join() — atau loop manual.',
    run: (code) => makeTester(code, 'reverse', [
      { input: 'abc', expected: 'cba', desc: 'reverse("abc")' },
      { input: 'budi', expected: 'idub', desc: 'reverse("budi")' },
      { input: 'a', expected: 'a', desc: 'reverse("a")' },
    ])
  },
  {
    id: 'greet',
    level: 'Mudah',
    title: 'Sapaan',
    icon: 'G',
    desc: 'Buat fungsi `greet(name)` yang mengembalikan string `"Halo, {name}!"`.',
    starterCode: `function greet(name) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan template literal atau concatenation.',
    run: (code) => makeTester(code, 'greet', [
      { input: 'Budi', expected: 'Halo, Budi!', desc: 'greet("Budi")' },
      { input: 'Siti', expected: 'Halo, Siti!', desc: 'greet("Siti")' },
    ])
  },

  // ========== SEDANG ==========
  {
    id: 'maxarray',
    level: 'Sedang',
    title: 'Nilai Terbesar di Array',
    icon: 'A',
    desc: 'Buat fungsi `maxArray(arr)` yang mengembalikan angka terbesar dari sebuah array.',
    starterCode: `function maxArray(arr) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan loop atau Math.max() + spread operator.',
    run: (code) => makeTester(code, 'maxArray', [
      { input: [3, 7, 2, 9, 1], expected: 9, desc: 'maxArray([3,7,2,9,1])' },
      { input: [-5, -2, -8], expected: -2, desc: 'maxArray([-5,-2,-8])' },
      { input: [100], expected: 100, desc: 'maxArray([100])' },
    ])
  },
  {
    id: 'countvowels',
    level: 'Sedang',
    title: 'Hitung Vokal',
    icon: 'V',
    desc: 'Buat fungsi `countVowels(str)` yang mengembalikan jumlah huruf vokal (a, i, u, e, o) dalam string.',
    starterCode: `function countVowels(str) {
  // tulis jawaban di sini
}`,
    info: 'Loop tiap karakter dan cek apakah termasuk vokal. Case-insensitive.',
    run: (code) => makeTester(code, 'countVowels', [
      { input: 'hello', expected: 2, desc: 'countVowels("hello")' },
      { input: 'budi', expected: 2, desc: 'countVowels("budi")' },
      { input: 'xyz', expected: 0, desc: 'countVowels("xyz")' },
    ])
  },
  {
    id: 'ispalindrome',
    level: 'Sedang',
    title: 'Palindrome',
    icon: 'P',
    desc: 'Buat fungsi `isPalindrome(str)` yang mengecek apakah string adalah palindrome.',
    starterCode: `function isPalindrome(str) {
  // tulis jawaban di sini
}`,
    info: 'Palindrome dibaca sama dari depan dan belakang. Contoh: "katak", "malam".',
    run: (code) => makeTester(code, 'isPalindrome', [
      { input: 'katak', expected: true, desc: 'isPalindrome("katak")' },
      { input: 'budi', expected: false, desc: 'isPalindrome("budi")' },
      { input: 'a', expected: true, desc: 'isPalindrome("a")' },
    ])
  },

  // ========== SULIT ==========
  {
    id: 'removeduplicates',
    level: 'Sulit',
    title: 'Hapus Duplikat',
    icon: 'D',
    desc: 'Buat fungsi `removeDuplicates(arr)` yang mengembalikan array baru tanpa angka duplikat.',
    starterCode: `function removeDuplicates(arr) {
  // tulis jawaban di sini
}`,
    info: 'Gunakan Set, filter + indexOf, atau array manual.',
    run: (code) => makeTester(code, 'removeDuplicates', [
      { input: [1, 2, 2, 3, 3, 4], expected: [1, 2, 3, 4], desc: 'removeDuplicates([1,2,2,3,3,4])' },
      { input: [1, 1, 1], expected: [1], desc: 'removeDuplicates([1,1,1])' },
      { input: [], expected: [], desc: 'removeDuplicates([])' },
    ])
  },
  {
    id: 'secondLargest',
    level: 'Sulit',
    title: 'Nilai Terbesar Kedua',
    icon: '2',
    desc: 'Buat fungsi `secondLargest(arr)` yang mengembalikan nilai terbesar kedua dari array.',
    starterCode: `function secondLargest(arr) {
  // tulis jawaban di sini
}`,
    info: 'Urutkan atau cari dua nilai terbesar dalam satu loop.',
    run: (code) => makeTester(code, 'secondLargest', [
      { input: [3, 7, 2, 9, 1], expected: 7, desc: 'secondLargest([3,7,2,9,1])' },
      { input: [10, 5, 8], expected: 8, desc: 'secondLargest([10,5,8])' },
      { input: [-1, -5, -2], expected: -2, desc: 'secondLargest([-1,-5,-2])' },
    ])
  },
  {
    id: 'anagrams',
    level: 'Sulit',
    title: 'Anagram',
    icon: 'A',
    desc: 'Buat fungsi `areAnagrams(a, b)` yang mengecek apakah dua string adalah anagram (tersusun dari huruf yang sama).',
    starterCode: `function areAnagrams(a, b) {
  // tulis jawaban di sini
}`,
    info: 'Anagram: "listen" dan "silent" memiliki huruf yang sama. Sort hurufnya dan bandingkan.',
    run: (code) => makeTester(code, 'areAnagrams', [
      { input: ['listen', 'silent'], expected: true, desc: 'areAnagrams("listen", "silent")' },
      { input: ['hello', 'world'], expected: false, desc: 'areAnagrams("hello", "world")' },
      { input: ['', ''], expected: true, desc: 'areAnagrams("", "")' },
    ])
  },
]

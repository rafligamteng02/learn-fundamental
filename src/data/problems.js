const fizzBuzzExpected = []
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) fizzBuzzExpected.push('FizzBuzz')
  else if (i % 3 === 0) fizzBuzzExpected.push('Fizz')
  else if (i % 5 === 0) fizzBuzzExpected.push('Buzz')
  else fizzBuzzExpected.push(String(i))
}

export const problems = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Mudah',
    icon: 'F',
    desc: 'Cetak angka 1 sampai 100. Kelipatan 3 → "Fizz", kelipatan 5 → "Buzz", kelipatan 3 dan 5 → "FizzBuzz".',
    starterCode: `function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    // tulis jawaban di sini
  }
}

fizzBuzz()`,
    info: 'Gunakan console.log() untuk mencetak output. Operator modulus (%) untuk cek kelipatan.',
    run: (userCode) => {
      const logs = []
      const mockLog = (...args) => logs.push(args.join(' '))

      try {
        const fn = new Function('console', userCode)
        fn({ log: mockLog })
      } catch (e) {
        return { pass: false, error: e.message, logs: [] }
      }

      if (logs.length !== 100) {
        return {
          pass: false,
          error: `Output harus 100 baris, tetapi hanya ${logs.length} baris yang tercetak.`,
          logs
        }
      }

      const failedIndices = []
      for (let i = 0; i < 100; i++) {
        if (logs[i] !== fizzBuzzExpected[i]) {
          failedIndices.push(i + 1)
        }
      }

      if (failedIndices.length === 0) {
        return { pass: true, logs, expected: fizzBuzzExpected }
      }

      return {
        pass: false,
        error: `Angka ${failedIndices.slice(0, 5).join(', ')}${failedIndices.length > 5 ? '...' : ''} belum sesuai. Cek kelipatan 3, 5, dan 15.`,
        logs
      }
    }
  },
  {
    id: 'palindrome',
    title: 'Palindrome',
    difficulty: 'Mudah',
    icon: 'P',
    desc: 'Buat fungsi yang mengecek apakah sebuah string adalah palindrome (dibaca sama dari depan dan belakang).',
    starterCode: `function isPalindrome(str) {
  // tulis jawaban di sini
}`,
    info: 'Palindrome: "katak" → true, "budi" → false. String sudah lowercase semua.',
    run: (userCode) => {
      const logs = []
      const mockLog = (...args) => logs.push(args.join(' '))

      try {
        const fn = new Function('console', userCode + '\nreturn isPalindrome;')
        const userFn = fn({ log: mockLog })

        const tests = [
          { input: 'katak', expected: true, desc: 'isPalindrome("katak")' },
          { input: 'budi', expected: false, desc: 'isPalindrome("budi")' },
          { input: 'malam', expected: true, desc: 'isPalindrome("malam")' },
          { input: 'a', expected: true, desc: 'isPalindrome("a")' },
          { input: '', expected: true, desc: 'isPalindrome("")' },
        ]

        const results = tests.map(t => {
          const actual = userFn(t.input)
          return { ...t, actual, pass: actual === t.expected }
        })

        const pass = results.every(r => r.pass)
        return {
          pass,
          results,
          failDetail: pass ? null : `"${results.find(r => !r.pass).desc}" → expected ${results.find(r => !r.pass).expected}, got ${results.find(r => !r.pass).actual}`
        }
      } catch (e) {
        return { pass: false, error: e.message, results: [] }
      }
    }
  },
  {
    id: 'charfreq',
    title: 'Frekuensi Huruf',
    difficulty: 'Mudah',
    icon: 'H',
    desc: 'Buat fungsi yang menghitung jumlah kemunculan setiap huruf dalam sebuah string.',
    starterCode: `function charFrequency(str) {
  // tulis jawaban di sini
}`,
    info: 'Contoh: "hello" → { h: 1, e: 1, l: 2, o: 1 }. Urutan properti object tidak penting.',
    run: (userCode) => {
      const logs = []
      const mockLog = (...args) => logs.push(args.join(' '))

      try {
        const fn = new Function('console', userCode + '\nreturn charFrequency;')
        const userFn = fn({ log: mockLog })

        const tests = [
          {
            input: 'hello',
            expected: { h: 1, e: 1, l: 2, o: 1 },
            desc: 'charFrequency("hello")'
          },
          {
            input: 'aabbcc',
            expected: { a: 2, b: 2, c: 2 },
            desc: 'charFrequency("aabbcc")'
          },
          {
            input: '',
            expected: {},
            desc: 'charFrequency("")'
          },
        ]

        const results = tests.map(t => {
          const actual = userFn(t.input)
          const pass = JSON.stringify(actual) === JSON.stringify(t.expected)
          return { ...t, actual, pass }
        })

        const pass = results.every(r => r.pass)
        return {
          pass,
          results,
          failDetail: pass ? null : `"${results.find(r => !r.pass).desc}" belum sesuai.`
        }
      } catch (e) {
        return { pass: false, error: e.message, results: [] }
      }
    }
  },
  {
    id: 'unique',
    title: 'Filter Unik',
    difficulty: 'Mudah',
    icon: 'U',
    desc: 'Buat fungsi yang menerima array angka dan mengembalikan array baru tanpa angka duplikat.',
    starterCode: `function unique(arr) {
  // tulis jawaban di sini
}`,
    info: 'Contoh: [1, 2, 2, 3, 4, 4, 5] → [1, 2, 3, 4, 5]. Urutan angka harus tetap.',
    run: (userCode) => {
      const logs = []
      const mockLog = (...args) => logs.push(args.join(' '))

      try {
        const fn = new Function('console', userCode + '\nreturn unique;')
        const userFn = fn({ log: mockLog })

        const tests = [
          { input: [1, 2, 2, 3, 4, 4, 5], expected: [1, 2, 3, 4, 5], desc: 'unique([1,2,2,3,4,4,5])' },
          { input: [1, 1, 1], expected: [1], desc: 'unique([1,1,1])' },
          { input: [], expected: [], desc: 'unique([])' },
        ]

        const results = tests.map(t => {
          const actual = userFn(t.input)
          const pass = JSON.stringify(actual) === JSON.stringify(t.expected)
          return { ...t, actual, pass }
        })

        const pass = results.every(r => r.pass)
        return {
          pass,
          results,
          failDetail: pass ? null : `"${results.find(r => !r.pass).desc}" belum sesuai.`
        }
      } catch (e) {
        return { pass: false, error: e.message, results: [] }
      }
    }
  },
]

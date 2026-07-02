# 09 — Live Coding (API & Function)

---

## 🛠️ API

### Soal 1: Fetch & Tampilkan Users

**Deskripsi:** Ambil data users dari `https://jsonplaceholder.typicode.com/users` lalu tampilkan dalam tabel dengan kolom **Name**, **Email**, **City**.

**Input:** —
**Output:** Tabel HTML berisi 10 user

**Waktu:** 10 menit

💡 **Clue (buka kalo mentok):**
```
1. useEffect(() => { fetch(url).then(res => res.json()) }, [])
2. useState([]) untuk nyimpen data
3. .map() buat render baris tabel
```

✅ **Jawaban (React):**
```jsx
function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

🔍 **Yang dinilai interviewer:**
- Paham lifecycle (useEffect + dependency array)
- Tahu akses nested object (`user.address.city`)
- Pake `key` di .map()
- Loading state? Nilai plus

---

### Soal 2: Search / Filter Users

**Deskripsi:** Dari data users di atas, tambahkan input search. Ketika user ngetik, tabel otomatis filter berdasarkan nama (case-insensitive).

**Input:** Kata kunci dari input
**Output:** Tabel user yang namanya mengandung kata kunci

**Waktu:** 10 menit

💡 **Clue:**
```
1. useState untuk searchTerm
2. input onChange → setSearchTerm(e.target.value)
3. .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
```

✅ **Jawaban (React):**
```jsx
function UserList() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Cari user..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

🔍 **Yang dinilai interviewer:**
- Filter di JavaScript (bukan di backend)
- Pake `.toLowerCase()` biar case-insensitive
- Input controlled component
- derived state (filtered dihitung dari users + search, bukan state baru)

---

### Soal 3: Form Submit → POST

**Deskripsi:** Buat form sederhana (name + email). Saat di-submit, kirim data ke `https://jsonplaceholder.typicode.com/posts` pake method POST. Tampilkan response dari server di bawah form.

**Input:** Name + Email dari input
**Output:** Response JSON dari server

**Waktu:** 15 menit

💡 **Clue:**
```
1. Controlled component: value + onChange buat tiap input
2. onSubmit: e.preventDefault(), FETCH dengan method: POST
3. Headers: { 'Content-Type': 'application/json' }
4. Body: JSON.stringify({ name, email })
```

✅ **Jawaban (React):**
```jsx
function CreateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      const data = await res.json()
      setResponse(data)
      setName('')
      setEmail('')
    } catch (err) {
      alert('Gagal: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  )
}
```

🔍 **Yang dinilai interviewer:**
- Paham POST request (method, headers, body)
- Async/await + try/catch
- Loading state + disable button
- PreventDefault biar ga reload
- Reset form setelah sukses

---

## ⚡ Function (Vanilla JS)

### Soal 4: FizzBuzz

**Deskripsi:** Cetak angka 1 sampai 100. Tapi:
- Kelipatan 3 → cetak "Fizz"
- Kelipatan 5 → cetak "Buzz"
- Kelipatan 3 DAN 5 → cetak "FizzBuzz"
- Selainnya → cetak angka

**Input:** —
**Output:** 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, ...

**Waktu:** 5 menit

💡 **Clue:**
```
1. Loop 1-100 (for atau Array.from)
2. Cek % 15 dulu (karena kelipatan 3 dan 5)
3. Baru % 3, % 5, else
```

✅ **Jawaban:**
```js
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) console.log('FizzBuzz')
    else if (i % 3 === 0) console.log('Fizz')
    else if (i % 5 === 0) console.log('Buzz')
    else console.log(i)
  }
}
```

🔍 **Yang dinilai interviewer:**
- Urutan pengecekan (15 dulu, baru 3 & 5)
- Minimalis & readable
- Paham operator modulus (%)

---

### Soal 5: Palindrome

**Deskripsi:** Buat fungsi yang ngecek apakah sebuah string adalah palindrome (dibaca sama dari depan dan belakang).

**Input:** `"katak"` → true, `"budi"` → false, `"malam"` → true
**Output:** boolean

**Waktu:** 5 menit

💡 **Clue:**
```
1. split('') → array huruf
2. reverse() → balik urutan
3. join('') → jadi string lagi
4. Bandingkan dengan string asli
```

✅ **Jawaban:**
```js
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('')
  return str === reversed
}

// Alternatif (tanpa reverse):
function isPalindrome2(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false
  }
  return true
}
```

🔍 **Yang dinilai interviewer:**
- Tahu method split, reverse, join
- Atau logic manual pake loop (sama bagusnya)
- Handle case-sensitive? (bonus kalo pake .toLowerCase())

---

### Soal 6: Hitung Frekuensi Huruf

**Deskripsi:** Buat fungsi yang menerima string dan mengembalikan object berisi jumlah kemunculan tiap huruf.

**Input:** `"hello"` → `{ h: 1, e: 1, l: 2, o: 1 }`
**Output:** Object

**Waktu:** 7 menit

💡 **Clue:**
```
1. Loop tiap karakter
2. Kalo belum ada di object → set 1
3. Kalo udah ada → increment
```

✅ **Jawaban:**
```js
function charFrequency(str) {
  const result = {}
  for (const char of str) {
    result[char] = (result[char] || 0) + 1
  }
  return result
}

// Pake reduce:
function charFrequency2(str) {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1
    return acc
  }, {})
}
```

🔍 **Yang dinilai interviewer:**
- Paham object sebagai lookup (O(1) access)
- Tahu short-circuit `|| 0` biar ga undefined
- Bisa pake for...of atau reduce

---

### Soal 7: Filter Angka Unik

**Deskripsi:** Buat fungsi yang menerima array berisi angka (mungkin duplikat) dan mengembalikan array baru yang hanya berisi angka unik.

**Input:** `[1, 2, 2, 3, 4, 4, 5]` → `[1, 2, 3, 4, 5]`
**Output:** Array

**Waktu:** 5 menit

💡 **Clue:**
```
1. new Set(arr) → otomatis ilangin duplikat
2. [...new Set(arr)] → jadi array lagi
3. Atau pake filter indexOf
```

✅ **Jawaban:**
```js
function unique(arr) {
  return [...new Set(arr)]
}

// Alternatif (tanpa Set):
function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}
```

🔍 **Yang dinilai interviewer:**
- Tahu `Set` untuk unique values
- Atau paham `indexOf` vs `index` buat filter manual
- Mention time complexity kalo ditanya

---

## 🔍 Tips Menjawab Live Coding

| Situasi | Yang Harus Dilakuin |
|---------|--------------------|
| Dapet soal | **Baca ulang** soal. Tanya kalo ada yang ga jelas |
| Mulai nulis | **Jelaskan sambil nulis** — "saya mulai bikin function dulu..." |
| Error | Tetap tenang. **Baca pesan error** dengan suara keras. Cari typo dulu |
| Mentok | **Minta clue** — "boleh minta petunjuk?" Ga masalah, mereka pengen liat cara kamu handle pressure |
| Selesai | **Explain ulang** — "function ini nerima input X, diproses Y, output Z" |
| Ditanya "gimana kalo..." | "Kalo inputnya kosong, function ini return undefined — perlu saya tambahin guard?" |

### Checklist sebelum selesai:
- [ ] Nama function jelas (verb + noun: `getUsers`, `filterByName`)
- [ ] Handle edge case (input kosong, null, undefined)
- [ ] Format kode rapi (indentasi, spacing)
- [ ] Jelaskan complexity (O(n), O(1)) kalo ditanya
- [ ] No console.log di final code (kecuali diminta)

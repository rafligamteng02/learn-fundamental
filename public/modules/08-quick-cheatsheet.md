# 08 — Quick Cheatsheet (Hafalan H-1 Interview)

## Web Fundamental
| Konsep | 1 Kalimat |
|--------|-----------|
| DNS | Translate domain ke IP |
| TCP Handshake | SYN → SYN-ACK → ACK |
| HTTP Methods | GET (baca), POST (buat), PUT (ganti), DELETE (hapus) |
| Status Codes | 2xx sukses, 3xx redirect, 4xx client error, 5xx server error |
| REST API | API stateless pakai HTTP verb buat CRUD |
| CORS | Browser blokir cross-origin, solusi: header `Access-Control-Allow-Origin` |

## JavaScript
| Konsep | 1 Kalimat |
|--------|-----------|
| Hoisting | Variable & function diangkat ke atas scope |
| Closure | Fungsi inget scope luar meski dipanggil di luar |
| Event Loop | Call Stack → Microtask → Macrotask |
| Promise | Object representasi nilai async (pending/fulfilled/rejected) |
| Async/Await | Syntactic sugar Promise biar kelihatan sync |
| `==` vs `===` | `==` coercion, `===` strict |
| `this` | Tergantung cara panggil (method, regular, arrow, bind) |

## React
| Konsep | 1 Kalimat |
|--------|-----------|
| Virtual DOM | Representasi JS dari DOM, pake diffing & batch update |
| Props | Data dari parent ke child, read-only |
| State | Data internal component, mutable, trigger re-render |
| useEffect | Side effects setelah render (fetch, event listener) |
| useState | Hook buat state lokal |
| useReducer | Alternatif useState buat state kompleks |
| useContext | Akses global state tanpa prop drilling |
| useMemo | Memoize hasil komputasi mahal |
| useCallback | Memoize function reference |

## Laravel
| Konsep | 1 Kalimat |
|--------|-----------|
| MVC | Model (data), View (UI), Controller (logic) |
| Eloquent | ORM Active Record bawaan Laravel |
| Migration | Version control database |
| Middleware | Filter request sebelum controller |
| N+1 Problem | Looping query relasi, solusi: eager loading `with()` |
| Route Model Binding | Auto inject model dari route parameter |
| CSRF | Token anti cross-site request forgery |
| Service Container | Dependency injection container |

## Database
| Konsep | 1 Kalimat |
|--------|-----------|
| INNER JOIN | Hanya data cocok dari 2 tabel |
| LEFT JOIN | Semua dari kiri, data kanan optional |
| Index | B-Tree buat cepetin SELECT, trade-off update lambat |
| ACID | Atomicity, Consistency, Isolation, Durability |
| Normalization | Hilangin redundancy, pecah tabel |
| Transaction | All-or-nothing, COMMIT / ROLLBACK |
| Primary Key | Unik ID setiap baris |
| Foreign Key | Referensi ke PK tabel lain |

## CS Fundamental
| Konsep | 1 Kalimat |
|--------|-----------|
| OOP 4 Pilar | Encapsulation, Inheritance, Polymorphism, Abstraction |
| Big O | Notasi kompleksitas algoritma (n, log n, n², dll) |
| Binary Search | Cari data array terurut dengan bagi 2 terus O(log n) |
| SOLID | 5 prinsip OOP: S, O, L, I, D |
| Stack vs Queue | Stack LIFO (undo), Queue FIFO (antrian) |
| Array vs Linked List | Array O(1) access, LL O(1) insert |
| Singleton | Satu instance untuk satu class |
| Repository | Abstraksi data layer, pisahin logic query dari controller |

## HTTP Status Codes (yang wajib hafal)
- **200** OK
- **201** Created
- **204** No Content
- **301** Moved Permanently
- **302** Found (redirect sementara)
- **400** Bad Request
- **401** Unauthorized (belum login)
- **403** Forbidden (ga punya akses)
- **404** Not Found
- **422** Validation Error
- **429** Too Many Requests (rate limit)
- **500** Internal Server Error
- **502** Bad Gateway
- **503** Service Unavailable

## SQL Yang Sering Ditanyain
```sql
-- Joins
SELECT * FROM A INNER JOIN B ON A.id = B.a_id;
SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;

-- Aggregate
SELECT status, COUNT(*), AVG(price) FROM posts GROUP BY status;

-- Subquery
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- Index
CREATE INDEX idx_email ON users(email);

-- Transaction
START TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; COMMIT;
```

## Pertanyaan "Soft Skill" + Teknis
| Pertanyaan | Jawaban |
|------------|---------|
| Ceritain tentang dirimu | Nama, background, skill (React + Laravel), pengalaman project, goals |
| Kenapa apply di sini? | Company relevant, tech stack cocok, mau berkembang |
| Kelemahan kamu? | Jujur tapi ada improvement plan (contoh: "public speaking, saya ikut komunitas") |
| Pernah konflik sama tim? | Ceritain konflik → solusi → hasil positif |
| Gaji yang diharapkan? | Cek rata-rata industri + sesuaikan skill |
| Punya pertanyaan buat kami? | "Tech stack yang dipake?", "Bagaimana proses development?", "Team size?" |

---

## Tips Interview

1. **Pake STAR method** buat jawab pertanyaan behavioral:
   - **S**ituation — konteks
   - **T**ask — tugas kamu
   - **A**ction — tindakan kamu
   - **R**esult — hasilnya

2. **Kalo ga tau jawabannya**, bilang "Saya belum pernah implementasi secara langsung, tapi setahu saya konsepnya..." — jangan ngibul.

3. **Tulis kode di kertas/whiteboard** — perhatikan indentasi dan naming, jelaskan sambil nullis.

4. **Fokus ke fundamental**, bukan hafalan sintaks.

5. **Tunjukin antusiasme** belajar & growth mindset.

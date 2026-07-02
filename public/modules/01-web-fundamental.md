# 01 — Web Fundamental

## 1. Apa yang terjadi saat user mengetik URL di browser?

```
URL diketik → DNS lookup → TCP handshake → HTTP request → Server proses → HTTP response → Browser render
```

### Langkah detail:
1. **DNS Lookup** — browser cari IP address dari domain (cache → ISP DNS → root DNS).
2. **TCP Handshake** — 3-way handshake (SYN, SYN-ACK, ACK) antara client & server.
3. **TLS Handshake** (jika HTTPS) — negosiasi sertifikat SSL/TLS, buat sesi aman.
4. **HTTP Request** — browser kirim request GET ke server.
5. **Server Process** — server (Laravel) proses request, query DB, return response.
6. **HTTP Response** — server kirim HTML + CSS + JS.
7. **Browser Render** — parse HTML → DOM Tree, parse CSS → CSSOM, execute JS, render page.

> **Tips interview:** Jangan jawab "buka browser trus muncul". Sebutkan DNS, TCP handshake, dan render process. Itu menunjukkan kamu paham jaringan.

---

## 2. HTTP Methods & Status Codes

### Methods:
| Method | Fungsi |
|--------|--------|
| GET | Ambil data |
| POST | Buat data baru |
| PUT / PATCH | Update data (PUT: replace all, PATCH: partial) |
| DELETE | Hapus data |

### Status Codes:
| Range | Arti | Contoh |
|-------|------|--------|
| 1xx | Informational | 101 Switching Protocols |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation Error |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

> **Q:** Bedanya 401 vs 403?
> **A:** 401 = belum login (unauthenticated), 403 = sudah login tapi tidak punya akses (unauthorized).

---

## 3. RESTful API

### Prinsip REST:
1. **Stateless** — setiap request berdiri sendiri, ga pake session server.
2. **Resource-based** — tiap entitas punya endpoint `/api/users`, `/api/posts`.
3. **HTTP Verbs** — GET, POST, PUT, DELETE sesuai operasi CRUD.
4. **JSON Response** — format data standar.

### Contoh endpoint REST:
```
GET    /api/users        → ambil semua users
GET    /api/users/1      → ambil user id 1
POST   /api/users        → buat user baru
PUT    /api/users/1      → update user id 1
DELETE /api/users/1      → hapus user id 1
```

> **Q:** Kenapa REST stateless?
> **A:** Biar mudah di-scale. Server mana pun bisa handle request tanpa perlu share session.

---

## 4. Client Server Architecture

```
[Browser] --HTTP--> [Web Server (Nginx/Apache)] --PHP--> [Laravel App] --SQL--> [Database]
    |                                                                              |
    +<--HTML/CSS/JS--+<----Response----+<----Eloquent Results---------------------+
```

**Web Server:** Nginx/Apache — serve static files, forward request ke Laravel.
**Application Server:** Laravel — logic bisnis, routing, database.
**Database:** MySQL/PostgreSQL — simpan data.

---

## 5. CORS (Cross-Origin Resource Sharing)

**Masalah:** Browser melarang request dari domain berbeda (Same-Origin Policy).
**Solusi:** Server kirim header `Access-Control-Allow-Origin`.

Cara di Laravel:
```php
// app/Http/Middleware/Cors.php
return $next($request)
    ->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
```

---

## 6. Cookies vs LocalStorage vs SessionStorage

| | Cookie | LocalStorage | SessionStorage |
|---|---|---|---|
| Kapasitas | 4KB | 5-10MB | 5-10MB |
| Expiry | Manual | Tidak ada | Saat tab ditutup |
| Dikirim ke server | Ya (otomatis) | Tidak | Tidak |
| Akses | Client & Server | Client only | Client only |
| Use case | Session login, tracking | Theme, preferences | Form sementara |

---

## 7. HTTPS & SSL/TLS

HTTPS = HTTP + SSL/TLS encryption.

**Cara kerja:**
1. Client minta koneksi aman.
2. Server kirim sertifikat SSL (berisi public key).
3. Client verifikasi sertifikat ke Certificate Authority (CA).
4. Client buat session key (symmetric), encrypt pake public key server.
5. Server decrypt pake private key.
6. Komunikasi dilanjutkan symmetric encryption (lebih cepat).

> **Jawab di interview:** "HTTPS menggunakan asymmetric encryption (public/private key) untuk pertukaran session key, lalu beralih ke symmetric encryption untuk komunikasi data."

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Apa itu DNS? | Sistem yang menerjemahkan domain ke IP address. |
| 2 | Bedanya HTTP dan HTTPS? | HTTPS pakai enkripsi SSL/TLS, HTTP plain text. |
| 3 | Apa itu REST? | Arsitektur API stateless berbasis resource (CRUD via HTTP verbs). |
| 4 | Kenapa pakai PUT vs PATCH? | PUT replace seluruh data, PATCH hanya field tertentu. |
| 5 | Apa itu idempotent? | Request yang hasilnya sama meski dijalankan berkali-kali (GET, PUT, DELETE). |
| 6 | Jelaskan 3-way handshake! | SYN → SYN-ACK → ACK. Proses buat koneksi TCP. |
| 7 | Apa itu CDN? | Jaringan server tersebar untuk deliver konten statis lebih cepat. |
| 8 | Bedanya authentication vs authorization? | Auth**n** = siapa kamu (login), Auth**z** = apa yang boleh kamu lakukan. |

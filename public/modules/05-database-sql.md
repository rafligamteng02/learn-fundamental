# 05 — Database & SQL

## 1. Relational Database Concepts

**Database relasional** = data disimpan di tabel-tabel yang saling berelasi pake key.

### Key:
| Key | Fungsi |
|-----|--------|
| **Primary Key (PK)** | Unik untuk setiap baris (contoh: `id`) |
| **Foreign Key (FK)** | Merujuk ke PK tabel lain |
| **Unique Key** | Nilai unik (email, username) |
| **Index** | Biar query lebih cepat |

---

## 2. Joins

### INNER JOIN
Hanya data yang cocok di kedua tabel.

```sql
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;
-- Hanya user yang punya post yang tampil
```

### LEFT JOIN
Semua data dari tabel kiri, data tabel kanan kalo ada.

```sql
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;
-- Semua user tampil (post bisa NULL kalo ga punya)
```

### RIGHT JOIN
Kebalikan LEFT JOIN.

```sql
SELECT users.name, posts.title
FROM users
RIGHT JOIN posts ON users.id = posts.user_id;
```

### FULL OUTER JOIN
Semua data dari kedua tabel.
MySQL ga support FULL OUTER JOIN, alternatif: UNION LEFT + RIGHT.

> **Q:** INNER JOIN vs LEFT JOIN?
> **A:** INNER JOIN hanya data yang cocok di kedua tabel. LEFT JOIN semua dari kiri, data kanan opsional.

---

## 3. Aggregation & Group By

```sql
SELECT
    status,
    COUNT(*) as total,
    SUM(views) as total_views,
    AVG(rating) as avg_rating,
    MAX(price) as termahal,
    MIN(price) as termurah
FROM posts
GROUP BY status
HAVING total > 10;
```

**Urutan eksekusi SQL:**
```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

> **Q:** Bedanya WHERE vs HAVING?
> **A:** WHERE filter SEBELUM grouping. HAVING filter SETELAH grouping.

---

## 4. Normalization (Normalisasi)

**Tujuan:** Mengurangi redundancy & inconsistency data.

### 1NF (First Normal Form):
- Setiap kolom bernilai atomik (ga ada array/JSON).
- Setiap baris unik (pake PK).

### 2NF (Second Normal Form):
- Sudah 1NF.
- Tidak ada partial dependency (semua kolom tergantung full PK).

### 3NF (Third Normal Form):
- Sudah 2NF.
- Tidak ada transitive dependency (kolom non-key ga tergantung kolom non-key lain).

### Contoh denormalized vs normalized:

**❌ Denormalized (satu tabel):**
| order_id | customer_name | product_name | product_price |
|----------|--------------|--------------|---------------|
| 1 | Budi | Laptop | 10000000 |
| 2 | Budi | Mouse | 200000 |

**✅ Normalized:**
| id | name |
|----|------|
| 1 | Budi |

| id | order_date | customer_id |
|----|-----------|-------------|
| 1 | 2024-01-01 | 1 |
| 2 | 2024-01-02 | 1 |

| id | order_id | product_name | price |
|----|----------|--------------|-------|
| 1 | 1 | Laptop | 10000000 |
| 2 | 2 | Mouse | 200000 |

---

## 5. Indexing

Index = struktur data (B-Tree) yang bikin SELECT lebih cepat.

```sql
-- Single column index
CREATE INDEX idx_email ON users(email);

-- Composite index (urutan penting!)
CREATE INDEX idx_status_created ON posts(status, created_at);

-- Unique index
CREATE UNIQUE INDEX idx_email_unique ON users(email);
```

### Kapan pake index:
- Kolom yang sering di WHERE, JOIN, ORDER BY
- Kolom dengan cardinality tinggi (banyak nilai unik)

### Kapan JANGAN pake index:
- Tabel kecil
- Kolom yang jarang di-query
- Kolom yang sering di-update (index perlu di-rebuild)

### Cara cek query lambat:
```sql
EXPLAIN SELECT * FROM posts WHERE status = 'published';
```

> **Q:** Kenapa index bikin query cepat?
> **A:** Index pake B-Tree, jadi search O(log n) instead of O(n) full table scan.

---

## 6. ACID

| Property | Arti | Contoh |
|----------|------|--------|
| **A**tomicity | Transaksi all or nothing | Transfer: debit & credit harus sama-sama sukses |
| **C**onsistency | Data selalu valid | Constraint, trigger, FK |
| **I**solation | Transaksi ga saling ganggu | Lock, MVCC |
| **D**urability | Data aman meski server crash | Write-ahead log (WAL) |

**Contoh transaksi:**
```sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

-- Kalo ada error:
ROLLBACK;

-- Kalo sukses:
COMMIT;
```

---

## 7. Transaction & Locking

### Transaction:
```sql
-- MySQL
START TRANSACTION;
UPDATE inventory SET stock = stock - 1 WHERE product_id = 5 AND stock > 0;
INSERT INTO orders (product_id, qty) VALUES (5, 1);
COMMIT;
```

### Lock types:
| Lock | Fungsi |
|------|--------|
| Shared Lock (READ) | Banyak transaksi bisa baca |
| Exclusive Lock (WRITE) | Cuma satu transaksi bisa tulis |
| Row Lock | Lock satu baris |
| Table Lock | Lock seluruh tabel |

### Deadlock:
Dua transaksi saling tunggu. MySQL auto-detect & rollback salah satu.

---

## 8. Relationship Types

### One-to-One
```sql
users → user_profiles (user_id FK unique)
```

### One-to-Many
```sql
users → posts (user_id FK)
```

### Many-to-Many
```sql
posts ← post_tag → tags
-- pivot table: post_id + tag_id
```

---

## 9. PostgreSQL vs MySQL

| Fitur | MySQL | PostgreSQL |
|-------|-------|-----------|
| ACID Compliance | Tergantung engine (InnoDB ✅) | Full ACID |
| JSON | Bagus (JSON, JSONB) | Superior (JSONB + indexing) |
| Full Text Search | Built-in | Built-in (lebih advance) |
| Concurrency | MVCC (sederhana) | MVCC (lebih mature) |
| GIS/Geospatial | Limited | PostGIS (terbaik) |
| Replication | Master-slave, Group Replication | Streaming, Logical |
| Window Function | Limited | Full support |
| Ideal untuk | Web app simple, read-heavy | Complex query, data integrity |

---

## 10. Query Optimization Tips

1. **EXPLAIN** query untuk lihat execution plan.
2. **Index** di kolom yang sering di WHERE, JOIN, ORDER BY.
3. **SELECT kolom spesifik** jangan `SELECT *`.
4. **Gunakan LIMIT** kalo cuma butuh beberapa baris.
5. **Avoid N+1** — batch query instead of loop.
6. **Gunakan JOIN** instead of subquery kalo bisa.
7. **Partitioning** buat tabel besar.
8. **Cache** query yang jarang berubah (Redis).

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Jelaskan INNER JOIN vs LEFT JOIN! | INNER JOIN = irisan, LEFT JOIN = semua dari kiri + data kanan (opsional). |
| 2 | Apa itu normalization? | Proses ngilangin redundancy & inconsistency dengan memecah tabel. |
| 3 | Apa itu indexing? | Struktur data (B-Tree) buat akselerasi SELECT. Trade-off: update lebih lambat. |
| 4 | Jelaskan ACID! | Atomicity, Consistency, Isolation, Durability — jaminan transaksi. |
| 5 | Bedanya WHERE vs HAVING? | WHERE filter baris sebelum GROUP BY, HAVING filter setelah GROUP BY. |
| 6 | Apa itu foreign key? | Kolom yang merujuk ke primary key tabel lain, jaga referential integrity. |
| 7 | Apa itu N+1 problem? | Query tambahan tiap item karena relasi. Solusi: JOIN atau eager loading. |
| 8 | Jelaskan transaction! | Unit kerja yang all-or-nothing. COMMIT kalo sukses, ROLLBACK kalo gagal. |
| 9 | Bedanya MyISAM vs InnoDB? | InnoDB support FK, transaction, row-level locking. MyISAM hanya table lock. |
| 10 | Apa itu deadlock? | Dua transaksi saling tunggu sumber daya. Database auto-detect & rollback. |
| 11 | Jelaskan sharding! | Membagi database jadi beberapa server berdasarkan key (user_id, region). |
| 12 | Apa itu database connection pooling? | Kumpulan koneksi DB yang bisa dipake ulang, lebih efisien dari buka/tutup tiap request. |

# 07 — Fullstack Scenario

## 1. Authentication: JWT vs Session

### Session-based:
```
Login → Server buat session → simpen di memory/DB → kirim session_id (cookie)
```

**Pros:** Bisa revoke langsung, sederhana.
**Cons:** Server stateful, susah scale.

### JWT (JSON Web Token):
```
Login → Server buat token (header.payload.signature) → kirim ke client
Client → kirim Authorization: Bearer <token> tiap request
Server → verifikasi signature (tanpa simpan di DB)
```

**Pros:** Stateless, bisa dipake lintas service, scale gampang.
**Cons:** Ga bisa di-revoke (kecuali pake blacklist).

```js
// JWT payload example:
{
  "sub": 1,
  "name": "Budi",
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700086400
}
```

> **Q:** Session vs JWT, pilih mana?
> **A:** Kalo monolith & butuh revoke → session. Kalo microservices / SPA / mobile → JWT.

---

## 2. CORS (masalah & solusi)

**Masalah:** Frontend (localhost:3000) request API (localhost:8000) → diblokir browser.

**Solusi di Laravel:**
```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_headers' => ['*'],
];

// Atau di middleware:
return $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
```

**Solusi di React (proxy di development):**
```json
// package.json
{
  "proxy": "http://localhost:8000"
}
```

> **Q:** CORS error munculnya di mana?
> **A:** Di BROWSER, bukan di server. Request tetep sampe ke server, tapi browser blokir responsenya.

---

## 3. JWT di Frontend: Simpan di mana?

| Tempat | Aman? | Issue |
|--------|-------|-------|
| localStorage | ❌ Kena XSS | Paling gampang diambil attacker |
| httpOnly Cookie | ✅ Aman dari XSS | Kena CSRF (tapi bisa pakai SameSite) |
| Memory (variable) | ✅ Paling aman | Hilang kalo refresh |

**Best practice:** Akses token di memory, refresh token di httpOnly cookie.

---

## 4. Error Handling Strategy

### Frontend:
```js
async function fetchData() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server return error (4xx, 5xx)
      const { status, data } = error.response;
      if (status === 401) redirectLogin();
      if (status === 422) setErrors(data.errors);
    } else if (error.request) {
      // No response (network error)
      showToast("Koneksi bermasalah");
    }
    throw error;
  }
}
```

### Backend (Laravel):
```php
// Exception Handler
public function register()
{
    $this->reportable(function (Throwable $e) {
        Log::error($e->getMessage());
    });

    $this->renderable(function (AuthenticationException $e, $request) {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    });
}

// Form request validation error → otomatis 422
```

---

## 5. Pagination

### Backend (Laravel):
```php
// Controller
public function index(Request $request)
{
    $perPage = $request->get('per_page', 15);
    $users = User::paginate($perPage);

    // Manual pagination with cursor
    $posts = Post::where('id', '>', $request->cursor)
                 ->take(10)
                 ->get();

    return response()->json($users);
}
```

### Frontend (React):
```jsx
function UserList() {
  const [page, setPage] = useState(1);
  const { data, totalPages } = useQuery(['users', page], () =>
    api.get(`/users?page=${page}`)
  );

  return (
    <>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </>
  );
}
```

---

## 6. File Upload

### Backend (Laravel):
```php
public function upload(Request $request)
{
    $request->validate([
        'avatar' => 'required|image|mimes:jpg,png|max:2048'
    ]);

    $path = $request->file('avatar')
        ->store('avatars', 'public'); // storage/app/public/avatars

    // Simpan path ke DB
    $user = auth()->user();
    $user->avatar = $path;
    $user->save();

    return response()->json(['url' => Storage::url($path)]);
}
```

### Frontend (React):
```jsx
const handleUpload = async (e) => {
  const formData = new FormData();
  formData.append('avatar', e.target.files[0]);

  const response = await axios.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  setAvatarUrl(response.data.url);
};
```

---

## 7. Search Feature

### Backend (Laravel):
```php
public function search(Request $request)
{
    $query = Post::query();

    if ($request->filled('q')) {
        $search = $request->q;
        $query->where(function($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%");
        });
    }

    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    if ($request->filled('date_from')) {
        $query->whereDate('created_at', '>=', $request->date_from);
    }

    return $query->paginate(10);
}
```

---

## 8. Caching Strategy

### Types of cache:

| Cache | Lokasi | Use Case |
|-------|--------|----------|
| Browser Cache | Browser | CSS, JS, gambar statis |
| CDN | Edge server | Asset publik, gambar |
| Redis/Memcached | Server | Query DB, session |
| Laravel Cache | File/Redis | View cache, config cache |

### Laravel + Redis:
```php
// Cache query
$users = Cache::remember('users.active', 3600, function () {
    return User::where('status', 'active')->get();
});

// Cache clear saat data berubah:
User::created(function ($user) {
    Cache::forget('users.active');
});
```

---

## 9. Security Best Practices

| Threat | Solution |
|--------|----------|
| SQL Injection | Eloquent / prepared statements (✅ Laravel otomatis) |
| XSS | Blade `{{ }}` auto-escape, jangan pake `{!! !!}` untuk user input |
| CSRF | `@csrf` di form, `XSRF-TOKEN` cookie |
| Mass Assignment | `$fillable` / `$guarded` di Eloquent Model |
| Rate Limiting | `Route::middleware('throttle:60,1')` |
| Environment | `.env` di .gitignore, jangan commit secrets |
| HTTPS | Force HTTPS via middleware / config |

---

## 10. Deployment Flow

```
Developer commit → GitHub/GitLab → CI/CD (GitHub Actions) → Test → Build → Deploy ke server

Contoh flow:
1. git push ke branch main
2. GitHub Actions jalan: composer install, npm build, phpunit test
3. Deploy ke server via SSH / Laravel Forge / Vapor
4. php artisan migrate (hati-hati dengan production)
5. php artisan cache:clear
6. php artisan config:cache
```

### Environment separation:
```
.env.local    → development
.env.staging  → testing
.env.production → live
```

---

## 11. Database Migration Strategy di Production

1. **Always backup** sebelum migrate.
2. **Deploy code dulu** yang compatible dengan DB lama dan baru.
3. **Migrate** setelah deploy.
4. **Jangan hapus kolom** langsung — deploy dulu kode yang ga pake kolom itu, baru drop.
5. **Zero-downtime migration:**

```php
// ✅ Safe — add column nullable
Schema::table('users', function ($table) {
    $table->string('phone')->nullable()->after('email');
});

// ⚠️ Risky — rename column
Schema::table('users', function ($table) {
    $table->renameColumn('name', 'full_name'); // Bisa break kode lama
});

// ✅ Better — add column baru, deploy kode, drop column lama (2 step)
```

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Bedanya JWT vs session? | JWT stateless, gampang scale, ga bisa revoke. Session stateful, bisa revoke. |
| 2 | Gimana handle CORS? | Set header Access-Control-Allow-Origin di backend. |
| 3 | Cara upload file yang aman? | Validasi tipe & size, simpan di storage, pake URL bukan path langsung. |
| 4 | Gimana implementasi search? | WHERE LIKE / FULLTEXT index / Elasticsearch untuk scale besar. |
| 5 | Gimana caching query? | Redis + Cache::remember(). Invalidasi saat data berubah. |
| 6 | Gimana deploy Laravel? | composer install, npm build, migrate, cache, restart queue. |
| 7 | Apa itu CSRF & cara cegah? | Token unik per session diverifikasi di server. Laravel otomatis. |
| 8 | Gimana handle error di React? | try/catch + axios interceptor + user-friendly message. |
| 9 | Kapan pake state vs redux? | State buat local (form, toggle). Redux buat global (user, cart). |
| 10 | Gimana cara handle concurrency? | Transaction, row locking, queue job, optimistic locking. |

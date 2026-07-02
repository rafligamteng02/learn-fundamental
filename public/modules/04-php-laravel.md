# 04 — PHP & Laravel

## 1. MVC Architecture (Model-View-Controller)

```
[Browser] → Routes → Controller → Model → Database
                   ↓               ↓
                View (blade)    Eloquent ORM
```

| Layer | Tugas | Contoh File |
|-------|-------|-------------|
| **Model** | Interaksi database, business logic | `app/Models/User.php` |
| **View** | Tampilan UI (Blade template) | `resources/views/users/index.blade.php` |
| **Controller** | Jembatan antara Model & View, handle request | `app/Http/Controllers/UserController.php` |
| **Routes** | Mapping URL ke Controller | `routes/web.php`, `routes/api.php` |

### Alur MVC:
1. Browser request `GET /users`
2. Routes cari matching route → arahkan ke `UserController@index`
3. Controller panggil `User::all()` (Model)
4. Model query database, return data
5. Controller pass data ke View
6. View render HTML → return ke browser

> **Q:** Kenapa pake MVC?
> **A:** Separation of concerns — kode lebih terorganisir, mudah di-test, dan maintainable.

---

## 2. Routing

```php
// routes/web.php

// Basic route
Route::get('/users', [UserController::class, 'index']);

// Route dengan parameter
Route::get('/users/{id}', [UserController::class, 'show']);

// Named route
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');

// Route group dengan middleware
Route::middleware(['auth'])->group(function () {
    Route::resource('posts', PostController::class);
});

// Resource route (otomatis 7 route CRUD)
Route::resource('users', UserController::class);
// Hasil: index, create, store, show, edit, update, destroy
```

---

## 3. Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // GET /users
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    // GET /users/create
    public function create()
    {
        return view('users.create');
    }

    // POST /users
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        User::create($validated);
        return redirect()->route('users.index')->with('success', 'User created!');
    }

    // GET /users/{id}
    public function show(User $user)  // Route Model Binding
    {
        return view('users.show', compact('user'));
    }

    // PUT/PATCH /users/{id}
    public function update(Request $request, User $user)
    {
        $user->update($request->validated());
        return redirect()->route('users.index');
    }

    // DELETE /users/{id}
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}
```

### Route Model Binding:
Daripada manual `User::findOrFail($id)`, Laravel otomatis inject model:
```php
public function show(User $user) // Laravel ambil User berdasarkan {id}
```

---

## 4. Eloquent ORM

### Model:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // Tabel (otomatis dari plural class name: 'posts')
    protected $table = 'blog_posts';

    // Field yang boleh diisi mass assignment
    protected $fillable = ['title', 'content', 'user_id'];

    // Field yang disembunyikan dari JSON
    protected $hidden = ['password'];

    // Relasi
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
```

### Query:
```php
// Basic
User::all();
User::find(1);
User::findOrFail(1);  // throw 404 kalo ga ketemu
User::where('status', 'active')->get();
User::where('age', '>', 18)->orderBy('name')->limit(10)->get();

// Aggregates
User::count();
Post::where('status', 'published')->sum('views');

// Eager Loading (N+1 problem fix)
$users = User::with('posts.comments')->get();
// Tanpa with: 1 query user + N query post (N+1)
// Pake with: 3 queries total (user, post, comment)

// Scope
public function scopeActive($query) {
    return $query->where('status', 'active');
}
User::active()->get();

// Chunk (buat data besar)
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // proses 100 user per batch
    }
});
```

### N+1 Problem:
```php
// ❌ N+1: 1 query user + 100 query posts = 101 queries
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count();
}

// ✅ Optimized: 1 query user + 1 query posts (IN clause) = 2 queries
$users = User::with('posts')->get();
```

---

## 5. Migration

```php
// database/migrations/2024_01_01_000001_create_posts_table.php

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('content');
    $table->enum('status', ['draft', 'published'])->default('draft');
    $table->timestamps();  // created_at & updated_at
    $table->softDeletes(); // deleted_at (buat soft delete)
});
```

Perintah: `php artisan migrate`

---

## 6. Middleware

Middleware = filter yang dijalankan SEBELUM request masuk ke controller.

```php
// app/Http/Middleware/CheckRole.php
public function handle(Request $request, Closure $next, $role)
{
    if (! $request->user()->hasRole($role)) {
        abort(403);
    }
    return $next($request);
}

// Di routes/web.php
Route::middleware(['auth', 'role:admin'])->group(function () {
    // hanya admin yang login bisa akses
});
```

Middleware bawaan Laravel: `auth`, `guest`, `throttle`, `verified`, `cors`.

---

## 7. Authentication (Laravel Breeze / Jetstream / Sanctum)

### Sanctum (API token):
```php
// Login
public function login(Request $request)
{
    if (Auth::attempt($request->only('email', 'password'))) {
        $token = $request->user()->createToken('api-token')->plainTextToken;
        return response()->json(['token' => $token]);
    }
    return response()->json(['error' => 'Unauthorized'], 401);
}

// Protected route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
```

---

## 8. Validation

```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'email' => 'required|email|unique:users,email',
    'password' => 'required|min:8|confirmed',
    'age' => 'nullable|integer|min:17',
    'avatar' => 'nullable|image|mimes:jpg,png|max:2048',
]);
```

### Custom validation:
```php
Validator::make($request->all(), [
    'phone' => [
        'required',
        function ($attribute, $value, $fail) {
            if (!str_starts_with($value, '08')) {
                $fail('Nomor harus mulai dengan 08');
            }
        },
    ],
]);
```

---

## 9. Blade Template

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
    @include('partials.navbar')

    <div class="container">
        @yield('content')
    </div>
</body>
</html>

{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Daftar User')

@section('content')
    <h1>Users</h1>

    @forelse ($users as $user)
        <div>{{ $user->name }} - {{ $user->email }}</div>
    @empty
        <p>Tidak ada user.</p>
    @endforelse

    {{ $users->links() }} {{-- pagination --}}
@endsection
```

---

## 10. Service Container & Dependency Injection

Laravel bisa auto-inject dependency ke constructor/method:

```php
class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    public function index()
    {
        return $this->userService->getAll();
    }
}
```

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Jelaskan MVC! | Model (data/DB), View (tampilan), Controller (logika). Separation of concerns. |
| 2 | Apa itu Eloquent? | ORM Laravel yang implementasi Active Record pattern. |
| 3 | Apa itu migration? | Version control untuk skema database. Bisa rollback. |
| 4 | Jelaskan N+1 problem! | Query tambahan tiap item relasi. Solusi: eager loading (`with()`). |
| 5 | Apa itu middleware? | Filter request sebelum masuk controller (auth, log, throttle). |
| 6 | Bedanya `find()` vs `findOrFail()`? | `findOrFail()` throw ModelNotFoundException (auto 404). |
| 7 | Apa itu Route Model Binding? | Laravel auto-inject model berdasarkan {id} di route. |
| 8 | Jelaskan Service Container! | Container untuk manage class & dependency injection. |
| 9 | Apa itu mass assignment? | Mengisi multiple field sekaligus via `create()` atau `update()`. Dilindungi `$fillable`. |
| 10 | Bedanya `GET` vs `POST` di form? | GET di URL, POST di body. POST buat operasi yang ubah data. |
| 11 | Apa itu CSRF? | Security token untuk cegah Cross-Site Request Forgery. Laravel otomatis pake `@csrf`. |
| 12 | Jelaskan soft delete! | Data ga beneran dihapus, cuma di-set `deleted_at`. Pake trait `SoftDeletes`. |

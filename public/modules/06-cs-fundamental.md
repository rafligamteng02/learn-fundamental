# 06 — CS Fundamental

## 1. OOP (Object-Oriented Programming)

### 4 Pilar OOP:

| Pilar | Arti | Contoh |
|-------|------|--------|
| **Encapsulation** | Data & method dibungkus dalam class, akses dibatasi | `private`, `public`, `protected` |
| **Inheritance** | Class turunan mewarisi properti class induk | `class Admin extends User` |
| **Polymorphism** | Method sama punya implementasi beda | Override method, Interface |
| **Abstraction** | Sembunyikan kompleksitas, tunjukin fitur penting | Abstract class, Interface |

### Contoh dalam PHP:
```php
// Abstract class
abstract class Animal {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    // Abstract method — harus diimplementasi subclass
    abstract public function makeSound();
}

// Inheritance
class Dog extends Animal {
    // Polymorphism
    public function makeSound() {
        return "Woof!";
    }
}

class Cat extends Animal {
    public function makeSound() {
        return "Meow!";
    }
}

// Encapsulation
class BankAccount {
    private $balance = 0;  // private — ga bisa akses langsung dari luar

    public function deposit($amount) {
        if ($amount > 0) {
            $this->balance += $amount;
        }
    }

    public function getBalance() {
        return $this->balance;
    }
}
```

> **Q:** Kenapa pake OOP?
> **A:** Kode lebih terstruktur, reusable, mudah di-maintain, dan scalable.

### SOLID Principles:

| Principle | Arti |
|-----------|------|
| **S**ingle Responsibility | Satu class punya satu tanggung jawab |
| **O**pen/Closed | Terbuka untuk extension, tertutup untuk modification |
| **L**iskov Substitution | Subclass harus bisa menggantikan parent-nya |
| **I**nterface Segregation | Jangan paksa class implement method yang ga perlu |
| **D**ependency Inversion | Bergantung pada abstraction, bukan concrete class |

---

## 2. Data Structures

### Array vs Linked List

| | Array | Linked List |
|---|---|---|
| Memory | Contiguous (berurutan) | Tersebar, pake pointer |
| Random Access | O(1) — langsung index | O(n) — musti traversal |
| Insert/Delete awal | O(n) — shift element | O(1) — update pointer |
| Search | O(n) | O(n) |
| Size | Fixed | Dynamic |

```php
// Array
$arr = [1, 2, 3, 4];
echo $arr[2]; // 3 — O(1)

// Linked List (simulasi)
class Node {
    public $data;
    public $next;
    public function __construct($data) {
        $this->data = $data;
        $this->next = null;
    }
}
```

### Stack vs Queue
| | Stack (LIFO) | Queue (FIFO) |
|---|---|---|
| Analogi | Tumpukan piring | Antrian kasir |
| Insert | push (O(1)) | enqueue (O(1)) |
| Remove | pop (O(1)) | dequeue (O(1)) |
| Use case | Undo/Redo, Call stack | Queue system, BFS |

### Hash Table
```php
$hash = [
    "name" => "Budi",
    "age" => 20
];
echo $hash["name"]; // "Budi" — O(1) rata-rata
```

### Tree
```php
class TreeNode {
    public $value;
    public $left;
    public $right;

    public function __construct($value) {
        $this->value = $value;
        $this->left = null;
        $this->right = null;
    }
}
```

**BST (Binary Search Tree):** Left < parent < right. Search O(log n).

### Graph
Graf = nodes + edges.
- **Directed vs Undirected** — arah atau ga.
- **Weighted vs Unweighted** — pake bobot atau ga.
- **Representasi:** Adjacency Matrix atau Adjacency List.

---

## 3. Time & Space Complexity (Big O)

| Notasi | Nama | Contoh |
|--------|------|--------|
| O(1) | Constant | Array access, Hash table lookup |
| O(log n) | Logarithmic | Binary search, BST search |
| O(n) | Linear | Loop 1x, Array search |
| O(n log n) | Linearithmic | Merge sort, Quick sort |
| O(n²) | Quadratic | Nested loop, Bubble sort |
| O(2ⁿ) | Exponential | Fibonacci recursion (naive) |

### Cara hitung:
```php
// O(1)
function getFirst($arr) { return $arr[0]; }

// O(n)
function sum($arr) {
    $total = 0;
    foreach ($arr as $val) $total += $val;
    return $total;
}

// O(n²)
function bubbleSort($arr) {
    for ($i = 0; $i < count($arr); $i++) {
        for ($j = 0; $j < count($arr) - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                // swap
            }
        }
    }
}
```

> **Q:** Jelaskan Big O!
> **A:** Notasi yang menggambarkan seberapa cepat algoritma memburuk seiring bertambahnya input. Fokus ke worst case.

---

## 4. Searching & Sorting

### Binary Search (O(log n)):
```php
function binarySearch($arr, $target) {
    $left = 0;
    $right = count($arr) - 1;

    while ($left <= $right) {
        $mid = floor(($left + $right) / 2);

        if ($arr[$mid] === $target) return $mid;
        if ($arr[$mid] < $target) $left = $mid + 1;
        else $right = $mid - 1;
    }
    return -1;
}
// Syarat: array harus SUDAH TERURUT
```

### Comparison:
| Algoritma | Best | Average | Worst | Memory |
|-----------|------|---------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |

---

## 5. Design Patterns

### Singleton
```php
class Database {
    private static $instance = null;

    private function __construct() {}

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
}
```

### Factory
```php
interface PaymentGateway {
    public function pay($amount);
}

class Midtrans implements PaymentGateway {
    public function pay($amount) { /* ... */ }
}

class Xendit implements PaymentGateway {
    public function pay($amount) { /* ... */ }
}

class PaymentFactory {
    public static function create($type) {
        return match($type) {
            'midtrans' => new Midtrans(),
            'xendit' => new Xendit(),
        };
    }
}
```

### Repository Pattern (paling sering di Laravel)
```php
interface UserRepositoryInterface {
    public function findById($id);
    public function create(array $data);
}

class UserRepository implements UserRepositoryInterface {
    public function findById($id) {
        return User::findOrFail($id);
    }
    public function create(array $data) {
        return User::create($data);
    }
}
```

---

## 6. Functional Programming Concepts

| Konsep | Arti | Contoh JS |
|--------|------|-----------|
| Pure Function | Output hanya dari input, no side effects | `const add = (a,b) => a + b` |
| Immutability | Data ga bisa diubah, selalu buat baru | `const newArr = [...arr, 4]` |
| First-class Function | Fungsi bisa jadi parameter/return value | `arr.map(fn)` |
| Higher-order Function | Fungsi yang nerima/return fungsi | `useCallback`, `useMemo` |

> **Q:** Bedanya OOP vs Functional?
> **A:** OOP fokus ke object & state yang bisa berubah. Functional fokus ke pure function & immutability.

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Sebutkan 4 pilar OOP! | Encapsulation, Inheritance, Polymorphism, Abstraction. |
| 2 | Bedanya array vs linked list? | Array O(1) access, O(n) insert. Linked list sebaliknya. |
| 3 | Jelaskan Big O! | Notasi kompleksitas algoritma. Contoh: O(n) = linear, O(log n) = binary search. |
| 4 | Apa itu binary search? | Cari data di array terurut dengan bagi dua terus. O(log n). |
| 5 | Jelaskan SOLID principles! | Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. |
| 6 | Apa itu interface vs abstract class? | Interface method declaration doang, abstract class bisa punya implementasi. |
| 7 | Bedanya Stack vs Queue? | Stack LIFO, Queue FIFO. |
| 8 | Apa itu hash table? | Struktur data key-value dengan akses O(1) rata-rata. |
| 9 | Jelaskan design pattern Singleton! | Class yang cuma boleh punya satu instance. |
| 10 | Bedanya sort O(n²) vs O(n log n)? | O(n²) lambat di data besar (bubble). O(n log n) lebih efisien (merge, quick). |
| 11 | Apa itu recursion? | Fungsi yang panggil dirinya sendiri. Butuh base case biar ga infinite. |
| 12 | Jelaskan MVC pattern! | Model (data), View (UI), Controller (logika). Pisahin concern. |

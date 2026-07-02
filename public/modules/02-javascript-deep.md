# 02 — JavaScript Deep

## 1. Execution Context & Call Stack

Ada 3 fase saat JS running:
1. **Creation Phase** — alokasi memori untuk variable & function (hoisting).
2. **Execution Phase** — eksekusi baris per baris.

### Call Stack:
```
console.log("mulai");        // push ke call stack
function A() {               // push
  function B() {             // push
    console.log("B");        // push → execute → pop
  }                          // pop B
  B();
}                            // pop A
console.log("selesai");      // push → execute → pop
```

> **Interview:** "Call stack adalah struktur LIFO yang nyimpen urutan eksekusi fungsi. Stack overflow terjadi kalau rekursi ga punya base case."

---

## 2. Hoisting

**Hoisting** = variable & function diangkat ke atas scope-nya saat creation phase.

```js
console.log(nama); // undefined (bukan error!)
var nama = "Budi";

// function declaration di-hoist seluruhnya
sayHi(); // "Hi!"
function sayHi() {
  console.log("Hi!");
}

// function expression TIDAK di-hoist
hello(); // Error: hello is not a function
var hello = function() { console.log("hello"); };

// let/const di-hoist tapi ga di-inisialisasi (Temporal Dead Zone)
console.log(umur); // ReferenceError
let umur = 20;
```

> **Q:** Bedanya `var`, `let`, `const`?
> **A:** `var` function-scoped, bisa redeclare, di-hoist jadi undefined. `let/const` block-scoped, ga bisa redeclare, TDZ. `const` wajib diinisialisasi & ga bisa reassign.

---

## 3. Closure

Closure = fungsi yang "mengingat" scope saat dia dibuat, meski udah dieksekusi di luar scope itu.

```js
function counter() {
  let count = 0;          // variabel "tertutup"
  return function() {     // inner function = closure
    count++;
    return count;
  };
}

const hitung = counter();
console.log(hitung()); // 1
console.log(hitung()); // 2
console.log(hitung()); // 3
```

### Use case closure:
- **Private variable** (seperti di atas)
- **Factory function**
- **Event listener** yang butuh akses data scope tertentu

> **Jawab interview:** "Closure adalah kombinasi fungsi dengan lexical scope-nya. Berguna untuk data privacy dan function factory."

---

## 4. Event Loop & Asynchronous JS

```
Call Stack → Web APIs → Callback Queue → Event Loop → Call Stack
```

```js
console.log(1);                // sync → langsung log

setTimeout(() => {
  console.log(2);              // async → ke Web API → callback queue
}, 0);

Promise.resolve().then(() => {
  console.log(3);              // microtask → prioritas lebih tinggi
});

console.log(4);                // sync → langsung log

// Output: 1, 4, 3, 2
```

### Urutan Prioritas:
1. **Call Stack** — kode sync dijalankan dulu.
2. **Microtask Queue** — Promise, MutationObserver, queueMicrotask.
3. **Macrotask Queue** — setTimeout, setInterval, I/O.

> **Q:** Kenapa Promise lebih dulu dari setTimeout meski timeout 0ms?
> **A:** Karena Promise masuk microtask queue yang prioritasnya di atas macrotask (setTimeout).

---

## 5. Promise & Async/Await

### Promise:
```js
const fetchUser = new Promise((resolve, reject) => {
  const user = getUserFromDB();
  if (user) resolve(user);
  else reject("User not found");
});

fetchUser
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log("selesai"));
```

### Async/Await (syntactic sugar over Promise):
```js
async function getData() {
  try {
    const user = await fetchUser();      // tunggu Promise selesai
    const posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error("Gagal:", error);
  }
}
```

> **Q:** Apa itu async/await?
> **A:** Syntactic sugar di atas Promise yang bikin kode async terlihat sync. Fungsi pake `async` selalu return Promise. `await` pause eksekusi sampai Promise selesai.

---

## 6. `this` di JavaScript

`this` tergantung **bagaimana fungsi dipanggil**, bukan di mana didefinisikan.

```js
// 1. Global context → window/global
console.log(this); // window

// 2. Regular function → global (strict: undefined)
function regular() {
  console.log(this); // window (undefined di strict mode)
}

// 3. Method object → object itu sendiri
const user = {
  name: "Budi",
  greet() { console.log(this.name); }
};
user.greet(); // "Budi"

// 4. Arrow function → lexical this (mengikat dari luar)
const user2 = {
  name: "Budi",
  greet: () => console.log(this.name) // ❌ this = window
};

// 5. Constructor → instance baru
function User(name) {
  this.name = name;
}
new User("Budi");

// 6. Manual dengan call/apply/bind
user.greet.call(user2); // "Budi"
```

---

## 7. Spread Operator, Destructuring, Rest

### Destructuring:
```js
// Array
const [a, b, ...rest] = [1, 2, 3, 4]; // a=1, b=2, rest=[3,4]

// Object
const { name, age, ...sisa } = { name: "Budi", age: 20, city: "Jkt" };
```

### Spread:
```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1,2,3,4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // {a:1, b:2}
```

### Rest Parameter:
```js
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

---

## 8. `==` vs `===`

| Operator | Disebut | Contoh | Hasil |
|----------|---------|--------|-------|
| `==` | Abstract equality | `'5' == 5` | `true` (dikonversi dulu) |
| `===` | Strict equality | `'5' === 5` | `false` (beda tipe) |

```js
false == 0    // true
false === 0   // false
null == undefined  // true
null === undefined // false
[] == false   // true ([] → "" → 0, false → 0)
```

> **Tips:** Selalu pake `===`. Interview suka nanya `==` karena coercion-nya tricky.

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Jelaskan Event Loop! | Call Stack → Web API → Callback Queue → Event Loop (cek stack kosong) → push callback. |
| 2 | Apa itu closure? | Fungsi yang mengingat scope luar meski dipanggil di luar scope-nya. |
| 3 | Bedanya `var`, `let`, `const`? | `var` function-scoped, `let/const` block-scoped, `const` immutable binding. |
| 4 | Apa itu hoisting? | Variable & function diangkat ke atas scope saat creation phase. |
| 5 | Apa itu Promise? | Object yang merepresentasikan nilai masa depan (pending, fulfilled, rejected). |
| 6 | Bedanya `==` dan `===`? | `==` pake type coercion, `===` strict (tipe & nilai harus sama). |
| 7 | Jelaskan cara kerja `this`! | Tergantung pemanggilan: method → object, regular → global, arrow → lexical. |
| 8 | Apa itu Temporal Dead Zone? | Area antara scope masuk sampai deklarasi `let/const`, akses di sini throw ReferenceError. |
| 9 | Bagaimana cara kerja async/await? | `async` return Promise, `await` pause hingga Promise selesai. |
| 10 | Sebutkan metode array & kegunaannya! | map (transform), filter (seleksi), reduce (akumulasi), forEach (loop), find (cari satu). |

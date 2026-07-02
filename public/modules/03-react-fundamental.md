# 03 — React Fundamental

## 1. What is React?

React adalah **library JavaScript untuk membangun UI** berbasis komponen.

**Key Concepts:**
- **Declarative** — kamu bilang "apa" yang mau ditampilkan, bukan "bagaimana" caranya.
- **Component-based** — UI dipecah jadi komponen kecil, reusable, isolated.
- **Virtual DOM** — update performa tinggi tanpa manipulasi DOM langsung.

### React vs Vue vs Angular

| | React | Vue | Angular |
|---|---|---|---|
| Type | Library | Framework | Framework |
| Learning Curve | Rendah-sedang | Rendah | Tinggi |
| Data Binding | One-way | Two-way | Two-way |
| Size | Kecil | Kecil | Besar |
| Digunakan | Facebook, IG, Airbnb | Alibaba, GitLab | Google, Upwork |

> **Q:** Kenapa pilih React bukan framework lain?
> **A:** Ekosistem besar, fleksibel (bisa pake library sendiri), community kuat, dan banyak perusahaan pake.

---

## 2. Virtual DOM

**Masalah:** Manipulasi DOM real itu lambat.
**Solusi React:** Virtual DOM — representasi JavaScript dari DOM asli.

### Cara kerja:
1. **Render** → React buat Virtual DOM tree baru.
2. **Diffing** → React bandingkan (diff) Virtual DOM baru vs sebelumnya.
3. **Reconciliation** → React hitung perubahan paling minimal.
4. **Commit** → React terapkan perubahan ke DOM real (batch update).

### Kenapa cepat?
- Operasi di JS object (Virtual DOM) jauh lebih cepat dari DOM API.
- React batch multiple changes jadi satu update.
- Hanya update node yang berubah, bukan seluruh halaman.

> **Tips interview:** "Virtual DOM itu strategi reconciliation. Bukan bikin DOM lebih cepat, tapi ngurangin jumlah manipulasi DOM yang mahal."

---

## 3. Component & Props

### Functional Component (sekarang standar):
```jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

### Props:
- **Read-only** — component child ga boleh modify props.
- **One-way data flow** — data mengalir dari parent ke child.
- Bisa berupa: string, number, boolean, array, object, function.

---

## 4. State vs Props

| | State | Props |
|---|---|---|
| Mutability | Bisa berubah (mutable) | Tidak bisa (immutable) |
| Siapa yang pegang? | Component itu sendiri | Parent component |
| Tujuan | Data yang berubah (interaktif) | Konfigurasi/pass data ke child |
| Perubahan | `setState()` trigger re-render | Re-render dari parent |

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // state

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
      <DisplayCount count={count} />  {/* count sebagai props */}
    </div>
  );
}

function DisplayCount({ count }) {    // props diterima
  return <p>Nilai: {count}</p>;
}
```

---

## 5. Hooks

### useState
```jsx
const [state, setState] = useState(initialValue);
```
- Trigger re-render saat state berubah.
- Jangan modify langsung (`state = newValue`), pake setter.

### useEffect
```jsx
useEffect(() => {
  // effect code (fetch API, subscription, DOM manual)
  return () => {
    // cleanup (unsubscribe, remove listener)
  };
}, [dependencies]);
```

3 pola useEffect:

| Pola | Dependency | Kapan jalan |
|------|-----------|-------------|
| Mount | `[]` | 1x saat komponen mount |
| Update | `[state]` | Saat dependency berubah |
| Every render | (none) | Setiap render |

### useContext
```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // "dark"
  return <div className={theme}>...</div>;
}
```

### useReducer (alternatif useState untuk state kompleks)
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>
      +1
    </button>
  );
}
```

### useCallback & useMemo
```jsx
// useCallback — memoize FUNCTION
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useMemo — memoize VALUE (hasil komputasi)
const total = useMemo(() => {
  return items.reduce((sum, i) => sum + i.price, 0);
}, [items]);
```

### useRef
```jsx
const inputRef = useRef(null);

// Akses DOM langsung
<input ref={inputRef} />
inputRef.current.focus();

// Atau nyimpen nilai yang gak trigger re-render
const countRef = useRef(0);
countRef.current += 1; // ga trigger re-render
```

---

## 6. Component Lifecycle (dengan Hooks)

| Class Component | Hooks |
|----------------|-------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [dep])` |
| `componentWillUnmount` | `useEffect(() => { return () => {} }, [])` |
| `shouldComponentUpdate` | `React.memo` |

---

## 7. Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// Atau ternary:
{isLoggedIn ? <LogoutButton /> : <LoginButton />}

// Atau short-circuit:
{isLoggedIn && <Dashboard />}
```

---

## 8. List & Key

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Kenapa pake key?** React pake `key` buat nge-track perubahan setiap item. Tanpa key, React bakal re-render semua (inefisien). **Jangan pake index sebagai key** kalo list bisa berubah (tambah/hapus/sort).

---

## 9. State Lifting & Lifting State Up

**Masalah:** Dua komponen perlu share state yang sama.
**Solusi:** Pindahkan state ke parent terdekat.

```
App → ParentComponent (state: data)
        ├── ChildA (props: data)
        └── ChildB (props: setData)
```

---

## 10. React Router

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 11. State Management (Redux / Context)

### Kapan perlu Redux?
- Banyak state yang dipake di banyak komponen (global state).
- State update logic kompleks.
- Butuh middleware (logging, side effects).

### Redux Flow:
```
Action → Reducer → Store → Component (via useSelector)
                        ↑
                     dispatch(action)
```

### Redux Toolkit (cara modern):
```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  }
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## Pertanyaan Interview

| No | Pertanyaan | Jawaban Singkat |
|----|-----------|-----------------|
| 1 | Apa itu React? | Library JS untuk bangun UI berbasis komponen, pake Virtual DOM. |
| 2 | Jelaskan Virtual DOM! | Representasi JS dari DOM real. React diff & batch update buat optimalisasi. |
| 3 | Bedanya state vs props? | State mutable & dipegang komponen sendiri. Props immutable dari parent. |
| 4 | Apa itu JSX? | Syntax extension JS yang mirip HTML, di-compile jadi `React.createElement()`. |
| 5 | Jelaskan useEffect! | Hook untuk side effects. Jalan setelah render, bisa cleanup. |
| 6 | Kenapa pake `key` di list? | Bantu React identifikasi item mana yang berubah, tambah, atau hapus. |
| 7 | Bedanya class vs functional component? | Functional pake hooks, lebih ringkas, ga perlu `this`. |
| 8 | Apa itu controlled component? | Input form yang nilainya dikontrol oleh React state. |
| 9 | Jelaskan lifting state up! | Memindahkan state ke parent biar bisa di-share ke sibling. |
| 10 | Kapan pake useMemo vs useCallback? | useMemo memoize value, useCallback memoize function reference. |
| 11 | Apa itu React.memo? | Higher-order component untuk memoize component, skip re-render kalo props sama. |
| 12 | Jelaskan Redux flow! | Component dispatch action → reducer update store → component subscribe ulang. |

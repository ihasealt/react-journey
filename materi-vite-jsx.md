# Materi 3: Inisialisasi Proyek Vite, Struktur Folder, & Aturan JSX

---

## 1. Apa itu Vite?

Vite (dibaca "vit", artinya "cepat" dalam bahasa Prancis) adalah build tool modern untuk membuat project frontend (React, Vue, dll). Dibanding tool lama seperti Create React App (CRA), Vite jauh lebih cepat karena:

- **Dev server instan** — tidak perlu bundle seluruh aplikasi dulu saat development
- **Hot Module Replacement (HMR) super cepat** — perubahan kode langsung terlihat di browser tanpa reload penuh
- **Build production dioptimasi** pakai Rollup di balik layar

### Inisialisasi Proyek Vite + React

Buka terminal VSCode, lalu jalankan:

```bash
npm create vite@latest nama-proyek -- --template react
```

Atau jika ingin interaktif (Vite akan tanya nama proyek & framework):

```bash
npm create vite@latest
```

Lalu ikuti prompt-nya:

```
✔ Project name: … nama-proyek
✔ Select a framework: › React
✔ Select a variant: › JavaScript
```

Setelah selesai, masuk ke folder proyek dan install dependency:

```bash
cd nama-proyek
npm install
```

Jalankan development server:

```bash
npm run dev
```

Terminal akan menampilkan alamat lokal, biasanya:

```
  VITE v5.x.x  ready in 320 ms

  ➜  Local:   http://localhost:5173/
```

Buka alamat tersebut di browser untuk melihat aplikasi berjalan.

### Perintah Penting Lainnya

```bash
npm run build     # build untuk production (hasil di folder dist/)
npm run preview   # preview hasil build production secara lokal
```

---

## 2. Pemahaman Struktur Folder

Setelah `npm create vite@latest`, struktur folder React + Vite biasanya seperti ini:

```
nama-proyek/
├── node_modules/          # semua library yang diinstall (jangan diedit manual)
├── public/                # file statis (favicon, gambar) yang diakses langsung tanpa diproses
│   └── vite.svg
├── src/                   # folder utama tempat kita bekerja
│   ├── assets/             # gambar, font, file statis yang di-import ke komponen
│   ├── App.jsx             # komponen utama aplikasi
│   ├── App.css             # styling untuk App.jsx
│   ├── main.jsx             # entry point, tempat React "dipasang" ke HTML
│   └── index.css            # styling global
├── index.html              # HTML utama (satu-satunya file HTML di SPA)
├── package.json             # daftar dependency & script npm
├── package-lock.json        # kunci versi pasti dari setiap dependency
├── vite.config.js           # konfigurasi Vite
└── .gitignore                # file/folder yang diabaikan git (misal node_modules)
```

### Penjelasan File-File Kunci

| File/Folder | Fungsi |
|---|---|
| `index.html` | HTML dasar. Ada `<div id="root"></div>` tempat React di-mount |
| `src/main.jsx` | Titik masuk aplikasi React, me-render `<App />` ke `#root` |
| `src/App.jsx` | Komponen root/utama, biasanya berisi struktur utama UI |
| `src/assets/` | Simpan gambar/font yang di-*import* ke dalam kode |
| `public/` | File statis yang **tidak** diproses build tool (diakses via path langsung, misal `/vite.svg`) |
| `vite.config.js` | Atur plugin, alias folder, port dev server, dll |
| `package.json` | Daftar dependency dan script (`dev`, `build`, `preview`) |

### Contoh Isi `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Struktur Folder yang Direkomendasikan untuk Proyek Lebih Besar

Semakin besar proyek, biasanya `src/` diorganisir lebih rapi:

```
src/
├── assets/           # gambar, font
├── components/       # komponen reusable (Button, Card, Navbar)
│   ├── Button.jsx
│   └── Navbar.jsx
├── pages/            # komponen level halaman (Home, About, Contact)
│   ├── Home.jsx
│   └── About.jsx
├── hooks/            # custom hooks (useFetch, useAuth)
├── utils/            # fungsi helper (formatDate, validasi, dll)
├── services/         # logic pemanggilan API
├── App.jsx
└── main.jsx
```

---

## 3. Aturan JSX

JSX (JavaScript XML) adalah sintaks yang memungkinkan kita menulis "HTML" di dalam JavaScript. Browser sebenarnya tidak mengerti JSX — kode ini dikompilasi (oleh Vite/Babel) menjadi `React.createElement(...)`.

### Aturan #1: Harus Ada Satu Root Element

Sebuah komponen hanya boleh me-return **satu** elemen induk.

```jsx
// SALAH — dua elemen sejajar tanpa pembungkus
function App() {
  return (
    <h1>Judul</h1>
    <p>Paragraf</p>
  );
}

// BENAR — dibungkus satu div
function App() {
  return (
    <div>
      <h1>Judul</h1>
      <p>Paragraf</p>
    </div>
  );
}

// BENAR — pakai Fragment (tanpa tambah elemen DOM baru)
function App() {
  return (
    <>
      <h1>Judul</h1>
      <p>Paragraf</p>
    </>
  );
}
```

### Aturan #2: Tag Harus Ditutup

Semua tag wajib ditutup, termasuk tag yang di HTML biasa boleh terbuka seperti `<img>` atau `<input>`.

```jsx
// SALAH
<img src="foto.jpg">
<input type="text">

// BENAR — self-closing
<img src="foto.jpg" />
<input type="text" />
```

### Aturan #3: Atribut Pakai camelCase

Karena JSX adalah JavaScript, atribut HTML yang biasanya kebab-case atau lowercase, di JSX ditulis camelCase. Beberapa nama juga beda karena bentrok dengan keyword JavaScript.

```jsx
// HTML biasa -> JSX
class      -> className
for        -> htmlFor
onclick    -> onClick
tabindex   -> tabIndex
```

```jsx
<div className="container">
  <label htmlFor="email">Email</label>
  <input id="email" onClick={handleClick} tabIndex={0} />
</div>
```

### Aturan #4: Embed Ekspresi JavaScript dengan `{}`

Kurung kurawal `{}` dipakai untuk menyisipkan ekspresi JavaScript (bukan statement) ke dalam JSX.

```jsx
const nama = "Andi";
const angka = 5;

function App() {
  return (
    <div>
      <p>Halo, {nama}!</p>
      <p>Hasil: {angka * 2}</p>
      <p>{angka > 3 ? "Besar" : "Kecil"}</p>
      {/* ini komentar di JSX */}
    </div>
  );
}
```

> Catatan: `{}` hanya menerima **ekspresi** (menghasilkan nilai), bukan statement seperti `if`, `for`, atau `switch` langsung. Untuk logika kondisional, gunakan ternary (`? :`) atau `&&`.

### Aturan #5: Conditional Rendering

```jsx
function Status({ isLogin }) {
  // Pakai ternary
  return <p>{isLogin ? "Sudah login" : "Belum login"}</p>;
}

function Notifikasi({ jumlah }) {
  // Pakai && — tampil hanya jika kondisi true
  return (
    <div>
      {jumlah > 0 && <span>Ada {jumlah} notifikasi baru</span>}
    </div>
  );
}
```

### Aturan #6: Render List dengan `.map()` — Wajib `key`

```jsx
const buah = ["Apel", "Jeruk", "Mangga"];

function DaftarBuah() {
  return (
    <ul>
      {buah.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

> `key` wajib ada dan sebaiknya unik (idealnya id dari data, bukan index array) agar React bisa melacak perubahan list secara efisien.

### Aturan #7: Inline Style Pakai Object, Bukan String

```jsx
// SALAH (cara HTML biasa)
<div style="color: red; font-size: 20px;">Teks</div>

// BENAR — object dengan camelCase property
<div style={{ color: "red", fontSize: "20px" }}>Teks</div>
```

### Ringkasan Aturan JSX

| Aturan | Contoh |
|---|---|
| Satu root element | Bungkus dengan `<div>` atau `<>...</>` |
| Semua tag ditutup | `<img />`, `<input />` |
| Atribut camelCase | `className`, `onClick`, `htmlFor` |
| Ekspresi pakai `{}` | `{nama}`, `{angka * 2}` |
| Kondisional | Ternary `? :` atau `&&` |
| List butuh `key` | `{arr.map(item => <li key={item.id}>...)}` |
| Style pakai object | `style={{ color: "red" }}` |

---

## Mini Project: Kartu Profil dengan Vite + React

Project ini melatih inisialisasi proyek Vite, memahami struktur folder, dan menerapkan aturan JSX (conditional rendering, list rendering, camelCase attribute, inline style).

### Langkah 1 — Buat Proyek

```bash
npm create vite@latest kartu-profil -- --template react
cd kartu-profil
npm install
```

### Langkah 2 — Buat Struktur Folder

Buat folder `src/components/` lalu buat file `ProfileCard.jsx` di dalamnya:

```
src/
├── components/
│   └── ProfileCard.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### Langkah 3 — Isi `src/components/ProfileCard.jsx`

```jsx
function ProfileCard({ nama, jabatan, online, skill }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>{nama}</h2>
      <p>{jabatan}</p>

      {/* Conditional rendering pakai ternary */}
      <p>
        Status:{" "}
        <span style={{ color: online ? "green" : "gray" }}>
          {online ? "Online" : "Offline"}
        </span>
      </p>

      {/* Conditional rendering pakai && */}
      {skill.length > 0 && (
        <div>
          <strong>Skill:</strong>
          {/* List rendering wajib pakai key */}
          <ul>
            {skill.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
```

### Langkah 4 — Isi `src/App.jsx`

```jsx
import ProfileCard from "./components/ProfileCard";

const daftarProfil = [
  {
    id: 1,
    nama: "Andi Saputra",
    jabatan: "Frontend Developer",
    online: true,
    skill: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    nama: "Sari Dewi",
    jabatan: "UI/UX Designer",
    online: false,
    skill: ["Figma", "Adobe XD"],
  },
];

function App() {
  return (
    <div style={{ display: "flex", gap: "16px", padding: "24px" }}>
      {daftarProfil.map((profil) => (
        <ProfileCard
          key={profil.id}
          nama={profil.nama}
          jabatan={profil.jabatan}
          online={profil.online}
          skill={profil.skill}
        />
      ))}
    </div>
  );
}

export default App;
```

### Langkah 5 — Jalankan

```bash
npm run dev
```

Buka `http://localhost:5173/` di browser. Kamu akan melihat 2 kartu profil, satu berstatus "Online" (hijau) dan satu "Offline" (abu-abu), masing-masing dengan daftar skill.

### Tantangan Lanjutan (Latihan Mandiri)

1. Tambahkan komponen baru `Navbar.jsx` di `components/` dan tampilkan di atas daftar profil.
2. Buat props baru `foto` (URL gambar) di `ProfileCard`, lalu tampilkan pakai tag `<img />` (ingat: harus self-closing!).
3. Pindahkan array `daftarProfil` ke file terpisah `src/data/profil.js`, lalu import ke `App.jsx` — ini latihan memahami struktur folder `data/`.

---

## Ringkasan

| Topik | Poin Penting |
|---|---|
| Vite | Build tool cepat, inisialisasi dengan `npm create vite@latest` |
| Struktur Folder | `src/` tempat kerja utama, `public/` untuk file statis mentah |
| Root Element | Komponen wajib return satu elemen induk (atau Fragment `<>`) |
| Tag Ditutup | `<img />`, `<input />` — semua self-closing atau berpasangan |
| Atribut | camelCase: `className`, `onClick`, `htmlFor` |
| Ekspresi `{}` | Hanya untuk ekspresi, bukan statement (`if`/`for`) |
| List Rendering | Wajib `key` unik di setiap elemen hasil `.map()` |

// Update 21 Nov 2026
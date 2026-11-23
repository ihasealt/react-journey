# React Journey

Repositori catatan belajar dan latihan JavaScript ES6+ serta React untuk persiapan pengembangan aplikasi frontend.

## Isi Pembelajaran

### JavaScript ES6+

- Arrow function
- Object dan array destructuring
- Spread dan rest operator
- Immutable update pada array dan object
- Array method `map`, `filter`, dan `reduce`
- Async/await, Promise, Fetch API, dan `try/catch`

### React

- Inisialisasi proyek React dengan Vite
- Struktur folder proyek React
- Aturan penulisan JSX
- Conditional rendering
- Rendering daftar dengan `map`
- Props dan komponen
- Inline style dan state UI dasar

## Struktur Repositori

```text
.
├── materi-es6-plus.md              # Materi ES6+ dan mini project keranjang
├── materi-array-async.md           # Materi array method dan async/await
├── materi-vite-jsx.md              # Materi Vite dan aturan JSX
├── J1_es6-plus.js                  # Latihan destructuring, spread, dan map
├── 1_keranjang.js                  # Mini project sistem keranjang belanja
└── docs/
    ├── 1_es6-syntax-summary.md     # Rangkuman ES6+
    └── 2_array-async-summary.md    # Rangkuman array method dan async/await
```

## Cara Menjalankan Latihan JavaScript

Pastikan Node.js sudah terpasang, lalu jalankan file latihan dari terminal:

```bash
node J1_es6-plus.js
node 1_keranjang.js
```

Untuk memeriksa versi Node.js:

```bash
node -v
```

## Mini Project

### Keranjang Belanja

File `1_keranjang.js` menampilkan implementasi operasi keranjang belanja menggunakan:

- pencarian produk
- penambahan dan penghapusan item
- spread operator untuk immutable update
- rest operator untuk menerima beberapa produk
- destructuring
- `reduce` untuk menghitung total belanja

### Kartu Profil React

Materi di `materi-vite-jsx.md` berisi contoh mini project React untuk membuat kartu profil dengan conditional rendering, list rendering, props, dan inline style.

## Membuat Proyek React Baru

```bash
npm create vite@latest nama-proyek -- --template react
cd nama-proyek
npm install
npm run dev
```

Layanan pengembangan Vite biasanya dapat dibuka di `http://localhost:5173/`.

## Referensi Belajar

Mulai dari:

1. `materi-es6-plus.md`
2. `materi-array-async.md`
3. `materi-vite-jsx.md`
4. Jalankan latihan pada `J1_es6-plus.js`
5. Praktikkan `1_keranjang.js`

Dokumentasi ringkas tersedia pada folder `docs/`.

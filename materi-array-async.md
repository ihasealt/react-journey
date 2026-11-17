# Materi 2: Array Methods (Map, Filter, Reduce) & Async/Await

---

## 1. Array Methods: Map, Filter, Reduce

Tiga method ini adalah cara "modern" untuk mengolah array tanpa loop manual (`for`). Semuanya **tidak mengubah array asli** (immutable), kecuali `reduce` yang bisa hasilkan tipe data apapun.

### `.map()` — Transformasi Data

Mengubah setiap elemen array menjadi bentuk baru, hasilnya array baru dengan panjang sama.

```javascript
const angka = [1, 2, 3, 4, 5];

const dobel = angka.map(n => n * 2);
console.log(dobel); // [2, 4, 6, 8, 10]

const users = [
  { nama: "Andi", umur: 25 },
  { nama: "Budi", umur: 30 },
];

const namaSaja = users.map(({ nama }) => nama);
console.log(namaSaja); // ["Andi", "Budi"]

// Tambah properti baru tanpa mengubah data asli
const userDenganStatus = users.map(user => ({
  ...user,
  dewasa: user.umur >= 18,
}));
```

### `.filter()` — Menyaring Data

Mengambil elemen yang memenuhi kondisi tertentu, hasilnya array baru (bisa lebih pendek).

```javascript
const angka = [1, 2, 3, 4, 5, 6, 7, 8];

const genap = angka.filter(n => n % 2 === 0);
console.log(genap); // [2, 4, 6, 8]

const produk = [
  { nama: "Laptop", harga: 8500000, stok: 5 },
  { nama: "Mouse", harga: 150000, stok: 0 },
  { nama: "Keyboard", harga: 350000, stok: 15 },
];

const tersedia = produk.filter(({ stok }) => stok > 0);
const murah = produk.filter(({ harga }) => harga < 1000000);
```

### `.reduce()` — Meringkas Data

Menggabungkan seluruh elemen array menjadi satu nilai (angka, object, array baru, dll).

```javascript
const angka = [1, 2, 3, 4, 5];

// Jumlahkan semua
const total = angka.reduce((akumulator, n) => akumulator + n, 0);
console.log(total); // 15

// Cari nilai maksimum
const maks = angka.reduce((max, n) => (n > max ? n : max), angka[0]);

// Hitung total harga belanja
const keranjang = [
  { nama: "Laptop", harga: 8500000, jumlah: 1 },
  { nama: "Mouse", harga: 150000, jumlah: 2 },
];
const totalHarga = keranjang.reduce(
  (total, { harga, jumlah }) => total + harga * jumlah,
  0
);

// Kelompokkan data (grouping) — reduce jadi object
const orang = [
  { nama: "Andi", kota: "Jakarta" },
  { nama: "Budi", kota: "Bandung" },
  { nama: "Citra", kota: "Jakarta" },
];
const kelompokKota = orang.reduce((hasil, { nama, kota }) => {
  hasil[kota] = hasil[kota] || [];
  hasil[kota].push(nama);
  return hasil;
}, {});
console.log(kelompokKota);
// { Jakarta: ["Andi", "Citra"], Bandung: ["Budi"] }
```

### Chaining (Menggabungkan Method)

Karena masing-masing mengembalikan array baru, ketiganya bisa dirangkai berurutan.

```javascript
const transaksi = [
  { produk: "Laptop", harga: 8500000, kategori: "elektronik" },
  { produk: "Buku", harga: 75000, kategori: "edukasi" },
  { produk: "Mouse", harga: 150000, kategori: "elektronik" },
];

const totalElektronik = transaksi
  .filter(t => t.kategori === "elektronik")   // saring dulu
  .map(t => t.harga)                          // ambil harga saja
  .reduce((total, harga) => total + harga, 0); // jumlahkan

console.log(totalElektronik); // 8650000
```

### Perbandingan Cepat

| Method | Input | Output | Kegunaan |
|---|---|---|---|
| `map` | Array | Array (panjang sama) | Ubah/transformasi tiap elemen |
| `filter` | Array | Array (panjang ≤) | Saring elemen sesuai kondisi |
| `reduce` | Array | Apa saja (angka, object, dll) | Ringkas jadi satu nilai |

---

## 2. Async/Await

`async/await` adalah cara menulis kode asynchronous (operasi yang butuh waktu, misal ambil data dari server) agar terlihat seperti kode synchronous — lebih mudah dibaca dibanding `.then()` berantai.

### Dasar Promise (Sebelum Async/Await)

```javascript
// Promise adalah objek yang mewakili nilai di masa depan
function ambilData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data berhasil diambil");
    }, 1000);
  });
}

// Cara lama: .then()
ambilData().then(data => console.log(data));
```

### Async/Await — Sintaks

```javascript
// 'async' menandai function ini asynchronous
async function ambil() {
  // 'await' menunggu Promise selesai sebelum lanjut ke baris berikutnya
  const data = await ambilData();
  console.log(data); // "Data berhasil diambil"
}

ambil();
```

### Error Handling dengan try/catch

```javascript
async function ambilDenganAman() {
  try {
    const data = await ambilData();
    console.log(data);
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
}
```

### Contoh Nyata: Fetch API

```javascript
async function ambilUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Gagal ambil data:", error.message);
  }
}
```

### Menjalankan Beberapa Async Bersamaan (`Promise.all`)

```javascript
async function ambilBanyakData() {
  try {
    // Berjalan paralel, bukan satu-satu (lebih cepat)
    const [users, posts] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    ]);
    console.log(users.length, posts.length);
  } catch (error) {
    console.error(error.message);
  }
}
```

### Kombinasi Async/Await + Array Methods

Ini pola yang paling sering dipakai di dunia nyata: ambil data dari server, lalu olah dengan `map`/`filter`/`reduce`.

```javascript
async function ambilDanOlahData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // Olah data setelah didapat
    const namaKota = users
      .filter(u => u.address.city.length > 5)
      .map(u => ({ nama: u.name, kota: u.address.city }));

    console.log(namaKota);
  } catch (error) {
    console.error(error.message);
  }
}
```

---

## Mini Project: Dashboard Data Pengguna dari API

Project ini mengambil data dari API publik (JSONPlaceholder), lalu mengolahnya dengan `map`, `filter`, dan `reduce` menggunakan `async/await`.

```javascript
// ============================================
// MINI PROJECT: Dashboard Data Pengguna
// Implementasi: Array Methods (map/filter/reduce) + Async/Await
// API: https://jsonplaceholder.typicode.com (data dummy publik)
// ============================================

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Ambil data user dari API
async function ambilDataUser() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Gagal mengambil data, status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error saat ambil data:", error.message);
    return [];
  }
}

// FILTER: saring user yang tinggal di kota dengan nama > 6 huruf
const filterKotaPanjang = (users) =>
  users.filter(({ address }) => address.city.length > 6);

// MAP: ambil hanya data yang dibutuhkan (transformasi bentuk data)
const formatDataUser = (users) =>
  users.map(({ id, name, email, address, company }) => ({
    id,
    nama: name,
    email,
    kota: address.city,
    perusahaan: company.name,
  }));

// REDUCE: kelompokkan user berdasarkan huruf awal nama perusahaan
const kelompokkanByPerusahaan = (users) =>
  users.reduce((hasil, user) => {
    const key = user.perusahaan;
    hasil[key] = hasil[key] || [];
    hasil[key].push(user.nama);
    return hasil;
  }, {});

// REDUCE: hitung statistik ringkas
const hitungStatistik = (users) =>
  users.reduce(
    (stat, user) => {
      stat.totalUser += 1;
      stat.totalPanjangNama += user.nama.length;
      return stat;
    },
    { totalUser: 0, totalPanjangNama: 0 }
  );

// Fungsi utama — menjalankan semuanya secara berurutan dengan async/await
async function jalankanDashboard() {
  console.log("Mengambil data user dari API...\n");

  const rawUsers = await ambilDataUser();

  if (rawUsers.length === 0) {
    console.log("Tidak ada data untuk diproses.");
    return;
  }

  // Chaining proses data
  const usersFormatted = formatDataUser(rawUsers);
  const usersFiltered = filterKotaPanjang(usersFormatted);
  const kelompok = kelompokkanByPerusahaan(usersFormatted);
  const statistik = hitungStatistik(usersFormatted);

  console.log("===== SEMUA USER (FORMATTED) =====");
  console.log(usersFormatted);

  console.log("\n===== USER DENGAN NAMA KOTA > 6 HURUF =====");
  console.log(usersFiltered);

  console.log("\n===== DIKELOMPOKKAN PER PERUSAHAAN =====");
  console.log(kelompok);

  console.log("\n===== STATISTIK =====");
  console.log(`Total user: ${statistik.totalUser}`);
  console.log(
    `Rata-rata panjang nama: ${(
      statistik.totalPanjangNama / statistik.totalUser
    ).toFixed(1)} huruf`
  );
}

jalankanDashboard();
```

### Cara Menjalankan

1. Simpan sebagai `dashboard.js`
2. Pastikan Node.js versi **18 ke atas** (karena `fetch` bawaan Node baru ada di v18+). Cek dengan `node -v`.
3. Jalankan di terminal VSCode: `node dashboard.js`
4. Butuh koneksi internet karena mengambil data dari API publik.

> Kalau Node kamu di bawah v18 dan `fetch` error `fetch is not defined`, ganti bagian pengambilan data dengan library `node-fetch` (`npm install node-fetch`) lalu `import fetch from "node-fetch"` di baris paling atas file.

### Tantangan Lanjutan (Latihan Mandiri)

1. Tambahkan fungsi `urutkanBerdasarkanNama(users)` yang mengurutkan array secara alfabetis (gunakan `.sort()`).
2. Buat fungsi `ambilDataPost(userId)` yang mengambil post milik user tertentu dari endpoint `/posts?userId=...`, lalu gabungkan dengan `Promise.all` untuk beberapa user sekaligus.
3. Tambahkan `try/catch` khusus untuk menangani kasus tidak ada koneksi internet, dan tampilkan pesan yang ramah pengguna.

---

## Ringkasan

| Konsep | Fungsi Utama | Contoh Kasus |
|---|---|---|
| `map` | Ubah tiap elemen jadi bentuk baru | Format ulang data API |
| `filter` | Saring elemen sesuai kondisi | Ambil user aktif saja |
| `reduce` | Ringkas array jadi satu nilai | Total harga, grouping data |
| `async/await` | Tulis kode asynchronous secara linear | Ambil data dari API |
| `try/catch` | Tangani error pada kode async | API gagal diakses |

// Update 17 Nov 2026
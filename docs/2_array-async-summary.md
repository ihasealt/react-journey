# Array Methods (Map, Filter, Reduce) & Async/Await — Rangkuman

> Dokumentasi ringkas: Map, Filter, Reduce, dan Async/Await

---

## 1. Array Methods

Semua method di bawah **tidak mengubah array asli** (kecuali hasil akhir `reduce` bisa berupa tipe apapun).

### `.map()` — Transformasi

```javascript
const dobel = [1, 2, 3].map(n => n * 2); // [2, 4, 6]

const namaSaja = users.map(({ nama }) => nama);

// Tambah properti tanpa ubah data asli
const userBaru = users.map(user => ({ ...user, dewasa: user.umur >= 18 }));
```

### `.filter()` — Menyaring

```javascript
const genap = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]

const tersedia = produk.filter(({ stok }) => stok > 0);
```

### `.reduce()` — Meringkas

```javascript
const total = [1, 2, 3, 4].reduce((akum, n) => akum + n, 0); // 10

// Grouping data
const kelompok = orang.reduce((hasil, { nama, kota }) => {
  hasil[kota] = hasil[kota] || [];
  hasil[kota].push(nama);
  return hasil;
}, {});
```

### Chaining

```javascript
const totalElektronik = transaksi
  .filter(t => t.kategori === "elektronik")
  .map(t => t.harga)
  .reduce((total, harga) => total + harga, 0);
```

### Tabel Perbandingan

| Method | Output | Kegunaan |
|---|---|---|
| `map` | Array (panjang sama) | Ubah tiap elemen |
| `filter` | Array (panjang ≤) | Saring sesuai kondisi |
| `reduce` | Apa saja | Ringkas jadi satu nilai |

---

## 2. Async/Await

Cara menulis kode asynchronous agar terbaca seperti kode synchronous.

```javascript
// Sintaks dasar
async function ambil() {
  const data = await ambilData(); // tunggu Promise selesai
  console.log(data);
}

// Error handling
async function ambilDenganAman() {
  try {
    const data = await ambilData();
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Fetch API
async function ambilUser() {
  try {
    const response = await fetch("https://api.example.com/users");
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

// Beberapa request paralel (lebih cepat dari satu-satu)
async function ambilBanyak() {
  const [users, posts] = await Promise.all([
    fetch(url1).then(r => r.json()),
    fetch(url2).then(r => r.json()),
  ]);
}
```

### Kombinasi Async/Await + Array Methods (pola umum di dunia nyata)

```javascript
async function ambilDanOlah() {
  const response = await fetch(API_URL);
  const users = await response.json();

  const hasil = users
    .filter(u => u.address.city.length > 5)
    .map(u => ({ nama: u.name, kota: u.address.city }));

  console.log(hasil);
}
```

---

## Tabel Ringkasan

| Konsep | Fungsi Utama | Contoh Kasus |
|---|---|---|
| `map` | Ubah tiap elemen jadi bentuk baru | Format ulang data API |
| `filter` | Saring elemen sesuai kondisi | Ambil user aktif saja |
| `reduce` | Ringkas array jadi satu nilai | Total harga, grouping data |
| `async/await` | Tulis kode asynchronous secara linear | Ambil data dari API |
| `try/catch` | Tangani error pada kode async | API gagal diakses |

---

## Catatan Penting

- `fetch` bawaan Node.js hanya tersedia di **Node v18+**. Cek versi dengan `node -v`.
- Selalu bungkus `await` dengan `try/catch` untuk menangani kegagalan (koneksi putus, API down, dll).
- `Promise.all` cocok dipakai kalau beberapa request **tidak saling bergantung** — jalan paralel, lebih cepat daripada `await` satu-satu.

*Lihat `materi-array-async.md` untuk penjelasan lengkap beserta mini project dashboard data pengguna.*


// Update 16 Nov 2026
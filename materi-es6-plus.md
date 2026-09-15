# Materi ES6+ Syntax: Arrow Functions, Destructuring, Spread/Rest Operator

---

## 1. Arrow Functions

Arrow function adalah cara singkat menulis function di JavaScript, diperkenalkan di ES6 (2015).

### Syntax Dasar

```javascript
// Function biasa
function tambah(a, b) {
  return a + b;
}

// Arrow function
const tambah = (a, b) => {
  return a + b;
};

// Arrow function dengan implicit return (satu baris)
const tambah = (a, b) => a + b;

// Satu parameter, kurung boleh dihilangkan
const kuadrat = n => n * n;

// Tanpa parameter
const sapa = () => console.log("Halo!");
```

### Perbedaan Penting: `this` Binding

Arrow function **tidak punya `this` sendiri** — ia mengambil `this` dari scope di sekitarnya (lexical scoping). Ini beda jauh dari function biasa.

```javascript
function Timer() {
  this.detik = 0;

  // function biasa -> 'this' jadi undefined/window, BUG!
  setInterval(function () {
    this.detik++; // salah, 'this' bukan Timer
  }, 1000);
}

function TimerFixed() {
  this.detik = 0;

  // arrow function -> 'this' tetap merujuk ke TimerFixed
  setInterval(() => {
    this.detik++; // benar
  }, 1000);
}
```

### Kapan Pakai, Kapan Tidak

| Gunakan Arrow Function | Gunakan Function Biasa |
|---|---|
| Callback (map, filter, reduce) | Method di dalam object literal |
| Ketika butuh `this` dari luar | Ketika butuh `this` dinamis |
| Function pendek/sederhana | Constructor function |

```javascript
// Cocok: callback array
const angka = [1, 2, 3, 4];
const dobel = angka.map(n => n * 2);
console.log(dobel); // [2, 4, 6, 8]
```

---

## 2. Destructuring

Destructuring memungkinkan kita "membongkar" nilai dari array atau object ke variabel terpisah dengan sintaks ringkas.

### Array Destructuring

```javascript
const warna = ["merah", "hijau", "biru"];

// Cara lama
const c1 = warna[0];
const c2 = warna[1];

// Destructuring
const [merah, hijau, biru] = warna;
console.log(merah); // "merah"

// Skip elemen
const [, kedua] = warna;
console.log(kedua); // "hijau"

// Default value
const [a, b, c, d = "kuning"] = warna;
console.log(d); // "kuning"

// Swap variabel tanpa temp
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### Object Destructuring

```javascript
const user = {
  nama: "Andi",
  umur: 25,
  kota: "Jakarta"
};

// Cara lama
const nama = user.nama;

// Destructuring
const { nama: userNama, umur } = user; // rename dengan ':'
console.log(userNama, umur); // "Andi" 25

// Default value
const { pekerjaan = "Belum bekerja" } = user;
console.log(pekerjaan); // "Belum bekerja"

// Nested destructuring
const profil = {
  nama: "Sari",
  alamat: { kota: "Bandung", kodePos: "40123" }
};
const { alamat: { kota } } = profil;
console.log(kota); // "Bandung"

// Destructuring parameter function (sangat umum di React!)
function tampilkanUser({ nama, umur }) {
  console.log(`${nama}, ${umur} tahun`);
}
tampilkanUser(user); // "Andi, 25 tahun"
```

---

## 3. Spread & Rest Operator

Keduanya pakai simbol yang sama (`...`) tapi fungsinya berlawanan:
- **Spread**: "membentangkan" elemen array/object menjadi individual
- **Rest**: "mengumpulkan" beberapa elemen menjadi satu array/object

### Spread Operator

```javascript
// Spread pada array
const buah = ["apel", "jeruk"];
const buahLengkap = [...buah, "mangga", "pisang"];
console.log(buahLengkap); // ["apel", "jeruk", "mangga", "pisang"]

// Copy array (shallow copy)
const asli = [1, 2, 3];
const salinan = [...asli];

// Gabung 2 array
const a = [1, 2];
const b = [3, 4];
const gabungan = [...a, ...b]; // [1, 2, 3, 4]

// Spread pada object
const dataUser = { nama: "Budi", umur: 30 };
const dataLengkap = { ...dataUser, kota: "Surabaya" };
console.log(dataLengkap); // { nama: "Budi", umur: 30, kota: "Surabaya" }

// Update object secara immutable (sangat umum di React state)
const updateUmur = { ...dataUser, umur: 31 };

// Spread sebagai argument function
function jumlahkan(a, b, c) {
  return a + b + c;
}
const angka = [1, 2, 3];
console.log(jumlahkan(...angka)); // 6
```

### Rest Operator

```javascript
// Rest pada parameter function (kumpulkan sisa argument)
function jumlahSemua(...angka) {
  return angka.reduce((total, n) => total + n, 0);
}
console.log(jumlahSemua(1, 2, 3, 4, 5)); // 15

// Rest dengan parameter biasa
function perkenalan(nama, ...hobi) {
  console.log(`${nama} suka: ${hobi.join(", ")}`);
}
perkenalan("Rina", "membaca", "melukis", "berenang");
// "Rina suka: membaca, melukis, berenang"

// Rest pada array destructuring
const [pertama, ...sisanya] = [10, 20, 30, 40];
console.log(pertama); // 10
console.log(sisanya); // [20, 30, 40]

// Rest pada object destructuring
const { nama, ...sisaData } = { nama: "Dewi", umur: 28, kota: "Malang" };
console.log(nama); // "Dewi"
console.log(sisaData); // { umur: 28, kota: "Malang" }
```

### Perbedaan Cepat

```javascript
// SPREAD -> di sisi kanan / saat menggunakan nilai (membentangkan)
const baru = [...lama];

// REST -> di sisi kiri / saat mendefinisikan (mengumpulkan)
const [x, ...sisa] = array;
```

---

## Mini Project: Sistem Manajemen Keranjang Belanja

Project ini menggabungkan ketiga konsep di atas dalam satu kasus nyata: keranjang belanja sederhana.

```javascript
// ============================================
// MINI PROJECT: Keranjang Belanja Sederhana
// Implementasi: Arrow Function, Destructuring, Spread/Rest
// ============================================

// Data awal produk (array of objects)
const daftarProduk = [
  { id: 1, nama: "Laptop", harga: 8500000, stok: 5 },
  { id: 2, nama: "Mouse", harga: 150000, stok: 20 },
  { id: 3, nama: "Keyboard", harga: 350000, stok: 15 },
  { id: 4, nama: "Monitor", harga: 2200000, stok: 8 },
];

let keranjang = [];

// ARROW FUNCTION: cari produk berdasarkan id
const cariProduk = (id) => daftarProduk.find(produk => produk.id === id);

// ARROW FUNCTION + DESTRUCTURING: tambah item ke keranjang
const tambahKeKeranjang = (id, jumlah = 1) => {
  const produk = cariProduk(id);

  if (!produk) {
    console.log("Produk tidak ditemukan!");
    return;
  }

  // Destructuring untuk ambil data yang dibutuhkan
  const { nama, harga, stok } = produk;

  if (stok < jumlah) {
    console.log(`Stok ${nama} tidak cukup!`);
    return;
  }

  // SPREAD: tambah item baru ke keranjang tanpa mengubah array asli
  keranjang = [...keranjang, { id, nama, harga, jumlah }];
  console.log(`${jumlah}x ${nama} ditambahkan ke keranjang.`);
};

// REST OPERATOR: fungsi untuk tambah banyak produk sekaligus
const tambahBanyakProduk = (...listId) => {
  listId.forEach(id => tambahKeKeranjang(id));
};

// ARROW FUNCTION + REDUCE: hitung total belanja
const hitungTotal = () =>
  keranjang.reduce((total, { harga, jumlah }) => total + harga * jumlah, 0);

// SPREAD: update jumlah item tanpa mutasi langsung (immutable update)
const updateJumlah = (id, jumlahBaru) => {
  keranjang = keranjang.map(item =>
    item.id === id ? { ...item, jumlah: jumlahBaru } : item
  );
};

// DESTRUCTURING + REST: hapus item dari keranjang, sisakan yang lain
const hapusDariKeranjang = (id) => {
  keranjang = keranjang.filter(item => item.id !== id);
  console.log(`Item dengan id ${id} dihapus dari keranjang.`);
};

// ARROW FUNCTION: format tampilan struk belanja
const cetakStruk = () => {
  console.log("\n===== STRUK BELANJA =====");
  keranjang.forEach(({ nama, harga, jumlah }) => {
    const subtotal = harga * jumlah;
    console.log(`${nama} x${jumlah} = Rp${subtotal.toLocaleString("id-ID")}`);
  });
  console.log("--------------------------");
  console.log(`TOTAL: Rp${hitungTotal().toLocaleString("id-ID")}`);
  console.log("==========================\n");
};

// ============================================
// SIMULASI PENGGUNAAN
// ============================================

tambahKeKeranjang(1, 1);        // Tambah 1 Laptop
tambahBanyakProduk(2, 3);       // Tambah Mouse & Keyboard sekaligus
updateJumlah(2, 3);             // Ubah jumlah Mouse jadi 3
cetakStruk();

hapusDariKeranjang(3);          // Hapus Keyboard
cetakStruk();
```

### Cara Menjalankan

1. Simpan kode di atas sebagai `keranjang.js`
2. Jalankan dengan Node.js: `node keranjang.js`
3. Atau paste ke console browser (F12 → Console)

### Tantangan Lanjutan (Latihan Mandiri)

Coba kembangkan sendiri untuk memperdalam pemahaman:

1. Tambahkan fungsi `beriDiskon(persen)` yang mengembalikan object baru berisi total setelah diskon (pakai spread untuk tidak mengubah data asli).
2. Buat fungsi `filterProdukMurah(maksHarga)` menggunakan arrow function + destructuring pada parameter.
3. Tambahkan fitur "gabungkan beberapa keranjang" menggunakan spread operator: `gabungKeranjang(...keranjangKeranjang)`.

---

## Ringkasan

| Konsep | Fungsi Utama | Simbol |
|---|---|---|
| Arrow Function | Sintaks function ringkas, `this` mengikuti scope luar | `=>` |
| Destructuring | Bongkar array/object jadi variabel individual | `[...]` / `{...}` di kiri |
| Spread | Bentangkan elemen array/object | `...` saat "menggunakan" |
| Rest | Kumpulkan sisa elemen jadi satu | `...` saat "mendefinisikan" |

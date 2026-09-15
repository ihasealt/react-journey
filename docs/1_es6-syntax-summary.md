# ES6+ Syntax — Rangkuman

> Dokumentasi ringkas: Arrow Functions, Destructuring, Spread/Rest Operator

---

## 1. Arrow Functions

Sintaks singkat untuk menulis function. `this` mengikuti scope di sekitarnya (lexical), bukan `this` sendiri.

```javascript
// Function biasa vs Arrow function
function tambah(a, b) { return a + b; }
const tambah = (a, b) => a + b;

// Satu parameter -> kurung opsional
const kuadrat = n => n * n;

// Tanpa parameter
const sapa = () => console.log("Halo!");

// Contoh this binding
function Timer() {
  this.detik = 0;
  setInterval(() => {
    this.detik++; // 'this' tetap merujuk ke Timer
  }, 1000);
}
```

**Gunakan arrow function untuk:** callback (`map`, `filter`, `reduce`), function pendek, saat butuh `this` dari luar.
**Gunakan function biasa untuk:** method di object literal, constructor, saat butuh `this` dinamis.

---

## 2. Destructuring

Membongkar nilai dari array/object langsung ke variabel.

```javascript
// Array destructuring
const warna = ["merah", "hijau", "biru"];
const [merah, hijau, biru] = warna;
const [, kedua] = warna;                 // skip elemen
const [a, b, c, d = "kuning"] = warna;    // default value
[x, y] = [y, x];                          // swap tanpa temp var

// Object destructuring
const user = { nama: "Andi", umur: 25 };
const { nama, umur } = user;
const { nama: userNama } = user;          // rename
const { pekerjaan = "Belum bekerja" } = user; // default value

// Nested destructuring
const { alamat: { kota } } = profil;

// Destructuring di parameter function
function tampilkan({ nama, umur }) {
  console.log(`${nama}, ${umur} tahun`);
}
```

---

## 3. Spread & Rest Operator

Simbol sama (`...`), fungsi berlawanan:
- **Spread** → membentangkan elemen (dipakai saat "menggunakan" nilai)
- **Rest** → mengumpulkan elemen (dipakai saat "mendefinisikan")

```javascript
// SPREAD — array
const buah = ["apel", "jeruk"];
const lengkap = [...buah, "mangga"];
const salinan = [...buah];                // copy array
const gabungan = [...arrA, ...arrB];      // gabung array

// SPREAD — object
const dataUser = { nama: "Budi", umur: 30 };
const updateUmur = { ...dataUser, umur: 31 }; // immutable update

// SPREAD — argument function
function jumlahkan(a, b, c) { return a + b + c; }
jumlahkan(...[1, 2, 3]);

// REST — parameter function
function jumlahSemua(...angka) {
  return angka.reduce((total, n) => total + n, 0);
}

// REST — array destructuring
const [pertama, ...sisanya] = [10, 20, 30, 40];

// REST — object destructuring
const { nama, ...sisaData } = { nama: "Dewi", umur: 28, kota: "Malang" };
```

---

## Tabel Ringkasan

| Konsep | Fungsi Utama | Simbol | Posisi |
|---|---|---|---|
| Arrow Function | Sintaks ringkas, `this` mengikuti scope luar | `=>` | — |
| Destructuring | Bongkar array/object jadi variabel individual | `[...]` / `{...}` | Sisi kiri (`const [x] = arr`) |
| Spread | Bentangkan elemen array/object | `...` | Sisi kanan / saat memakai nilai |
| Rest | Kumpulkan sisa elemen jadi satu | `...` | Sisi kiri / saat mendefinisikan param |

---

## Referensi Cepat: Kapan Pakai Apa

- Butuh copy array/object tanpa mengubah aslinya → **spread**
- Butuh function menerima jumlah argument tak tentu → **rest**
- Butuh ambil beberapa properti sekaligus dari object/array → **destructuring**
- Butuh callback singkat atau `this` dari scope luar → **arrow function**

*Lihat `materi-es6-plus.md` untuk penjelasan lengkap beserta mini project keranjang belanja.*

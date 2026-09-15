// LATIHAN 1: Object Destructuring

// 1. Buat object transaksi
const transaksi = {
  id: "TRX-001",
  nominal: 15000,
  kategori: "Makanan",
  metodeBayar: "QRIS"
};

// 2. Arrow function dengan Destructuring di parameter
// Perhatikan bagian ({ nominal, kategori, metodeBayar }), langsung mengekstrak propertinya
const cetakRincian = ({ nominal, kategori, metodeBayar }) => {
  return `Transaksi Rp${nominal} untuk ${kategori} via ${metodeBayar}`;
};

// Latihan 1
console.log("Hasil Latihan 1");
console.log(cetakRincian(transaksi));


// LATIHAN 2: Spread Operator (Immutability)

// 1. Array awal
const daftarKategori = ["Makanan", "Transport"];

// 2. Buat array baru dengan Spread Operator (...) + elemen baru
const kategoriLengkap = [...daftarKategori, "Hiburan"];

// Uji coba Latihan 2
console.log("\nHasil Latihan 2");
console.log("Array Asli   :", daftarKategori);
console.log("Array Baru   :", kategoriLengkap);


// LATIHAN 3: Arrow Function & Array Map

// 1. Array angka nominal
const daftarAngka = [10000, 20000, 50000];

// 2. Mengubah tiap elemen array menggunakan .map() dan Arrow Function
const daftarRupiah = daftarAngka.map((angka) => `Rp${angka}`);

// Uji coba Latihan 3
console.log("\nHasil Latihan 3");
console.log(daftarRupiah);
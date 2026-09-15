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
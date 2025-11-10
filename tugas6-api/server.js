const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware untuk membaca JSON

// Data sementara (mock database)
let items = [
  { id: 1, name: "Kulkas", price: 2500000, stock: 3 },
  { id: 2, name: "Televisi", price: 1800000, stock: 5 }
];
let nextId = 3;

// ✅ [GET] Lihat semua data
app.get('/api/items', (req, res) => {
  res.json({
    success: true,
    message: "Daftar semua item",
    data: items
  });
});

// ✅ [GET] Lihat data berdasarkan ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Item tidak ditemukan" });
  }
  res.json({ success: true, data: item });
});

// ✅ [POST] Tambah data baru
app.post('/api/items', (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ success: false, message: "Semua field wajib diisi (name, price, stock)" });
  }

  const newItem = { id: nextId++, name, price, stock };
  items.push(newItem);
  res.status(201).json({ success: true, message: "Item berhasil ditambahkan", data: newItem });
});

// ✅ [PUT] Ubah data berdasarkan ID
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: "Item tidak ditemukan" });
  }

  const { name, price, stock } = req.body;
  items[itemIndex] = {
    id,
    name: name || items[itemIndex].name,
    price: price || items[itemIndex].price,
    stock: stock || items[itemIndex].stock
  };

  res.json({ success: true, message: "Item berhasil diperbarui", data: items[itemIndex] });
});

// ✅ [DELETE] Hapus data berdasarkan ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Item tidak ditemukan" });
  }

  const deleted = items.splice(index, 1);
  res.json({ success: true, message: "Item berhasil dihapus", data: deleted });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

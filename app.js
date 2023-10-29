// definisikan dependency yang dibutuhkan
const express = require('express');
const app = express();
const multer = require('multer');
//untuk menambahkan path mengkonfigurasi Express agar bisa menampilkan file static pada server
const path = require('path');

app.use('/upload', express.static(path.join(__dirname, 'upload')));

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/upload'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const contacts = [
  {
    name: 'amir',
    phone: '085482938471',
  },
  {
    name: 'budi',
    phone: '086452738493',
  },
];

function validateIndex(req, res, next) {
  if (
    req.query.index !== undefined &&
    contacts[req.query.index] === undefined
  ) {
    res.send({ success: false });
  } else {
    next();
  }
}

app.use(validateIndex);
app.use(express.json());

app.get('/contact', function (req, res) {
  res.send(contacts);
});

app.post('/contact', function (req, res) {
  contacts.push({ name: req.body.name, phone: req.body.phone });
  res.send({ success: true });
});

app.put('/contact', function (req, res) {
  contacts[req.query.index] = { name: req.body.name, phone: req.body.phone };
  res.send({ success: true });
});

app.delete('/contact', function (req, res) {
  contacts.splice(req.query.index, 1);
  res.send({ success: true });
});

// menerapkan middleware multer hanya pada rute berikut
app.put(
  '/contact/upload',
  multer({ storage: diskStorage }).single('photo'),
  (req, res) => {
    const file = req.file;
    if (!file) {
      res.status(400).send({
        status: false,
        data: 'No File is selected.',
      });
    } else {
      // menyimpan lokasi unggah data kontak pada indeks yang diinginkan
      // Misalnya, Anda dapat menyimpan informasi file di objek kontak yang sesuai.
      // contacts[req.query.index].photo = req.file.path;
      res.send({ status: true, data: req.file });
    }
  }
);

app.listen(3000, function () {
  console.log('server running');
});
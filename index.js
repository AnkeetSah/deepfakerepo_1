const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const crypto = require('crypto');

// Disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, buffer) => {
      if (err) return cb(err);
      const filename = buffer.toString('hex') + path.extname(file.originalname);
      cb(null, filename);
    });
  }
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("index")
});

app.post('/upload', upload.single("vedio"), (req, res) => {
  console.log(req.file);
  res.send('Upload Successfully!');
});

app.listen("3000", () => {
  console.log("server is running on port 3000");
});
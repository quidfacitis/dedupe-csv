const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');
const { dedupeCsv } = require('./dedupeCsv');

app.use(express.json());

global.__basedir = __dirname;

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// const clearOutUploads = (req, res, next) => {
//   fs.readdir(__basedir + '/uploads/', (err, files) => {
//     if (err) {
//       next();
//     }
//     for (const file of files) {
//       fs.unlink(__basedir + '/uploads/' + file, err => {
//         if (err) {
//           next();
//         }
//       });
//     }
//   });

//   next();
// }

app.post('/testRoute', upload.single("csv-input"), async (req, res) => {
  try {
    await dedupeCsv(__basedir + '/uploads/' + req.file.filename);
    return res.json({ csv: `${req.file.filename.slice(0, -4)}-deduped.csv`, json: `${req.file.filename.slice(0, -4)}-domain-count.json`});
  } catch (error) {
    return res.sendStatus(409); // conflict
  }
});

app.get('/json/:jsonPath', (req, res) => {
  const jsonPath = `${__basedir}/uploads/${req.params.jsonPath}`;
  res.download(jsonPath);
});

app.get('/csv/:csvPath', (req, res) => {
  const csvPath = `${__basedir}/uploads/${req.params.csvPath}`;
  res.download(csvPath);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

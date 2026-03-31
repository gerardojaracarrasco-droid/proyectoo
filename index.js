const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// guardar archivo en memoria, suficiente para este reto
const upload = multer({ storage: multer.memoryStorage() });

// archivos estáticos opcionales
app.use('/public', express.static(path.join(__dirname, 'public')));

// ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ruta del reto
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});

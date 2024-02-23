// backend/middleware/uploadMiddleware.js
const multer = require('multer');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define o diretório de destino dos uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define o nome do arquivo
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

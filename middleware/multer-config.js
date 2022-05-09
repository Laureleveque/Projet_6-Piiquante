// configuration de multer

const multer = require("multer"); // importation de multer

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // enregistrement sur le disque
  destination: (req, file, callback) => {
    // dossier où enregistrer le fichier
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // nouveau nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // extension du fichier
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");

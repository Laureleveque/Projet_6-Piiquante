// configuration de multer (gestion des fichiers téléchargés par l'utilisateur)

const multer = require("multer"); // importation de multer

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// configuration du chemin et du nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
  //  enregistrer les fichiers entrants dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  // utiliser le nom d'origine, remplacer les espaces par des underscores et ajouter un timestamp comme nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");

    //utilise la const de type MIME pour résoudre l'extension de fichier
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// exportation de l'élément multer configuré (avec la const storage) et gestion uniquement des téléchargements de fichiers image.
module.exports = multer({ storage: storage }).single("image");

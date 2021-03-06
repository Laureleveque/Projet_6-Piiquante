// middleware d'authentification : user correspondant à celui encodé dans le token

const jwt = require("jsonwebtoken"); // importation du package de création et de vérification des tokens

// middleware à ajouter pour sécuriser les routes

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // on extrait le token du header authorization
    // la méthode verify permet de vérifier la validité d'un token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId; // récupération de l'userId
    // si userId différent du userId
    if (req.body.userId && req.body.userId !== userId) {
      throw "Identifiant utilisateur non valide !";
      // si ok, on continue
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: Error | "Requête non authentifiée !",
    });
  }
};

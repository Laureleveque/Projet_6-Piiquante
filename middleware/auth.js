// middleware d'authentification : user correspondant à celui encodé dans le token

const jwt = require("jsonwebtoken"); // package de vérification des tokens

// middleware à appliquer avant les controleurs des routes

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token (2ème élément du tableau)
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // décodage du token
    const userId = decodedToken.userId; // récupération de l'userId
    if (req.body.userId && req.body.userId !== userId) {
      // si userId différent du userId
      throw "Identifiant utilisateur non valide !";
    } else {
      // si c'est ok
      next();
    }
  } catch {
    res.status(401).json({
      error: Error | "Requête non authentifiée !",
    });
  }
};

// middleware d'authentification : user correspondant à celui encodé dans le token

const jwt = require("jsonwebtoken"); // vérification des tokens

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token (2ème élément du tableau)
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // décodage du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      // si user différent
      throw "Identifiant utilisateur non valide !";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête non authentifiée !"),
    });
  }
};

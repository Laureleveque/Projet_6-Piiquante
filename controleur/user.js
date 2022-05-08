const bcrypt = require("bcrypt"); // package de chiffrement

const jwt = require("jsonwebtoken"); // vérification des tokens

const User = require("../modele/user");

// nouvel utilisateur - hachage du mot de passe (fonction asynchrone)

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // 10 tours de l'algorithme de cryptage
    .then((hash) => {
      // récupération du mot de passe
      const user = new User({
        // création du nouvel utilisateur
        email: req.body.email,
        password: hash, // stockage du mot de passe crypté
      });
      user
        .save() // enregistrement dans la base de données
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// connection de l'utilisateur

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // recherche de l'utilisateur dans la base de données
    .then((user) => {
      if (!user) {
        // si mongoose ne trouve pas l'utilisateur
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt // sinon comparaison du mot de passe avec le hash enregistré
        .compare(req.body.password, user.password) // fonction compare
        .then((valid) => {
          if (!valid) {
            // si résultat false
            return res.status(401).json({ error: "Mot de passe incorrect !" }); // comparaison true
          }
          res.status(200).json({
            // renvoi d'un fichier json
            userId: user._id, // vérification de l'id du user/ impossibilité de changer les sauces des autres utilisateurs
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              // clé secrète pour l'encodage
              expiresIn: "24h", // durée de validité du token
            }), // vérification token d'authentification
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

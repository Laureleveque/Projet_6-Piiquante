const bcrypt = require("bcrypt"); // package de chiffrement

const User = require("../modele/User");

// hachage du mot de passe (fonction asynchrone)

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // 10 tours de l'algorithme de cryptage
    .then((hash) => {
      // récupération diu mot de passe
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

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

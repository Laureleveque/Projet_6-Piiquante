const bcrypt = require("bcrypt"); // importation package de chiffrement

const jwt = require("jsonwebtoken"); // importation package vérification des tokens

const User = require("../modele/user"); //exportation du modele user

// création d'un nouvel utilisateur

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // 10 tours de l'algorithme de cryptage pour créer un hash de mot de passe
    // récupération du mot de passe
    .then((hash) => {
      // création du nouvel utilisateur
      const user = new User({
        email: req.body.email, // stockage de l'email
        password: hash, // stockage du mot de passe crypté
      });
      user
        .save() // enregistrement dans la base de données
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ message: "erreur serveur" }));
};

// connection de l'utilisateur : vérification identifiants valides

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // recherche de l'utilisateur avec l'email unique
    .then((user) => {
      // si mongoose ne trouve pas l'utilisateur
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt // sinon comparaison du mot de passe avec le hash initial enregistré
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si résultat false
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });
          }
          // comparaison true
          res.status(200).json({
            // renvoi d'un fichier json avec l'identifiant de l'utilisateur dans la base et un token
            userId: user._id,
            // méthode sign : vérification token d'authentification
            token: jwt.sign(
              { userId: user._id },
              // clé secrète pour l'encodage
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h", // durée de validité du token
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ message: "erreur serveur" }));
};

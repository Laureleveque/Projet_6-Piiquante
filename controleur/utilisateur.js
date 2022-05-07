// logique métier

// création d'un nouvel utilisateur : Signup

const Utilisateur = require("../modele/utilisateur");

exports.createUtilisateur = (req, res, next) => {
  // exportation de la fonction création d'un utilisateur
  delete req.body._id;
  const utilisateur = new Utilisateur({
    ...req.body,
  });
  utilisateur
    .save()
    .then(() => res.status(201).json({ message: "utilisateur enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// route connection : Login

exports.getUtilisateur = (req, res, next) => {
  delete req.body._id;
  const utilisateur = new Utilisateur({
    ...req.body,
  });
  utilisateur
    .save()
    .then(() => res.status(201).json({ message: "utilisateur connecté !" }))
    .catch((error) => res.status(400).json({ error }));
};

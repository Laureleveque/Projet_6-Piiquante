const express = require("express");

const router = express.Router();

const Sauces = require("../modele/sauces");

// route récupération d'un tableau de toutes les sauces

router.get("/", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});

// route récupération d'une sauce spécifique avec l’_id fourni

router.get("/:id", (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});

router.post("/", (req, res, next) => {
  // ...
});

// route création d'une sauce par l'utilisateur

router.post("/:id", (req, res, next) => {
  delete req.body._id;
  const signup = new sauces({
    ...req.body,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// route modification d'une sauce spécifique avec l’_id fourni

router.put("/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// route suppression d'une sauce spécifique avec l’_id fourni

router.delete("/:id", (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

// route like spécifique à l'_id

router.post("/:id/like", (req, res, next) => {
  //...
});

// route dislike spécifique à l'_id

router.post("/:id/dislike", (req, res, next) => {
  //...
});

module.exports = router;

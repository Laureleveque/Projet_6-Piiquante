const Sauces = require("../modele/sauces");

// route récupération d'un tableau de toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// route récupération d'une sauce spécifique avec l’_id fourni

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// route création d'une sauce par l'utilisateur

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const signup = new sauce({
    ...req.body,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// route modification d'une sauce spécifique avec l’_id fourni

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// route suppression d'une sauce spécifique avec l’_id fourni

router.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// route like spécifique à l'_id

router.post("/:id/like", (req, res, next) => {
  //...
});

// route dislike spécifique à l'_id

router.post("/:id/dislike", (req, res, next) => {
  //...
});

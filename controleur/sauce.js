// Logique métier

const Sauce = require("../modele/sauce");
const fs = require("fs"); // importation du package fs de Node

// route récupérer toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// route récupérer une sauce spécifique avec l’_id fourni

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // comparaison pour récupérer une sauce par son identifiant unique
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(403).json({ message: "unauthorized request" })
    );
};

// route ajouter une sauce par l'utilisateur

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject_id; // suppression de l'identifiant généré automatiquement par MongoDB
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// route supprimer une sauce spécifique avec l’_id fourni

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })

    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) =>
            res.status(403).json({ message: "unauthorized request" })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// route modification/mise à jour d'une sauce spécifique avec l’_id fourni

exports.modifySauce = (req, res, next) => {
  // sauce dont l'id est = à l'id envoyé ds les paramètres de requête et le 2ème argument:nouvelle version de la sauce
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) =>
      res.status(403).json({ message: "unauthorized request" })
    );
};

/*

// route like spécifique à l'_id

router.post("/:id/like", (req, res, next) => {
  //...
});

*/

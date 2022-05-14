// Logique métier

const Sauce = require("../modele/sauce");
const fs = require("fs"); // importation le module fs de Node pour créer et gérer les fichiers entrants

// route GET récupérer toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// route GET récupérer une sauce spécifique avec l’_id fourni

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // comparaison pour récupérer une sauce par son identifiant unique
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(403).json({ message: "unauthorized request" })
    );
};

// route POST ajouter une sauce par l'utilisateur

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject_id; // suppression de l'identifiant généré automatiquement par MongoDB
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // mise à zéro des likes et dislikes
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

// route DELETE supprimer une sauce spécifique avec l’_id fourni

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })

    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        // La fonction fs.unlink() permet de supprimer l'image du fichier
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) =>
            res.status(403).json({ message: "unauthorized request" })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// route PUT modification/mise à jour d'une sauce spécifique avec l’_id fourni

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  // mise à jour de la nouvelle version de la sauce
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) =>
      res.status(403).json({ message: "unauthorized request" })
    );
};

// route like/dislike spécifique à l'_id

exports.likeSauce = (req, res, next) => {
  // recherche de la sauce
  Sauce.findOne({ _id: req.params.id })

    .then((sauce) => {
      // si l'utilisateur like
      if (req.body.like == 1) {
        sauce.usersLiked.push(req.body.userId); // ajout Id de l'utilisateur au tableau des likes
        Sauce.updateOne(
          { _id: req.params.id },
          {
            // mise à jour de la sauce
            sauce,
            usersLiked: sauce.usersLiked,
            likes: sauce.usersLiked.length, // et mise à jour du nombre de likes dans le tableau
          }
        )
          .then(() => res.status(200).json({ message: "Sauce likée !" }))
          .catch((error) => res.status(400).json({ error }));

        // sinon si l'utilisateur dislike
      } else if (req.body.like == -1) {
        sauce.usersDisliked.push(req.body.userId); // ajout Id de l'utilisateur au tableau des dislikes
        Sauce.updateOne(
          { _id: req.params.id },
          {
            // mise à jour de la sauce
            sauce,
            usersDisliked: sauce.usersDisliked,

            dislikes: sauce.usersDisliked.length, // et mise à jour du nombre de dislikes dans le tableau
          }
        )

          .then(() => res.status(200).json({ message: "Sauce dislikée !" }))
          .catch((error) => res.status(400).json({ error }));
      }

      // sinon si l'utilisateur annule son like
      else if (req.body.like == 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          let indexUserLiked = sauce.usersLiked.indexOf(req.body.userId); // recherche de l'index de l'utilisateur dans le tableau des likes

          sauce.usersLiked.splice(indexUserLiked, 1);
          Sauce.updateOne(
            { _id: req.params.id },
            {
              // mise à jour de la sauce
              sauce,
              usersLiked: sauce.usersLiked,

              likes: sauce.usersLiked.length, // et mise à jour du nombre de likes dans le tableau
            }
          )
            .then(() => res.status(200).json({ message: "Like supprimé !" }))
            .catch((error) => res.status(400).json({ error }));

          // sinon si l'utilisateur annule son dislike
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          let indexUserDisliked = sauce.usersDisliked.indexOf(req.body.userId); // recherche de l'index de l'utilisateur dans le tableau des dislikes

          sauce.usersDisliked.splice(indexUserDisliked, 1);
          Sauce.updateOne(
            { _id: req.params.id },
            {
              // mise à jour de la sauce
              sauce,
              usersDisliked: sauce.usersDisliked,
              dislikes: sauce.usersDisliked.length, // mise à jour du nombre de dislikes dans le tableau
            }
          )
            .then(() => res.status(200).json({ message: "Dislike supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

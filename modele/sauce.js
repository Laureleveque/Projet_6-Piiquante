const mongoose = require("mongoose"); // on utilise mongoose pour créer ce schéma

// utilisation de Mongoose pour créer un schéma de données pour la base de données MongoDB

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: ["String <userId>"],
  usersDisliked: ["String <userId>"],
});

// exportation de ce schéma en tant que modèle Mongoose appelé « Sauce », le rendant disponible pour l'application Express.
module.exports = mongoose.model("Sauce", sauceSchema);

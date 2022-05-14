// importation de mongoose
const mongoose = require("mongoose");

// la méthode Schéma de mongoose permet de créer un schéma de données pour la base de données MongoDB
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

// exportation de ce schéma avec la méthode Model (transforme ce modèle en un modèle utilisable)
module.exports = mongoose.model("Sauce", sauceSchema);

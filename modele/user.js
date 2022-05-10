// utilisation de mongoose pour créer un schéma de données pour la base de données MongoDB
const mongoose = require("mongoose");

// email unique par utilisateur
const uniqueValidator = require("mongoose-unique-validator");

// création d'un schéma de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // 1 utilisateur = 1 email
  password: { type: String, required: true },
});

// améliore les messages d'erreur lors de l'enregistrement de données uniques
userSchema.plugin(uniqueValidator);

// exportation de ce schéma en tant que modèle Mongoose
module.exports = mongoose.model("Users", userSchema);

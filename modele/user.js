const mongoose = require("mongoose"); // on utilise mongoose pour créer ce schéma

const uniqueValidator = require("mongoose-unique-validator"); // email unique par utilisateur

// création du schéma de données pour la base de données MongoDB

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // améliore les messages d'erreur lors de l'enregistrement de données uniques

// exportation de ce schéma en tant que modèle Mongoose
module.exports = mongoose.model("User", userSchema);

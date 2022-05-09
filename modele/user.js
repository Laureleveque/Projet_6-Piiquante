const mongoose = require("mongoose"); // on utilise mongoose pour créer ce schéma

const uniqueValidator = require("mongoose-unique-validator"); // email unique par utilisateur

// utilisation de Mongoose pour créer un schéma de données pour la base de données MongoDB

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // 1 utilisateur = 1 email
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // améliore les messages d'erreur lors de l'enregistrement de données uniques

// exportation de ce schéma en tant que modèle Mongoose
module.exports = mongoose.model("Users", userSchema);

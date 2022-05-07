const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator"); // un email unique par utilisateur

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // améliore les messages d'erreur lors de l'enregistrement de données uniques

module.exports = mongoose.model("User", userSchema);

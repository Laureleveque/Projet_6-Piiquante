const mongoose = require("mongoose"); // importation de mongoose

const loginSchema = mongoose.Schema({
  // méthode Schema mise à disposition par Mongoose
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// exportation de ce schéma en tant que modèle Mongoose appelé login, le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model("login", loginSchema);

const signupSchema = mongoose.Schema({
  // méthode Schema mise à disposition par Mongoose
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// exportation de ce schéma en tant que modèle Mongoose appelé « signup », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model("signup", signupSchema);

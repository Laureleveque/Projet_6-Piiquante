const express = require("express"); // importation d'Express
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // importation de mongoose

const sauces = require("./modele/sauces");
const utilisateur = require("./modele/utilisateur");

const authRoutes = require("./route/utilisateur");
const saucesRoutes = require("./route/sauces");

const app = express(); // création de la constante app + appel de la méthode Express

mongoose
  .connect(
    "mongodb+srv://Laurence:MongoDB@cluster0.wkqvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); // gestion de la requête POST venant de l'application frontend

// permet à toutes les demandes de toutes les origines d'accéder à l'API (requêtes cross-origin)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/utilisateur", authRoutes);

app.use("/api/sauces", saucesRoutes);

module.exports = app;

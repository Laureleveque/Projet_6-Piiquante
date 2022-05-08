// importation d'Express
const express = require("express");

// création d'une application express
const app = express(); // création de la constante app pour l'application + appel de la méthode Express

// gestion de la requête POST venant de l'application frontend
app.use(express.json()); // accès au corps json de la requête

// importations
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const sauceModele = require("./modele/sauce");
const userModele = require("./modele/user");

const sauceRoute = require("./route/sauce");
const userRoute = require("./route/user");

// logique pour se connecter à mongoDB
mongoose
  .connect(
    "mongodb+srv://Laurence:MongoDB@cluster0.wkqvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// CORS : permet à toutes les demandes de toutes les origines d'accéder à l'API (requêtes cross-origin)

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

// routes attendues par le frontend

app.use("/api/sauce", sauceRoute);

app.use("/api/user", userRoute);

module.exports = app; // exportation de l'application

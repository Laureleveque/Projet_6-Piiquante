// importation du framework Express
const express = require("express");

// création d'une application express: appel de la méthode Express
const app = express();

// gestion de la requête POST venant de l'application frontend
app.use(express.json()); // accès au corps json de la requête

// importation des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// importations
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const sauceSchema = require("./modele/sauce");
const userSchema = require("./modele/user");

const sauceRoute = require("./route/sauce");
const userRoute = require("./route/user");

// connection à MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@${process.env.DB_host}/${process.env.DB_name}?retryWrites=true&w=majority`,
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

// la méthode app.use : attribue un middleware à une route spécifique de l'application
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoute);

app.use("/api/auth", userRoute);

// exportation de l'application
module.exports = app;

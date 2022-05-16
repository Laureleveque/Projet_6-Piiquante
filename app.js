// importation du framework Express
const express = require("express");

// Appel de la méthode Express pour la création de l'application
const app = express();

// accès au corps json de la requête
app.use(express.json());

// module pour accéder aux variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// importations
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
/*
const sauceSchema = require("./modele/sauce");
const userSchema = require("./modele/user");
*/
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

// méthodes app.use

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoute); // fait le lien avec la route /api/sauces et le router sauceRoute

app.use("/api/auth", userRoute);

// exportation de l'application
module.exports = app;

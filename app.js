// fichier de l'application Express

const express = require("express"); // importation d'Express

const app = express(); // création de la constante app + appel de la méthode Express

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

// route pour laquelle nous souhaitons enregistrer cet élément de middleware

app.use("http://localhost:3000/api/sauces", (req, res, next) => {
  const sauces = [
    {
      userId: "",
      name: "",
      manufacturer: "",
      description: "",
      mainPepper: "",
      imageUrl: "https://",
      heat: "",
      likes: "",
      dislikes: "",
      usersLiked: "",
      usersDisliked: "",
    },
    {
      userId: "",
      name: "",
      manufacturer: "",
      description: "",
      mainPepper: "",
      imageUrl: "https://",
      heat: "",
      likes: "",
      dislikes: "",
      usersLiked: "",
      usersDisliked: "",
    },
  ];
  res.status(200).json(sauces); //articles sous la forme de données JSON, avec un code 200 pour une demande réussie.
});

module.exports = app; // exportation de cette application

// exécution de l'application Express

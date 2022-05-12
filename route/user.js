// Logique de route pour les utilisateurs

const express = require("express");

const router = express.Router(); // création d'un router avec la méthode Router

const userCtrl = require("../controleur/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router; // on exporte le routeur de ce fichier

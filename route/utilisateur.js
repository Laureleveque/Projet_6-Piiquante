const express = require("express");

const router = express.Router(); // création d'un router avec la méthode Router

//const utilisateur = require("../modele/utilisateur");

const utilisateurCtrl = require("../controleur/utilisateur");
router.post("/", utilisateurCtrl.createUtilisateur);

router.post("/", utilisateurCtrl.getUtilisateur);

module.exports = router; // on réexporte le router

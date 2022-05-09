// Logique de route pour les sauces

const express = require("express");

const router = express.Router(); // création d'un routeur avec la méthode Router

const auth = require("../middleware/auth"); // rajout du middleware d'authentification user pour protéger les routes

const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controleur/sauce");
//const userCtrl = require("../controleur/user");

// toutes les routes pour les sauces : CRUD avec middleware d'authentification
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

module.exports = router; // on réexporte le routeur de ce fichier

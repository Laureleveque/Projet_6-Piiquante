// Logique de route pour les sauces

const express = require("express");

// la méthode router permet de créer des routeurs séparés pour chaque route principale
const router = express.Router();

const auth = require("../middleware/auth"); // rajout du middleware d'authentification user pour protéger les routes

const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controleur/sauce");

// toutes les routes pour les sauces : CRUD complet avec middleware d'authentification auth
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router; // on exporte le routeur de ce fichier

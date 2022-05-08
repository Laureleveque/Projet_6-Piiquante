const express = require("express");

const router = express.Router(); // création d'un router avec la méthode Router

const user = require("../middleware/user");

const sauceCtrl = require("../controleur/sauce");

// rajout du middleware d'authentification user pour protéger les routes

router.post("/:id", user, sauceCtrl.createSauce);
router.get("/", user, sauceCtrl.getAllSauces);
router.get("/:id", user, sauceCtrl.getOneSauce);
router.put("/:id", user, sauceCtrl.modifySauce);
router.delete("/:id", user, sauceCtrl.deleteSauce);

module.exports = router; // on réexporte le router

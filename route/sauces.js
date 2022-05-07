const express = require("express");

const router = express.Router(); // création d'un router avec la méthode Router

const saucesCtrl = require("../controleur/sauces");

router.post("/:id", saucesCtrl.createSauce);

router.get("/", saucesCtrl.getAllSauces);

router.get("/:id", saucesCtrl.getOneSauce);

router.put("/:id", saucesCtrl.modifySauce);

router.delete("/:id", saucesCtrl.deleteSauce);

module.exports = router; // on réexporte le routeronst router = express.Router();

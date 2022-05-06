const express = require("express");

const router = express.Router();

const Signup = require("../models/signup");

const Login = require("../models/login");

// route inscription

router.post("/signup", (req, res, next) => {
  delete req.body._id;
  const signup = new Signup({
    ...req.body,
  });
  signup
    .save()
    .then(() => res.status(201).json({ message: "utilisateur enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// route connection

router.post("/login", (req, res, next) => {
  delete req.body._id;
  const login = new Login({
    ...req.body,
  });
  login
    .save()
    .then(() => res.status(201).json({ message: "utilisateur connecté !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;

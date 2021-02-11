//!minOnSave
const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  //Chiffrement mdp

  delete req.body._id;
  const user = new User({
    //userID: req.params.id ?
    email: req.body.email
    //password: hash
  });

  user.save()
  .then(() => res.status(201).json({ message: "User added!" }))
	.catch((error) => res.status(400).json({ error }));
});
router.post("/login", (req, res, next) => {
  //
});

module.exports = router;

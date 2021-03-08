//!minOnSave
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

exports.userSignup = (req, res, next) => {
  const parsedEmail = CryptoJS.enc.Utf8.parse(req.body.email);
  const hex = CryptoJS.enc.Hex.stringify(parsedEmail);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: hex,
      password: hash
    });

    user.save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
  	.catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};
exports.userLogin = (req, res, next) => {
  const parsedEmail = CryptoJS.enc.Utf8.parse(req.body.email);
  const hex = CryptoJS.enc.Hex.stringify(parsedEmail);
  User.findOne({ email: hex })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé!" });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          process.env.SECRET,
          { expiresIn: "24h" }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
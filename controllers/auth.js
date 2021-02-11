//!minOnSave
const User = require("../models/user");

exports.userSignup = (req, res, next) => {
  //delete req.body._id ?
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      //userID: req.params.id ?
      email: req.body.email,
      password: hash
    });

    user.save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
  	.catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
});
exports.userLogin = (req, res, next) => {
  //
});

//!minOnSave
const User = require("../models/user");

exports.userSignup = (req, res, next) => {
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
exports.userLogin = (req, res, next) => {
  //
});

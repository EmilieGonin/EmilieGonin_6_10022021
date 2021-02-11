//!minOnSave
const Sauce = require("../models/sauce");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json({ sauces }))
	.catch((error) => res.status(400).json({ error }));
});
exports.getSauce = (req, res, next) => {
  Sauce.findOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ sauce }))
	.catch((error) => res.status(400).json({ error }));
});
exports.createSauce = (req, res, next) => {
  //
});
exports.updateSauce = (req, res, next) => {
  //
});
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ message: "Deleted!" }))
	.catch((error) => res.status(400).json({ error }));
});
exports.updateLike = (req, res, next) => {
  //
});

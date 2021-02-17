//!minOnSave
const Sauce = require("../models/sauce");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json({ sauces }))
	.catch((error) => res.status(400).json({ error }));
};
exports.getSauce = (req, res, next) => {
  Sauce.findOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ sauce }))
	.catch((error) => res.status(400).json({ error }));
};
exports.createSauce = (req, res, next) => {
  //delete req.body._id ?
  //Parse malgré body-parser ?
  //const sauceInfos = JSON.parse(req.body.sauce);
  const sauce = new Sauce( {
    //...sauceInfos,
    ...req.body.sauce,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save();
  .then(() => res.status(201).json({ message: "Sauce ajoutée !" }))
	.catch((error) => res.status(400).json({ error }));
};
exports.updateSauce = (req, res, next) => {
  //
};
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ message: "Deleted!" }))
	.catch((error) => res.status(400).json({ error }));
};
exports.updateLike = (req, res, next) => {
  //
};

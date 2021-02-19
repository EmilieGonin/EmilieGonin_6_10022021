//!minOnSave
const Sauce = require("../models/sauce");
const fs = require('fs');

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
  const sauceInfos = JSON.parse(req.body.sauce);
  const sauce = new Sauce( {
    ...sauceInfos,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => res.status(201).json({ message: "Sauce ajoutée !" }))
	.catch((error) => res.status(400).json({ error }));
};
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
  .catch((error) => res.status(400).json({ error }));
};
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ id: req.params.id })
  .then(sauce => {
    const filename = sauce.image.split("/images")[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ id: req.params.id })
      .then((sauce) => res.status(200).json({ message: "Sauce supprimée !" }))
    	.catch((error) => res.status(400).json({ error }));
    })
  })
  .catch(error => res.status(500).json({ error }));
};
exports.updateLike = (req, res, next) => {
  //
};

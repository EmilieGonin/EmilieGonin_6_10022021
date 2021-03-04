//!minOnSave
const Sauce = require("../models/sauce");
const fs = require('fs');
const jwt = require("jsonwebtoken");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json( sauces ))
	.catch((error) => res.status(400).json({ error }));
};
exports.getSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => res.status(200).json( sauce ))
	.catch((error) => res.status(400).json({ error }));
};
exports.createSauce = (req, res, next) => {
  const sauceInfos = JSON.parse(req.body.sauce);

  const sauce = new Sauce( {
    ...sauceInfos,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLikes: [],
    usersDislikes: []
  });
  sauce.save()
  .then(() => res.status(201).json({ message: "Sauce ajoutée !" }))
	.catch((error) => res.status(400).json({ error }));
};
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  if (sauceObject.likes || sauceObject.dislikes) {
    delete sauceObject.likes;
    delete sauceObject.dislikes;
  }

  if (sauceObject.imageUrl) {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) {
          throw error;
        }
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
  .catch((error) => res.status(400).json({ error }));
};
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split("/images")[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json({ message: "Sauce supprimée !" }))
    	.catch((error) => res.status(400).json({ error }));
    })
  })
  .catch(error => res.status(500).json({ error }));
};
exports.updateLike = (req, res, next) => {
  if (req.body.like == 1) {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (!sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId } }, {
          _id: req.params.id })
        .then(() => res.status(200).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
  }
  else if (req.body.like == 0) {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId } }, {
          _id: req.params.id })
        .then(() => res.status(200).json({ message: "Like retiré !" }))
        .catch((error) => res.status(400).json({ error }));
      }
      if (sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: -1 },
          $pull: { usersDisliked: req.body.userId } }, {
          _id: req.params.id })
        .then(() => res.status(200).json({ message: "Dislike retiré !" }))
        .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
  }
  else if (req.body.like == -1) {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (!sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId } }, {
          _id: req.params.id })
        .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
  }
};

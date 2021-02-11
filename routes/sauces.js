//!minOnSave
const express = require('express');
const router = express.Router();
const Sauce = require("../models/sauce");

router.get("/", (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json({ sauces }))
	.catch((error) => res.status(400).json({ error }));
});
router.get("/:id", (req, res, next) => {
  Sauce.findOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ sauce }))
	.catch((error) => res.status(400).json({ error }));
});
router.post("/", (req, res, next) => {
  //
});
router.put("/:id", (req, res, next) => {
  //
});
router.delete("/:id", (req, res, next) => {
  Sauce.deleteOne({ id: req.params.id })
  .then((sauce) => res.status(200).json({ message: "Deleted!" }))
	.catch((error) => res.status(400).json({ error }));
});
router.post("/:id/like", (req, res, next) => {
  //
});

module.exports = router;

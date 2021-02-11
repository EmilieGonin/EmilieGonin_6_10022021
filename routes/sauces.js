//!minOnSave
const express = require('express');
const router = express.Router();
const sauceController = require("../controllers/sauce");

router.get("/", sauceController.getAllSauces;
router.get("/:id", sauceController.getSauce;
router.post("/", sauceController.createSauce;
router.put("/:id", sauceController.updateSauce;
router.delete("/:id", sauceController.deleteSauce;
router.post("/:id/like", sauceController.updateLike);

module.exports = router;

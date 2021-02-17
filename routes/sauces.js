//!minOnSave
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceController = require("../controllers/sauces");

router.get("/", sauceController.getAllSauces);
router.get("/:id", sauceController.getSauce);
router.post("/", auth, sauceController.createSauce);
router.put("/:id", auth, sauceController.updateSauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceController.updateLike);

module.exports = router;

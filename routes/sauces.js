//!minOnSave
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const checkId = require("../middleware/check-id");
const multer = require("../middleware/multer-config");
const sauceController = require("../controllers/sauces");

router.get("/", auth, sauceController.getAllSauces);
router.get("/:id", auth, sauceController.getSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.put("/:id", auth, checkId, multer, sauceController.updateSauce);
router.delete("/:id", auth, checkId, sauceController.deleteSauce);
router.post("/:id/like", auth, checkId, sauceController.updateLike);

module.exports = router;

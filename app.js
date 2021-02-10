//!minOnSave
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sauce = require("./models/sauce");
const User = require("./models/user");
const app = express();

mongoose.connect("mongodb+srv://Admin:OCPassword@cluster0.lsf8o.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());

// Users
app.post("/api/auth/signup", (req, res, next) => {
  //
});
app.post("/api/auth/login", (req, res, next) => {
  //
});

// Sauces
app.get("/api/sauces", (req, res, next) => {
  //
});
app.get("/api/sauces/:id", (req, res, next) => {
  //
});
app.post("/api/sauces", (req, res, next) => {
  //
});
app.put("/api/sauces/:id", (req, res, next) => {
  //
});
app.delete("/api/sauces/:id", (req, res, next) => {
  //
});
app.post("/api/sauces/:id/like", (req, res, next) => {
  //
});

module.exports = app;

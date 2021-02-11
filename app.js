//!minOnSave
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/auth");
const saucesRoutes = require("./routes/sauces");

mongoose.connect("mongodb+srv://Admin:OCPassword@cluster0.lsf8o.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

/*
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
*/

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;

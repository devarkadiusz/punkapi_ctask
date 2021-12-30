require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.account = require("./account.model.js")(mongoose);
db.favorites = require("./favorite.model.js")(mongoose);

module.exports = db;
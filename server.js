require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

// ---------- Connect to DB ----------
const mongoUserName = process.env.MONGO_USER_NAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const port = 3000

mongoose
    .connect(
        `mongodb+srv://${mongoUserName}:${mongoPassword}@grandmascloset.bxxic.mongodb.net/GrandmasCloset?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`DB is Connected on port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
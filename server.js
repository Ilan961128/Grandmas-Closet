require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");


// ---------- CORS ----------
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ---------- Body Parser ----------
app.use(express.json());
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());


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
            console.log(`DB Connected! port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Users = require("./models/users");



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

// ---------- Create User ----------
app.post("/user", async (req, res) => {
    try {
        var data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: (req.body.email).toLocaleLowerCase(),
            password: req.body.password,
            admin: "",
            secret_phrase: req.body.secretPhrase
        };

        var db = mongoose.connection;
        db.collection("users").insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            session.user_id = (collection.insertedId).toString();
            console.log("User Created Successfully");
        });

        return res.redirect("http://127.0.0.1:5500/signin.html");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ------- Check existing email -------- 
app.get("/check_email/:email", async (req, res) => {
    try {
        const email = (req.params.email).toLocaleLowerCase();
        const user = await Users.findOne({ email: email });
        if (user) {
            return res.status(200).json({ message: "Exists" });
        }
        else {
            return res.status(200).json({ message: "Not Exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});




// ---------- Connect to DB ----------
const mongoUserName = process.env.MONGO_USER_NAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const port = 5500

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
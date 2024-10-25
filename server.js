require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");
const mongoose = require("mongoose");
const Users = require("./models/users");
var session = require("express-session");

// ---------- Session ----------
session.user_id = null;
session.admin = null;

const checkSession = (user_type = 0) => {
    if (user_type == "admin") {
        if (session.admin === null) {
            return false;
        }
    }
    else
        if (session.user_id === null) {
            return false;
        }

    return true;
};

const generateRandomString = () => {
    return crypto.randomBytes(32).toString("hex");
};

app.use(
    session({
        secret: generateRandomString(),
        resave: false,
        saveUninitialized: true,
        user_id: null,
        admin: null
    })
);


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

// ---------- Create SessionID with UserID ----------
app.get("/SetSessionID/:user_id", async (req, res) => {
    try {
        const the_user_id = req.params.user_id;

        if (!the_user_id) {
            return res.status(404).json({ message: "Invalid Session ID" });
        }
        session.user_id = the_user_id;
        const user = await Users.findById(the_user_id);
        const admin = user.admin;

        if (admin === "master") {
            session.admin = "master";
            console.log("Admin User");
        }

        res.status(200).json({ the_user_id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get User By ID ----------
app.get("/user_details", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const users = await Users.findById(session.user_id);
        // console.log(users)
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get User By Email - Sign In ----------
app.get("/getUserByMail/:email", async (req, res) => {
    try {
        //make the email with all lower case
        const email = (req.params.email).toLocaleLowerCase();
        const users = await Users.findOne({ email: email });
        res.status(200).json({ users });
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
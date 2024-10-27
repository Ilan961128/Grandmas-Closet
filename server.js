require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");
const mongoose = require("mongoose");
const Users = require("./models/users");
const Items = require("./models/items");
const Orders = require("./models/orders");
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

// ---------- Check Session ----------
app.get("/checkSession", async (req, res) => {
    if (session.admin === "master") {
        return res.status(200).json({ message: "Admin" });
    }
    if (session.user_id === null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Authorized" });
});

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

// ---------- Get All Users ----------
app.get("/getUsers", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const users = await Users.find({});
        res.status(200).json({ users });
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

// ---------- Get User By Session ID ----------
app.get("/getUserBySession", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const users = await Users.findById(session.user_id);
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

// ---------- Delete User by ID ----------
app.post("/delete_user/:user_id", async (req, res) => {
    try {
        if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
        const user_id = req.params.user_id;
        const deletedUser = await Users.findByIdAndDelete(user_id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Deleted Successfully:", deletedUser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Update User By ID ----------
app.post("/update_user/:user_id", async (req, res) => {
    if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    const user_id = req.params.user_id;
    try {
        var data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            secret_phrase: req.body.secretPhrase,
            admin: req.body.admin,
        };

        console.log(req.body);


        const updatedFields = data;
        console.log(updatedFields);

        const updatedUser = await Users.findByIdAndUpdate(user_id, updatedFields, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Update User By Session ID ----------
app.post("/update_user", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        var data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
        };

        const updatedFields = data;
        const updatedUser = await Users.findByIdAndUpdate(session.user_id, updatedFields, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// ---------- Get All Items ----------
app.get("/getItems", async (req, res) => {
    // if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const items = await Items.find({});
        res.status(200).json({ items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get Item By ID ----------
app.get("/getItemById/:item_id", async (req, res) => {
    // if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const item_id = req.params.item_id;
        const item = await Items.findById(item_id);
        res.status(200).json({ item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Update Item By ID ----------
app.post("/update_item/:item_id", async (req, res) => {
    if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    const item_id = req.params.item_id;
    try {
        var data = {
            name: req.body.name,
            price: req.body.price,
            size: req.body.size,
            gender: req.body.gender,
            description: req.body.description,
            quantity: req.body.quantity,
            imgSrc: req.body.imgSrc,
            tags: req.body.tags,
        };

        const updatedFields = data;
        const updatedItem = await Items.findByIdAndUpdate(item_id, updatedFields, {
            new: true,
        });

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Delete Item by ID ----------
app.post("/delete_item/:item_id", async (req, res) => {
    try {
        if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
        const item_id = req.params.item_id;
        const deletedItem = await Items.findByIdAndDelete(item_id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        console.log("Item Deleted Successfully:", deletedItem);
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Create Order ----------

app.post("/create_order", async (req, res) => {
    try {
        var data = {
            items: req.body.items,
            user_id: session.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            price: req.body.price,
            status: 'Pending',
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            phone: req.body.phone,
            createdAt: new Date()
        };

        console.log(data);

        var db = mongoose.connection;
        db.collection("orders").insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
        });

        return res.status(200).json({ message: "Order created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get All Orders ----------
app.get("/getOrders", async (req, res) => {
    // if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const orders = await Orders.find({})
            .populate("items.item") // Populate the 'item' field within each 'items' subdocument
            .exec();

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get Order By ID ----------
app.get("/getOrderById/:order_id", async (req, res) => {
    // if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const order_id = req.params.order_id;
        const order = await Orders.findById(order_id)
            .populate("items.item") // Populate the 'item' field within each 'items' subdocument
            .exec();

        res.status(200).json({ order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Update Order By ID ----------
app.post("/update_order/:order_id", async (req, res) => {
    if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    const order_id = req.params.order_id;
    try {
        var data = {
            items: req.body.items,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            price: req.body.price,
            status: req.body.status,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            phone: req.body.phone,
        };

        const updatedFields = data;
        const updatedOrder = await Orders.findByIdAndUpdate(order_id, updatedFields, {
            new: true,
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Delete Order by ID ----------
app.post("/delete_order/:order_id", async (req, res) => {
    try {
        if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
        const order_id = req.params.order_id;
        const deletedOrder = await Orders.findByIdAndDelete(order_id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        console.log("Order Deleted Successfully:", deletedOrder);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ---------- Get Orders By Session ID ----------
app.get("/getOrdersBySession", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const orders = await Orders.find({ user_id: session.user_id })
            .populate("items.item") // Populate the 'item' field within each 'items' subdocument
            .exec();

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});



// ---------- Avarage Total Price Orders By Month ----------
app.get("/getOrdersByMonth", async (req, res) => {
    // if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const orders = await Orders.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    avgTotalPrice: { $avg: "$price" },
                },
            },
        ]);

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


// ---------- Total Orders By Status ----------
app.get("/getOrdersByStatus", async (req, res) => {
    // if (!checkSession("admin")) return res.status(401).json({ message: "Unauthorized" });
    try {
        const orders = await Orders.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});






// ---------- Sign out ---------
app.get("/signout", async (req, res) => {
    if (!checkSession("user")) return res.status(401).json({ message: "Unauthorized" });
    try {
        session.user_id = null;
        session.admin = null;
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
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
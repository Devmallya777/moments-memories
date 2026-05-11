require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const path = require("path");

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// ======================
// TEMP DATABASE
// ======================

let orders = [];

// ======================
// BREVO CONFIG
// ======================

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ======================
// HOME PAGE
// ======================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// ======================
// PLACE ORDER
// ======================

app.post("/api/order", async (req, res) => {

    try {

        const {

            product,
            price,
            name,
            email,
            phone,
            address,
            message

        } = req.body;

        // SAVE ORDER

        const newOrder = {

            id: Date.now(),

            product,
            price,
            name,
            email,
            phone,
            address,
            message,

            status: "Pending",

            date: new Date().toLocaleString()

        };

        orders.push(newOrder);

        // SEND EMAIL

        await tranEmailApi.sendTransacEmail({

            sender: {

                email: "mm.giftboxes04@gmail.com",
                name: "Moments & Memories"

            },

            to: [

                {
                    email: "mm.giftboxes04@gmail.com"
                }

            ],

            subject: `💖 New Order From ${name}`,

            htmlContent: `

            <div style="font-family:Poppins;padding:20px;background:#fff4f7;border-radius:10px;">

            <h2 style="color:#c95b84;">
            New Order Received 💖
            </h2>

            <hr>

            <p><strong>Product:</strong> ${product}</p>

            <p><strong>Price:</strong> ${price}</p>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Address:</strong> ${address}</p>

            <p><strong>Gift Message:</strong> ${message}</p>

            </div>

            `

        });

        res.json({

            success: true,
            message: "Order placed successfully 💖"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

});

// ======================
// GET ALL ORDERS
// ======================

app.get("/api/orders", (req, res) => {

    res.json(orders);

});

// ======================
// DASHBOARD STATS
// ======================

app.get("/api/stats", (req, res) => {

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        order => order.status === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        order => order.status === "Delivered"
    ).length;

    const totalCustomers = new Set(
        orders.map(order => order.email)
    ).size;

    res.json({

        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalCustomers

    });

});

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});

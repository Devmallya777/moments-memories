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
// CUSTOMER CONFIRMATION EMAIL
// ======================

await tranEmailApi.sendTransacEmail({

    sender: {

        email: "mm.giftboxes04@gmail.com",
        name: "Moments & Memories 💖"

    },

    to: [

        {
            email: email,
            name: name
        }

    ],

    subject: "💖 Your support means the world to us! Your order is confirmed and helps our small team keep doing what we love.",

    htmlContent: `

    <div style="
        font-family:Poppins;
        background:#fff4f8;
        padding:40px;
        border-radius:20px;
        color:#5a1248;
    ">

        <h1 style="
            color:#c21870;
            text-align:center;
        ">
            Thank You For Your Order 💖
        </h1>

        <p style="
            font-size:18px;
            line-height:1.8;
        ">
            Hi <strong>${name}</strong>,
            <br><br>

            Your order has been received successfully ✨

            We are now preparing your customized gift box with love 💕

        </p>

        <div style="
            background:white;
            padding:25px;
            border-radius:15px;
            margin-top:25px;
        ">

            <h2 style="color:#b02677;">
                Order Summary 🛒
            </h2>

            <p><strong>Products:</strong><br>${product}</p>

            <p><strong>Total Price:</strong> ${price}</p>

            <p><strong>Delivery Address:</strong><br>${address}</p>

        </div>

        <p style="
            margin-top:30px;
            font-size:16px;
            line-height:1.7;
        ">

            We will contact you soon regarding delivery 💌

            <br><br>

            Thank you for choosing
            <strong>Moments & Memories</strong> ✨

        </p>

        <div style="
            margin-top:40px;
            text-align:center;
        ">

            <a href="https://instagram.com/_mm.giftboxes__"
            style="
                display:inline-block;
                padding:14px 30px;
                background:#ff4fa3;
                color:white;
                text-decoration:none;
                border-radius:50px;
                font-weight:bold;
            ">
                Visit Instagram 💖
            </a>

        </div>

    </div>

    `

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

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


// ================= MONGODB CONNECTION =================

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log(err);
});


// ================= MODELS =================

const User = require("./models/User");
const Product = require("./models/Product");
const Contact = require("./models/Contact");
const Order = require("./models/Order");


// ================= HOME ROUTE =================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});


// ================= CONTACT FORM =================

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        console.log(req.body);

        // SAVE TO DATABASE

        const newContact = new Contact({

            name,
            email,
            message

        });

        await newContact.save();


        // SEND EMAIL USING BREVO

        await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {

                sender: {

                    name: "Moments & Memories",
                    email: "mm.giftboxes04@gmail.com"

                },

                to: [

                    {
                        email: "mm.giftboxes04@gmail.com"
                    }

                ],

                subject: `New Message From ${name}`,

                htmlContent: `

                    <div style="font-family:Poppins,sans-serif;padding:20px;">

                        <h2 style="color:#ff4f93;">
                            New Contact Message ❤️
                        </h2>

                        <p>
                            <strong>Name:</strong> ${name}
                        </p>

                        <p>
                            <strong>Email:</strong> ${email}
                        </p>

                        <p>
                            <strong>Message:</strong>
                        </p>

                        <p>
                            ${message}
                        </p>

                    </div>

                `

            },

            {

                headers: {

                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"

                }

            }

        );

        res.json({

            success: true,
            message: "Message Sent Successfully"

        });

    }

    catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({

            success: false,
            message: "Failed To Send Email"

        });

    }

});


// ================= GET CONTACTS =================

app.get("/api/contacts", async (req, res) => {

    try {

        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json(contacts);

    }

    catch (error) {

        res.status(500).json({

            message: "Error fetching contacts"

        });

    }

});


// ================= PRODUCTS API =================

app.get("/api/products", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            message: "Error fetching products"

        });

    }

});


// ================= ADD PRODUCT =================

app.post("/api/products", async (req, res) => {

    try {

        const {

            name,
            price,
            image,
            description

        } = req.body;

        const newProduct = new Product({

            name,
            price,
            image,
            description

        });

        await newProduct.save();

        res.json({

            success: true,
            message: "Product Added"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: "Failed To Add Product"

        });

    }

});


// ================= ADMIN LOGIN =================

app.post("/api/admin", (req, res) => {

    const { password } = req.body;

    if(password === "admin123"){

        res.json({

            success: true

        });

    }

    else {

        res.json({

            success: false

        });

    }

});


// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
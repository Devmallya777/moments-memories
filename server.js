const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: String,

    price: String,

    image: String,

    description: String

});

module.exports = mongoose.model("Product", productSchema);

const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// CONTACT FORM
app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        await Contact.create({
            name,
            email,
            message
        });

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

                subject: `Moments & Memories Website Inquiry`,

                htmlContent: `

                    <h2>New Contact Message</h2>

                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong> ${message}</p>

                `,

                textContent: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
                `
            },

            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                }
            }
        );

        res.json({
            success: true
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false
        });
    }
});


// GET CONTACT MESSAGES
app.get("/api/messages", async (req, res) => {

    try {

        const messages = await Contact.find().sort({ createdAt: -1 });

        res.json(messages);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// PRODUCTS API
app.get("/api/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);
});


// ADMIN LOGIN
app.post("/api/admin", (req, res) => {

    const { password } = req.body;

    if(password === "admin123"){

        res.json({
            success: true
        });

    } else {

        res.json({
            success: false
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
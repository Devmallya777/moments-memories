const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const Product = require("./models/Product");
const Contact = require("./models/Contact");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post("/api/products", async (req, res) => {

    const { title, price, image, description } = req.body;

    const product = new Product({
        title,
        price,
        image,
        description
    });

    await product.save();

    res.json({ success: true });
});

app.post("/api/contact", async (req, res) => {

    const { name, email, message } = req.body;

    const contact = new Contact({
        name,
        email,
        message
    });

    await contact.save();

    res.json({
        success: true,
        message: "Message Saved"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
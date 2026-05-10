// ===============================
// MOMENTS & MEMORIES SERVER
// ===============================

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

// ===============================
// MODELS
// ===============================

const Product = require("./models/Product");
const User = require("./models/user");
const Contact = require("./models/Contact");
const Order = require("./models/Order");

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// PRODUCTS API
// ===============================

// GET PRODUCTS

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Products",
    });
  }
});

// ADD PRODUCT

app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product Added Successfully ✅",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Adding Product",
    });
  }
});

// DELETE PRODUCT

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete Failed",
    });
  }
});

// ===============================
// CONTACT API
// ===============================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Message Sent Successfully ❤️",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Sending Message",
    });
  }
});

// GET CONTACTS

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Contacts",
    });
  }
});

// ===============================
// ORDERS API
// ===============================

// PLACE ORDER

app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, productName, amount } = req.body;

    const newOrder = new Order({
      customerName,
      productName,
      amount,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order Placed Successfully 🎉",
    });
  } catch (error) {
    res.status(500).json({
      message: "Order Failed",
    });
  }
});

// GET ORDERS

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Orders",
    });
  }
});

// ===============================
// USER API
// ===============================

// REGISTER USER

app.post("/api/register", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const newUser = new User({
      email,
      otp,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
    });
  }
});

// GET USERS

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Users",
    });
  }
});

// ===============================
// ADMIN DASHBOARD API
// ===============================

app.get("/api/dashboard", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalContacts = await Contact.countDocuments();

    const totalUsers = await User.countDocuments();

    res.json({
      totalProducts,
      totalOrders,
      totalContacts,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Dashboard Error",
    });
  }
});

// ===============================
// PAGE ROUTES
// ===============================

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-dashboard.html"));
});

// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} 🚀`);
});
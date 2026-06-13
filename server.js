require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const app = express();
const mongoose = require("mongoose");
const Inventory = require("./models/inventory");
const Order = require("./models/Order");
let onlineUsers = {};
let activityLog = [];

// ======================
// MIDDLEWARE
// ======================

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("MongoDB Connected ✅"); })
    .catch((err) => {
        console.error("Mongo Error:");
        console.error(err.message);
        console.error(err);
    });

// ======================
// BREVO CONFIG
// ======================

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ======================
// MULTER STORAGE
// ======================

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/"); },
    filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname); }
});

const upload = multer({ storage });

// ======================
// HOME PAGE
// ======================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ======================
// PLACE ORDER
// ======================

app.post("/api/Order", upload.array("images", 10), async (req, res) => {
    try {
        const { product, price, name, email, phone, address, message } = req.body;

        // ✅ STEP 1: Save order first — always happens regardless of email
        await Order.create({
            customerName: name,
            email: email,
            phone: phone,
            address: address,
            products: product,
            total: parseInt(String(price).replace(/[^\d]/g, "")) || 0,
            status: "Pending",
            assignedTo: "",
            paymentMethod: "",
            paymentStatus: "Pending",
            createdAt: new Date()
        });

        console.log("✅ Order saved to DB");

        // ✅ STEP 2: Send emails in a SEPARATE try/catch
        // A Brevo failure will NOT cause the order to fail
        try {

            // Admin email
            await tranEmailApi.sendTransacEmail({
                sender: { email: "mm.giftboxes04@gmail.com", name: "Moments & Memories" },
                to: [{ email: "mm.giftboxes04@gmail.com" }],
                subject: `💖 New Order From ${name}`,
                attachment: req.files?.map(file => ({
                    content: fs.readFileSync(path.join(__dirname, file.path)).toString("base64"),
                    name: file.originalname
                })) || [],
                htmlContent: `
                    <div style="font-family:Poppins;padding:20px;background:#fff4f7;border-radius:10px;">
                        <h2 style="color:#c95b84;">New Order Received 💖</h2>
                        <hr>
                        <p><strong>Product:</strong> ${product}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Address:</strong> ${address}</p>
                        <p><strong>Gift Message:</strong> ${message}</p>
                    </div>`
            });

            console.log("✅ Admin email sent");

            // Customer email
            await tranEmailApi.sendTransacEmail({
                sender: { email: "mm.giftboxes04@gmail.com", name: "Moments & Memories 💖" },
                to: [{ email: email, name: name }],
                subject: "💖 Your order is confirmed!",
                htmlContent: `
                    <div style="font-family:Poppins;background:#fff4f8;padding:40px;border-radius:20px;color:#5a1248;">
                        <h1 style="color:#c21870;text-align:center;">Thank You For Your Order 💖</h1>
                        <p style="font-size:18px;line-height:1.8;">
                            Hi <strong>${name}</strong>,<br><br>
                            Your order has been received successfully ✨
                            We are now preparing your customized gift box with love 💕
                        </p>
                    </div>`
            });

            console.log("✅ Customer email sent");

        } catch (emailErr) {
            // Email failed but order is already saved — just log it
            console.error("❌ Email sending failed:", emailErr.message);
        }

        res.json({ success: true, message: "Order placed successfully 💖" });

    } catch (error) {
        console.error("❌ Order failed:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

// ======================
// GET ALL ORDERS
// ======================

app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ======================
// DASHBOARD STATS
// ======================

app.get("/api/stats", async (req, res) => {
    try {

        const orders = await Order.find();

        const totalOrders = orders.length;

        const pendingOrders =
            orders.filter(
                o => o.status === "Pending"
            ).length;

        const deliveredOrders =
            orders.filter(
                o => o.status === "Delivered"
            ).length;

        const assignedOrders =
            orders.filter(
                o => o.status === "Assigned"
            ).length;

        const totalCustomers =
            new Set(
                orders.map(
                    o => o.email
                )
            ).size;

        const totalRevenue =
            orders
                .filter(
                    o => o.status === "Delivered"
                )
                .reduce(
                    (sum, order) =>
                        sum + (order.total || 0),
                    0
                );

        res.json({
            totalOrders,
            pendingOrders,
            deliveredOrders,
            assignedOrders,
            totalCustomers,
            totalRevenue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});
// ======================
// FINANCE STATS
// ======================

app.get("/api/finance", async (req, res) => {
    try {

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + (order.total || 0),
            0
        );

        const deliveredRevenue = orders
            .filter(order => order.status === "Delivered")
            .reduce(
                (sum, order) => sum + (order.total || 0),
                0
            );

        const pendingRevenue = orders
            .filter(order => order.status !== "Delivered")
            .reduce(
                (sum, order) => sum + (order.total || 0),
                0
            );

        res.json({
            totalRevenue,
            deliveredRevenue,
            pendingRevenue,
            totalOrders: orders.length
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// ======================
// INVENTORY
// ======================

app.get("/api/inventory", async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post("/api/inventory", async (req, res) => {
    const { itemName, stock, unitCost, lowStockAlert } = req.body;
    const item = await Inventory.create({ itemName, stock, unitCost, lowStockAlert });
    res.json(item);
});

app.put("/api/inventory/:id", async (req, res) => {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
});

app.delete("/api/inventory/:id", async (req, res) => {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// ======================
// UPDATE ORDER
// ======================

app.put("/api/order/:id", async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(order);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ======================
// DELETE ORDER
// ======================

app.delete("/api/order/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ======================
// SERVER
// ======================

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});


app.post("/api/heartbeat", (req, res) => {
    const { name } = req.body;

    if (!name) return res.json({ success: false });

    onlineUsers[name] = Date.now();

    res.json({ success: true });
});


app.get("/api/online-users", (req, res) => {
    const now = Date.now();

    const online = Object.keys(onlineUsers).filter(name => {
        return now - onlineUsers[name] < 15000;
    });

    res.json(online);
});


app.post("/api/log", (req, res) => {
    const { user, action } = req.body;

    activityLog.unshift({
        user,
        action,
        time: new Date().toLocaleString()
    });

    activityLog = activityLog.slice(0, 50);

    res.json({ success: true });
});


app.get("/api/activity-log", (req, res) => {
    res.json(activityLog);
});



setInterval(() => {
    const now = Date.now();

    for (let user in onlineUsers) {
        if (now - onlineUsers[user] > 15000) {
            delete onlineUsers[user];
        }
    }
}, 10000);

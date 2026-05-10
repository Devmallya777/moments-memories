require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// ===============================
// GMAIL TRANSPORTER
// ===============================
const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});
// ===============================
// CONTACT API
// ===============================

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: `New Contact From ${name}`,

            html: `
                <h2>New Contact Message</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>
            `
        });

        res.json({
            success: true,
            message: "Email Sent Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed To Send Email"
        });
    }
});


// ===============================
// ADMIN LOGIN
// ===============================

app.post("/api/admin", (req, res) => {

    const { password } = req.body;

    if (password === "admin123") {

        res.json({
            success: true
        });

    } else {

        res.json({
            success: false
        });
    }
});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const nodemailer = require("nodemailer");

const path = require("path");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

/* HOME ROUTE */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});

/* CONTACT API */

app.post("/api/contact", async (req, res) => {

    try{

        const nodemailer =
            require("nodemailer");

        const {
            name,
            email,
            message
        } = req.body;

        const transporter =
            nodemailer.createTransport({

            service:"gmail",

            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }

        });

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:"mm.giftboxes04@gmail.com",

            subject:`New Contact From ${name}`,

            text:`

                Name: ${name}

                Email: ${email}

                Message: ${message}

            `

        });

        res.json({
            success:true
        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

});
/* ADMIN LOGIN */

app.post("/api/admin", (req, res) => {

    const { password } = req.body;

    if (password === "admin123") {

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

/* DASHBOARD DATA */

app.get("/api/dashboard", (req, res) => {

    res.json({

        orders: 124,

        messages: 38,

        products: 12,

        revenue: "48K"

    });

});

/* START SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
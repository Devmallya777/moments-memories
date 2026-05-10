require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =========================
   NODEMAILER TRANSPORTER
========================= */

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* =========================
   CONTACT API
========================= */

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        console.log(req.body);

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "devmallyachakraborty456@gmail.com",

            subject: `New Contact From ${name}`,

            html: `

                <div style="font-family:Poppins,sans-serif;padding:20px;">

                    <h2 style="color:#ff4f93;">
                        New Website Message ❤️
                    </h2>

                    <p>
                        <b>Name:</b> ${name}
                    </p>

                    <p>
                        <b>Email:</b> ${email}
                    </p>

                    <p>
                        <b>Message:</b>
                    </p>

                    <p>
                        ${message}
                    </p>

                </div>

            `

        });

        res.json({

            success: true

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: "Failed to send email"

        });

    }

});

/* =========================
   ADMIN LOGIN
========================= */

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

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
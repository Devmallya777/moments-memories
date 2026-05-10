const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({

            service: 'gmail',

            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }

        });

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.EMAIL,

            subject: 'New Contact Message - Moments & Memories',

            html: `

                <div style="font-family:Poppins,sans-serif;padding:20px;">
                
                    <h2 style="color:#ff4f93;">
                        New Contact Message
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

                    <div style="
                        background:#f7f7f7;
                        padding:15px;
                        border-radius:10px;
                        margin-top:10px;
                    ">
                        ${message}
                    </div>

                </div>

            `

        });

        res.status(200).json({
            success: true,
            message: 'Message Sent Successfully'
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed To Send Message'
        });

    }

});

module.exports = router;
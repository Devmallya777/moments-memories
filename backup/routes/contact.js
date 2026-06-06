const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

/* STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/* MULTIPLE FILES */
const cpUpload = upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 }
]);

router.post("/", cpUpload, async(req,res)=>{

    try{

        const { name, email, phone, message } = req.body;

        /* EMAIL TRANSPORT */
        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth:{
                user:"YOUR_EMAIL@gmail.com",
                pass:"YOUR_APP_PASSWORD"
            }
        });

        /* ATTACHMENTS */
        let attachments = [];

        if(req.files.images){
            req.files.images.forEach(file=>{
                attachments.push({
                    filename:file.originalname,
                    path:file.path
                });
            });
        }

        if(req.files.video){
            attachments.push({
                filename:req.files.video[0].originalname,
                path:req.files.video[0].path
            });
        }

        /* SEND EMAIL */
        await transporter.sendMail({

            from: email,

            to: "YOUR_EMAIL@gmail.com",

            subject: "New Gift Order",

            html: `
                <h2>New Order Received</h2>

                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Message:</b> ${message}</p>
            `,

            attachments: attachments
        });

        res.send("Order Sent Successfully ✨");

    }

    catch(err){
        console.log(err);
        res.send("Something went wrong");
    }
});

module.exports = router;
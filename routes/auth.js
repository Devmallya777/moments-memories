const express = require('express');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/send-otp', async (req, res) => {

    const { email } = req.body;

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ email, otp });
    } else {
        user.otp = otp;
    }

    await user.save();

    const transporter = nodemailer.createTransport({

        service: 'gmail',

        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }

    });

    await transporter.sendMail({

        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}`

    });

    res.json({
        success: true,
        message: 'OTP Sent'
    });

});

router.post('/verify-otp', async (req, res) => {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {

        return res.status(400).json({
            success: false,
            message: 'Invalid OTP'
        });
    }

    const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        success: true,
        token
    });

});

module.exports = router;

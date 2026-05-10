const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

router.post('/', async (req, res) => {

    try {

        const contact = new Contact(req.body);

        await contact.save();

        res.json({
            success: true,
            message: 'Message Saved'
        });

    } catch (err) {

        res.status(500).json(err);
    }

});

module.exports = router;
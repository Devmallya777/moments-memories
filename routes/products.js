const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.json({
            success: true,
            product
        });

    } catch (err) {

        res.status(500).json(err);
    }

});

router.get('/', async (req, res) => {

    const products = await Product.find();

    res.json(products);

});

module.exports = router;
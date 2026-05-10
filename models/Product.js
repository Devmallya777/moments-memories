const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: String,

    price: Number,

    description: String,

    image: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', ProductSchema);
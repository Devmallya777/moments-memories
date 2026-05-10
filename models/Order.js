const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: String,

    email: String,

    products: Array,

    total: Number

});

module.exports = mongoose.model("Order", orderSchema);
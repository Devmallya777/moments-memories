const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    products: {
        type: String,
        default: ""
    },

    total: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "Pending"
    },

    assignedTo: {
        type: String,
        default: ""
    },

    paymentMethod: {
        type: String,
        default: ""
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    },

    deliveryOtp: {
        type: String,
        default: ""
    },

    proofImage: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Order",
    orderSchema
);
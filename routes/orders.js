const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName:String,

    email:String,

    phone:String,

    address:String,

    products:String,

    total:Number,

    status:{
        type:String,
        default:"Pending"
    },

    assignedTo:{
        type:String,
        default:""
    },

    paymentMethod:{
        type:String,
        default:""
    },

    paymentStatus:{
        type:String,
        default:"Pending"
    },

    deliveryOtp:String,

    proofImage:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "Order",
    orderSchema
);
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({

    itemName:{
        type:String,
        required:true
    },

    stock:{
        type:Number,
        default:0
    },

    unitCost:{
        type:Number,
        default:0
    },

    lowStockAlert:{
        type:Number,
        default:5
    },

    updatedAt:{
        type:Date,
        default:Date.now
    }

});
module.exports =
mongoose.model(
    "Inventory",
    inventorySchema
);
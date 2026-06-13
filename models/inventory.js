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
router.put("/:id", async (req, res) => {
  try {
    const updatedItem =
      await Inventory.findByIdAndUpdate(
        req.params.id,
        {
          itemName: req.body.itemName,
          stock: req.body.stock,
          unitCost: req.body.unitCost,
          lowStockAlert:
            req.body.lowStockAlert,
          updatedAt: Date.now(),
        },
        { new: true }
      );

    res.json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports =
mongoose.model(
    "Inventory",
    inventorySchema
);
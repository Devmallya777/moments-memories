const express = require("express");
const router = express.Router();

const Inventory = require("../models/inventory");

// ========================
// GET ALL ITEMS
// ========================

router.get("/", async (req, res) => {

    try {

        const items =
        await Inventory.find()
        .sort({updatedAt:-1});

        res.json(items);

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});

// ========================
// ADD ITEM
// ========================

router.post("/", async (req, res) => {

    try {

        const newItem =
        new Inventory({

            itemName:req.body.itemName,

            stock:req.body.stock,

            unitCost:req.body.unitCost

        });

        await newItem.save();

        res.json({
            success:true,
            message:"Item Added"
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});

// ========================
// DELETE ITEM
// ========================

router.delete("/:id", async(req,res)=>{

    try{

        await Inventory.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success:true,
            message:"Item Deleted"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});
// ========================
// UPDATE ITEM
// ========================

router.put("/:id", async (req, res) => {
  try {
    const updatedItem =
      await Inventory.findByIdAndUpdate(
        req.params.id,
        {
          itemName: req.body.itemName,
          stock: req.body.stock,
          unitCost: req.body.unitCost,
        },
        { new: true }
      );

    res.json({
      success: true,
      message: "Item Updated",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
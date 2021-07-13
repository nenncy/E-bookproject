var mongoose = require('mongoose');
var Unit = require('../models/unit.model');
var express = require('express');
var router = express.Router();


router.post('/units', async (req,res)=>{
    try{
        const unit=new Unit ({
            unitname :req.body.unitname,
            chapterunit :req.body.chapterunit,
            unitid:req.body.unitid,
            partname:req.body.partname,
            parentpartid:req.body.parentpartid
        });
           await unit.save();


    res.status(200).json({success:true, unit: unit })

    }catch (err) {
      res.status(400).json({success: false, message:err.message})
   }
 
});

router.get('/units', async (req, res) => {
    try {
        const unit = await Unit.find({});
        res.status(200).json({
            success: true,
            unit
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
})

module.exports=router;
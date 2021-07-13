var mongoose = require('mongoose');
var Part = require('../models/part.model');
var express = require('express');
var router = express.Router();


router.post("/parts", async (req, res) => {

    try {
        const part = new Part({
            partname: req.body.partname,
            childunit: req.body.childunit,
            partid: req.body.partid

        })
        await part.save();
        res.status(201).json({
            success: true,
            data: part
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }


})

router.get('/parts', async (req, res) => {
    try {
        const data = await Part.find({});
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;
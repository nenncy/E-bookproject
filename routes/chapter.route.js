
var express = require('express');
var router = express.Router();
var File=require('../models/chapter.model');
const multer = require("multer");


//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });


  // Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  //Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

router.post("/uploadFile",upload.single("myFile"), async (req, res) => {
     // Stuff to be added later
     console.log(JSON.stringify(req.body));
     
    try {
      const part = await File.create({
        name:req.file.path,
        chname:req.body.chname,
        chid:req.body.chid,
        pagenumber:req.body.pagenumber,
        parentunitid:req.body.parentunitid,
        parentpartid:req.body.parentpartid

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



  });

  router.get('/chapters', async (req, res) => {
    try {
        const data = await File.find({});
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

module.exports=router;
var mongoose = require('mongoose');
var Schema=mongoose.Schema;

const UnitSchema =new mongoose.Schema({
    unitname:{type:String},
    unitid:{type:String},
    chapterunit:{type:Number},
    partname:{type:String},
    parentpartid: {
        type: String
     }
    
});

var Unit= mongoose.model('unit',UnitSchema);

module.exports=Unit;
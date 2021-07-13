var mongoose = require('mongoose');
var Schema=mongoose.Schema;

const partSchema  =new mongoose.Schema({
    partname: { type: String },
    childunit:{type:Number },
    partid:{type: String }
    
  
});

var Part = mongoose.model('part',partSchema);

module.exports=Part;
const { string } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewschema=new Schema({
    comment:{
        require:true,
        type:String,
    },
    rating:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
       type:Schema.Types.ObjectId,
       ref:"User"
    }
});

const Reviews=mongoose.model("reviews",reviewschema);
module.exports=Reviews;
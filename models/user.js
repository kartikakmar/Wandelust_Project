const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportlocalmongoose= require("passport-local-mongoose");
const { schema } = require("./Rivew");
const { string } = require("joi");

const User=new Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    mobilenumber:{
       type:Number,
       require:true
    },
    username:{
      type:String,
      require:true,
    },
    
});

User.plugin(passportlocalmongoose);
const Userschema=mongoose.model('User',User);
module.exports=Userschema;
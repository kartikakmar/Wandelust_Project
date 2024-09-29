const mongoose=require("mongoose");
const Reviews = require("./Rivew");
const User= require("./user")
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    image:{
       url:String,
       filename:String,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
       {
        type:Schema.Types.ObjectId,
         ref:"reviews"
       }
    ],
    owner: 
        {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
   
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
   await Reviews.deleteMany({_id:{$in:listing.reviews}})
}
})

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;




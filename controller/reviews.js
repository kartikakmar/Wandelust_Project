const Listing=require("../models/listing.js");
const Reviews=require("../models/Rivew.js");

module.exports.createReviews=async (req,res)=>{
    let {rating,content}=req.body;
    let {id}=req.params;
    let listing = await Listing.findById(id);
    let Newreviews=new Reviews({
      rating:rating,
      comment:content,
    });
    Newreviews.author=req.user._id;
    listing.reviews.push(Newreviews);
   await Newreviews.save();
   await listing.save();
    res.redirect(`/listing/${id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await Reviews.deleteOne({_id:reviewid});
   res.redirect(`/listing/${id}`);
   
}
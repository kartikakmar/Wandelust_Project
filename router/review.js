const express=require("express");
const router=express.Router({mergeParams :true});
const app=express();
const Listing=require("../models/listing.js");
const Reviews=require("../models/Rivew.js");
const {validateReview, isLoggedIn,isReviewsAuthor}=require("../middleware.js")
const ReviewController=require("../controller/reviews.js")


//create reviews
router.post("/",isLoggedIn,validateReview, asyncronus(ReviewController.createReviews));
 
 router.delete("/:reviewid/delete",isLoggedIn,isReviewsAuthor,asyncronus(ReviewController.deleteReview));
 


 function asyncronus(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
 } 

 router.use((err, req,res, next)=>{
     let {status=500,message="some Error"}=err;
     res.status(status).render("Error.ejs",{message}); 
 });

 module.exports=router

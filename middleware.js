const Listing=require("./models/listing.js");
const ExpressError=require("./ExpressError/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {ReviewSchema}=require("./schema.js");
const Reviews = require("./models/Rivew.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to creactt listing");
       return res.redirect("/userlogin");
    }
    next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwnner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","Your are not a owner of thie listing!");
        return  res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);

    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=ReviewSchema.validate(req.body);

    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}


module.exports.isReviewsAuthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Reviews.findById(reviewid);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","Your are not a author of thie Reviews!");
        return  res.redirect(`/listing/${id}`);
    }
    next();
}


const express=require("express");
const app=express();

const {isLoggedIn}=require("../middleware.js");
const {isOwnner}=require("../middleware.js");
const {validatelisting}=require("../middleware.js")
const listingContoller=require("../controller/listings.js")

const router= express.Router();
  // Joi Schema validation    npm i Joi
const Listing=require("../models/listing.js");
const { route } = require("./user.js");

const multer  = require('multer')

const {storage}=require("../cloudConfig.js")
const upload = multer({storage})

//Home Router

router.get("/home",(req,res)=>{
    res.render("Home.ejs")
});


//index router
router.get("/", asyncronus(listingContoller.index))

//show router
router.get("/:id",asyncronus(listingContoller.shwolisting));

//new router
router.get("/new/render",isLoggedIn, asyncronus(listingContoller.rendernew));

//Create router
router.post("/createnew/add",upload.single('image'),validatelisting,asyncronus(listingContoller.createlisting));

//udate render
router.get("/update/:id", isLoggedIn, isOwnner, asyncronus(listingContoller.updaterender));

//update rouder
router.patch("/:id/editadd",isOwnner,upload.single('image'),validatelisting,asyncronus(listingContoller.updatelisting));

//delete router
router.delete("/:id/delete", isLoggedIn, isOwnner, asyncronus( listingContoller.deletelisting));


function asyncronus(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
} 

router.use((err, req,res, next)=>{
        let {status=500,message="some Error"}=err;
       res.status(status).render("Error.ejs",{message}); 
    });

module.exports=router;
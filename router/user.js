const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const ExpressError=require("../ExpressError/ExpressError.js");
const passport=require("passport");
const { render } = require("ejs");
const { saveRedirectUrl } = require("../middleware.js");
const userContoller=require("../controller/users.js")

//render sinup form
router.get("/usersinup",userContoller.rendersiup);

//usersinup
router.post("/sineup",asyncronus(userContoller.sinup));

//reneder login form
router.get("/userlogin",userContoller.renderlogin);

router.get("/message",(req,res)=>{
    let message="pssword or username is incorrect";
    res.render("sineupmessage.ejs", {message})
})

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/message",
        failureFlash:true
}), userContoller.login)

router.get("/logout",userContoller.logout);

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
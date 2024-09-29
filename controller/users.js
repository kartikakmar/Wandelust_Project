const User=require("../models/user.js");

module.exports.rendersiup=(req,res)=>{
    res.render("sineup.ejs");
}

module.exports.sinup=async (req,res)=>{
    try{
     let {firstname,lastname,number,username,password}=req.body;
     let newuser=new User({firstname,lastname,number,username});
     const registeruser= await User.register(newuser,password);
     req.login(registeruser,(err)=>{
         if(err){
             return next(err);
         }
         req.flash("success"," welcome to wonderlust");
         res.redirect("/listing");
     });
    }catch(e){
     let message=e.message;
     res.render("sineupmessage.ejs",{message});
    }
}

module.exports.renderlogin=(req,res)=>{
    res.render('Login.ejs');
}

module.exports.login=   async (req,res)=>{
    req.flash("success","Welcom back to wonderlust!");
    let redirectUrl=res.locals.redirectUrl
    console.log(redirectUrl)
    if(!redirectUrl){
        res.redirect("/listing");
    }else{
        res.redirect(redirectUrl)
    } 
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success"," Your are Logout Successfull");
        res.redirect("/listing");
    });
}
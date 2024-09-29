if(process.env.NODE_ENV != "production")
require('dotenv').config() 

const express=require("express");
const app=express();
let port=8080;

const engine = require('ejs-mate');
app.engine('ejs', engine);
const path = require('path');
const methodOverride = require('method-override');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const passport =require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const DbUrl=process.env.ATLASTDB_URL;

const ExpressError=require("./ExpressError/ExpressError.js");

var flash = require('connect-flash');
app.use(flash());

var session = require('express-session');
const MongoStore = require('connect-mongo');

const store=MongoStore.create({
    mongoUrl:DbUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
    
})

store.on("error",()=>{
    console.log("Error in MOngoosh session store", )
})

const sessinpotino={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:1000*60*60*24*3,
        httpOnly:true
      
    },
   
   
}

app.use(session(sessinpotino));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const mongoose=require("mongoose");

const { pid } = require("process");
const { resolve } = require("dns");
const { link } = require("joi");
const { runInNewContext } = require("vm");


main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(DbUrl);
}


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
});

app.get("/demouser",async (req,res)=>{
    let fakeuser=new User({
        firstname:"kartik",
        lastname:"akmar",
        username:"roshan",
        mobilenumber:34564544322,
        
    });

    let registeruser= await User.register(fakeuser,"hellow");
    res.send(registeruser);

})


const listings=require("./router/listing.js");
app.use("/listing", listings)

const review=require("./router/review.js");
const { register } = require("module");
app.use("/listing/:id/reviews", review)

const usersinup=require("./router/user.js");
app.use("/",usersinup);



app.use((err, req,res, next)=>{
    let {status=500,message="some Error"}=err;
   res.status(status).render("Error.ejs",{message}); 
});


app.listen(port,()=>{
    console.log("server working");
})
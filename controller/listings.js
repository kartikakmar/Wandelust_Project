const Listing=require("../models/listing.js");

module.exports.index=async (req,res,next)=>{
    let datas= await Listing.find();
    res.render("index.ejs",{datas});
}

module.exports.rendernew=(req,res)=>{
    res.render("New.ejs");
}

module.exports.shwolisting=async(req,res)=>{ 
    let {id}=req.params;
    let data= await Listing.findById(id).
    populate({
        path:"reviews",
        populate:{path:"author",

        },
    })
    .populate("owner");
   
    if(data==[]){
        req.flash("error"," Listing your requsted  for does not Exit!");
        res.redirect("/listing");  
    }else{
        res.render("show.ejs",{ data}); 
    }
  
      
}

module.exports.createlisting= async(req,res)=>{ 
    let url=req.file.path;
    let filename=req.file.filename;
    let {title,discription,price,location,country}=req.body;
    let data= new Listing({
    title:title,
    description:discription,
    image:{url,filename},
    price:price,
    location:location,
    country:country
    }); 
    data.owner=req.user._id;
    await data.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listing");
}

module.exports.updaterender=async (req,res)=>{
   
    let {id}=req.params;
    let data=await Listing.findById(id);
    res.render("update.ejs",{data});
}

module.exports.updatelisting=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let {title,discription,price,location,country}=req.body;
    let {id}=req.params;
    console.log(req.body.title);
    let listingse=await Listing.findByIdAndUpdate(id,{
    title:title,
    description:discription,
    image:{url,filename},
    price:price,
    location:location,
    country:country
    },{new:true});
    req.flash("success","Update Successfull !");
    res.redirect(`/listing/${id}`);
}

module.exports.deletelisting=async(req,res,next)=>{   
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success"," Listing Deleted !");
    res.redirect("/listing"); 
}
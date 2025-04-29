const Listing=require("../models/listing.js");

module.exports.index=async (req,res,next)=>{
    let datas= await Listing.find();
    res.render("index.ejs",{datas});
}

module.exports.rendernew=(req,res)=>{
    res.render("New.ejs");
}

module.exports.createlisting = async (req, res, next) => {
    try {
        let url = req.file ? req.file.path : "";  
        let filename = req.file ? req.file.filename : "";
        let { title, discription, price, location, country } = req.body;

        let data = new Listing({
            title,
            description: discription,
            image: { url, filename },
            price,
            location,
            country,
            owner: req.user._id
        });

        await data.save();
        req.flash("success", "New Listing Created!");
        return res.redirect("/listing");  
    } catch (err) {
        return next(err);
    }
};


module.exports.shwolisting=async(req,res)=>{ 
    let {id}=req.params;
    let data= await Listing.findById(id).
    populate({
        path:"reviews",
        populate:{path:"author",

        },
    })
    .populate("owner");
  
    if (!data) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listing"); 
    }
    res.render("show.ejs", { data });
      
}


module.exports.updaterender=async (req,res)=>{
   
    let {id}=req.params;
    let data=await Listing.findById(id);
    res.render("update.ejs",{data});
}


module.exports.updatelisting = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { title, discription, price, location, country } = req.body;

        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listing");
        }

        listing.title = title;
        listing.description = discription;
        listing.price = price;
        listing.location = location;
        listing.country = country;

        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await listing.save();

        req.flash("success", "Update Successful!");
        return res.redirect(`/listing/${id}`);
    } catch (err) {
        return next(err);
    }
};


module.exports.deletelisting=async(req,res,next)=>{   
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success"," Listing Deleted !");
    res.redirect("/listing"); 
}
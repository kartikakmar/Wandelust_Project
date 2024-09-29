const Joi = require('joi');

module.exports.listingSchema=Joi.object({
        title:Joi.string().required(),
        discription:Joi.string().required(),
        location:Joi.string().required() ,
        price:Joi.number().required(),
        image:Joi.string(),
        country:Joi.string().required(),
}).required();


module.exports.ReviewSchema=Joi.object({
        rating:Joi.string().required().min(1).max(5),
        content:Joi.string().required(),
}).required();
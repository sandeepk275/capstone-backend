
const Joi=require('joi');

const validateAddress=function (address) {
    const schema =Joi.object( {
        name: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        state: Joi.string().min(3).required(),
        street: Joi.string().min(3).required(),
        contactNumber: Joi.number().min(10).required(),
        landmark: Joi.string().min(3).optional(),
        zipCode: Joi.number().min(100000).max(999999).required().error(() => {
            return {
                message: "Invalid zip code!",
            };
        })
    });
    return schema.validate(address); 
}

exports.validateAdd = validateAddress;
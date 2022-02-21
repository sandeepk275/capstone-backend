const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
function validateOrder(order) {
    const schema = Joi.object({
        addressId: Joi.objectId().required(), // client should not set dateOut,dateReturned  ,
        productId: Joi.objectId().required(),
        quantity: Joi.number().min(1).required()
    });
    return schema.validate(order);  
}

exports.validateOrder = validateOrder;
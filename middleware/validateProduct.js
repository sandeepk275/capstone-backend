const Joi = require('joi');
function validateProduct(product) {
    const schema = Joi.object( {
        name: Joi.string().min(3).required(),
        availableItems: Joi.number().positive().required(),
        price: Joi.number().positive().required(),
        category: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        imageURL: Joi.string().min(3).required(),
        manufacturer: Joi.string().min(3).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    });
    return schema.validate(product);  // change the type
}

function validateProductGet(product) {
    const schema = Joi.object( {
        name: Joi.string().default(""),
        category: Joi.string().default(""),
        direction: Joi.any().valid('ASC', 'DESC').default('DESC'),
        sortBy: Joi.string().default('productId'),
    });
    return schema.validate(product);  // change the type..
}


exports.validateProduct = validateProduct;
exports.validateProductGet = validateProductGet;
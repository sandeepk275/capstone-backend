
const Joi = require('joi');

const validateUser = function (user) {

    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().regex(/^(([a-zA-Z0-9 _ - .]{1,255})+)@(([a-zA-Z0-9]{1,255})+).([a-z]{2,6})$/)
            .required().email().error(() => {
                return {
                    message: 'Invalid email-id format!',
                };
            }),
        contactNumber: Joi.number().min(1000000000).max(9999999999).required().error(() => {
            return {
                message: 'Invalid contact number!',
            };
        })
    });


    return schema.validate(user);


}
exports.validateUser = validateUser;
const validator = require('validator');

module.exports = (mongoose) => {
    const user = mongoose.model('user',
        mongoose.Schema({
            firstName: { type: String, required: true, },
            lastName: { type: String },
            email: { type: String, required: true, unique: true, dropDups: true, },
            password: { type: String, required: true, },
            role: { type: String, default: 'user' },
            contactNumber: { type: Number, minlength: 10, maxlength: 10 },
            isAuthenticated: {type:Boolean, default:false},
            isAdmin: { type: Boolean, default: false },
            token: String,
        }, { timestamps: true })
    );
    return user;
};

const db=require('../models/model');
module.exports = (mongoose) => {
    const address = mongoose.model('address',
        mongoose.Schema({
            name: String,
            city: String,
            state: String,
            street: String,
            contactNumber: Number,
            landmark: String,
            zipCode: Number,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }

        }, { timestamps: true })
    );
    return address;
};


module.exports = (mongoose) => {
    const order = mongoose.model('order',
        mongoose.Schema({
            address: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Address',
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }

        }, { timestamps: true })
    );
    return order;
};

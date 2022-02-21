module.exports = (mongoose) => {
    const product = mongoose.model('product',
        mongoose.Schema({
            name: String,
            category: {type:String, default:""},
            manufacturer: String,
            availableItems: Number,
            price: Number,
            imageURL: String,
            description: String,
        }, { timestamps: true })
    );
    return product;
};

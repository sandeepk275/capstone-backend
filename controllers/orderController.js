const db = require('../models/model');
const User=db.user;
const Address=db.address;
const Product=db.product;
const Order = db.order;
const validate = db.validateOrder;
exports.createOrder = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // req.user is taken from auth module when user is logged in
    const user = await User.findById(req.user._id).select('-isAdmin -__v');
    if (!user) return res.status(400).send('Invalid user.');

    const product = await Product.findById(req.body.productId);
    if (!product)
        return res
            .status(400)
            .send(`No Product found for ID - ${req.body.productId}!`);

    const address = await Address.findById(req.body.addressId);
    if (!address)
        return res
            .status(400)
            .send(`No Address found for ID - ${req.body.addressId}!`);

    if (product.availableItems === 0)
        return res
            .status(400)
            .send(
                `Product with ID - ${req.body.productId} is currently out of stock!`
            );



    let order = new Order({
        product: {
            _id: product._id,
        },
        address: {
            _id: address._id,
        },
        quantity: req.body.quantity,
    });

    const amount = req.body.quantity * product.price;
    orderDate = [Date.now()];

     Order.find({
        address: req.body.addressId,
        product: req.body.productId,
    })
        .populate("address", "-__v")
        .populate("product", "-__v")
        .select("product address quantity")
    .then((data) => {
        res.status(200).send({ user, product, address, amount, orderDate });
    }).catch((err) => {
        res.status(500).send({ message: "some error ocurred.please try again later" });
    })
}
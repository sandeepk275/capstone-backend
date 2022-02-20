const db = require('../models/model');
const User = db.user;
const Address = db.address;
const validate = db.validateAdd;
exports.shippingAddress = async  (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // req.user is taken from auth module when user is logged in
    // console.log("user===>>>>", req.user._id);
    const user = await  User.findOne({_id:req.user._id}).select('-isAuthenticated -__v');
    if (!user) return res.status(400).send('Invalid user.');
    const address = new Address({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        street: req.body.street,
        contactNumber: req.body.contactNumber,
        landmark: req.body.landmark,
        zipCode: req.body.zipCode,
        user: user,

    });
    address.save(address).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({ message: "some error ocurred.please try again later" });
    })
}
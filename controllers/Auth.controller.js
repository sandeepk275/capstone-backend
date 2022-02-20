const db = require('../models/model');
var User = db.user;
const validate = db.validateUser;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
//...>>>>...........................>>>>>>...............................>>>>>>>>>>.............................
exports.signup = (req, res) => {

    // validation of request
    if (!req.body.firstName || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "please provide firstName, email and password" });
        return;
    }

    //validate the email
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking email already exist or not if not then insert into db

    const filter = { email: req.body.email };
    User.findOne(filter, (err, user) => {
        if (err || user !== null) {
            res.status(400).send({ message: "Try any other email, this email is already registered!" })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            // console.log(hash);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                password: hash,
                role: req.body.role,
                isAuthenticated: req.body.isAuthenticated,
            });
            user.save(user).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({ message: "some error ocurred.please try again later" })
            })
        }
    })
}


//.........................>>>>>>>>...................................>>>>>>>>>>>..............................
exports.login = (req, res) => {
    // validation of request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "please provide email and password" });
        return;
    }

    //matching the first email then password..
    const filter = { email: req.body.email };

    User.findOne(filter, (err, user) => {
        if (err || user === null) {
            res.status(401).json({ message: "This email has not been registered!" })
        } else {

            if (bcrypt.compareSync(req.body.password, user.password)) {   // user has all object that particular email
                // udating the user loggedIn true
                const update = { isAuthenticated: true };
                User.findOneAndUpdate(filter, update, { new: true })
                    .then((user) => {
                        const token = jwt.sign({ _id: user._id }, "myprivatekey")
                        user.token = token;
                        res.json({
                            // email:user.email,
                            // password: user.password,
                            // isAuthenticated: user.isAuthenticated,
                            // token: user.token,
                            user: user,
                        }
                        )
                    })
                    .catch(() => {
                        res.status(500).send({ message: "some error ocurred" })
                    })

            } else {
                res.status(401).send({ message: "Invalid Credentials" })
            }
        }
    })

}
//>>>>>.......................>>>>>>>>>>>>>>>>>>......................>>>>>>>>>>>>>>>>>>>............................
exports.logOut = (req, res) => {
    // validation of request
    if (!req.body.id) {
        res.status(400).send({ message: "please provide id" });
        return;
    }

    const update = { isLoggedIn: false };
    User.findByIdAndUpdate(req.body.id, update, { new: true })
        .then((user) => {
            res.json({
                userDetail: user,
                message: "logout successfully"
            })
        })
        .catch(() => {
            res.status(500).send({ message: "some error ocurred" })
        })
}
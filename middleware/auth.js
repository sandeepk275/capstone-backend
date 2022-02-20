const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //we dont know header is in json or not so simply we use []
    const token = req.headers["authorization"];

    if (!token) { res.status(400).send("Please Login first to access this endpoint") }

    try {
        const decoded=jwt.verify(token, "myprivatekey");
        req.user=decoded;
        console.log(req.user);
        next();
    } catch {
        res.status(400).send("Invalid token");
    }

}
module.exports = function (req, res, next) {
    console.log(req.user);
    if (!req.user.isAdmin) return res.status(403).send('You are not authorized to access this endpoint!');

    next();
    // if user is admin we pass control to next middleware function which in this case route handler.
}
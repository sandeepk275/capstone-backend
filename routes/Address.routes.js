
module.exports = (express, app) => {
    const address = require('../controllers/shippingAddress.controller');
    const auth = require('../middleware/auth')
    var router = express.Router();

    router.post('/addresses', address.shippingAddress);


    app.use('/',auth, router);
}




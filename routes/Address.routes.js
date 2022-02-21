
module.exports = (express, app) => {
    const address = require('../controllers/shippingAddress.controller');
    const auth = require('../middleware/auth')
    var router = express.Router();

    router.post('/addresses',auth, address.shippingAddress);


    app.use('/', router);
}




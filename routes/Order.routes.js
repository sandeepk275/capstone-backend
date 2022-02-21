
module.exports = (express, app) => {
    const order = require('../controllers/orderController');
    const auth = require('../middleware/auth')
    var router = express.Router();

    router.post('/orders', auth, order.createOrder);


    app.use('/', router);
}




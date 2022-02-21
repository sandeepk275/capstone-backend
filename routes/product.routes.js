module.exports = (express, app) => {
    const product = require('../controllers/product.controller');
    const auth=require('../middleware/auth');
    const admin=require('../middleware/admin');
    var router = express.Router();

    // router.post('/', product.retrieveAllProduct);

    router.get('/', product.searchProduct);

    router.get('/categories', product.searchByCatogories);

    router.get('/:id', product.searchById);

    router.post('/', auth, product.saveProduct);

    router.put('/:id',auth, product.updateProduct);

    router.delete('/:id', auth, product.deleteById);



    app.use('/products', router);
}




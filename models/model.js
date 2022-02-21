const dbconfig = require('../config/db.config');
const mongoose = require("mongoose");
const { validateUser } = require('../middleware/validateUser');
const { validateAdd } = require('../middleware/validateAddress');
const { validateProduct, validateProductGet } = require('../middleware/validateProduct');
const { validateOrder}= require('../middleware/validateOrder');

let db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.user = require('./User.model')(mongoose);
db.address = require('./Address.model')(mongoose);
db.product = require('./Product.model')(mongoose);
db.order = require('./Order.model')(mongoose);

db.validateUser = validateUser;
db.validateAdd = validateAdd;
db.validateProduct = validateProduct;
db.validateProductGet = validateProductGet;
db.validateOrder = validateOrder;

module.exports = db;
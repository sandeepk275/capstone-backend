const dbconfig = require('../config/db.config');
const mongoose = require("mongoose");
const { validateUser } = require('../middleware/validateUser');
const { validateAdd } = require('../middleware/validateAddress');
const { validateProduct, validateProductGet } = require('../middleware/validateProduct');


let db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.user = require('./User.model')(mongoose);
db.validateUser = validateUser;
db.validateAdd = validateAdd;
db.validateProduct = validateProduct;
db.validateProductGet = validateProductGet;
db.address=require('./Address.model')(mongoose);
db.product=require('./Product.model')(mongoose);

module.exports = db;
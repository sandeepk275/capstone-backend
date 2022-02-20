const dbconfig = require('../config/db.config');
const mongoose = require("mongoose");
const { validateUser } = require('../middleware/validateUser');
const { validateAdd } = require('../middleware/validateAddress');

let db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.user = require('./User.model')(mongoose);
db.validateUser = validateUser;
db.validateAdd = validateAdd;
db.address=require('./Address.model')(mongoose);

module.exports = db;
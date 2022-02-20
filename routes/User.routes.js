module.exports = (express, app) => {
    const user = require('../controllers/Auth.controller');
    var router = express.Router();

    router.post('/users', user.signup);

    router.post('/auth', user.login);

    router.post('/logout', user.logOut);




    app.use('/', router);
}




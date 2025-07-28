var express = require('express');
var router = express.Router();
const sequelize = require('../config/sequelize');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let message;
    try {
        await sequelize.authenticate();
        message = 'Connection has been established successfully.';
    } catch (error) {
        message = `Unable to connect to the database: ${error}`;
    }
    res.render('users', { message: message });
});

module.exports = router;

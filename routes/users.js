var express = require('express');
var router = express.Router();

const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'jokes.sqlite'
});

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

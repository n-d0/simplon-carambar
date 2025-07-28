var express = require('express');
var router = express.Router();
const sequelize = require('../config/sequelize');
const Joke = require('../models/Joke');

/* GET jokes listing. */
router.get('/', async function(req, res, next) {
    let message='';
    try {
        /* await Joke.sync();
        await Joke.create({
            question: 'Quelle est la femelle du hamster ?',
            answer: 'L’Amsterdam'
        }); */

        const jokes = await Joke.findAll();
        message += ` Jokes: ${JSON.stringify(jokes)}`;
    } catch (error) {
        message = `Unable to connect to the database: ${error}`;
    }
    res.render('jokes', { message: message });
});

module.exports = router;

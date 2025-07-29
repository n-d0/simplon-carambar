var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const response = await fetch('http://localhost:3000/api/jokes/random');
        const joke = await response.json();
        res.render('index', { joke });
    } catch (error) {
        res.render('index', { joke: { question: error, answer: '' } });
    }
});

module.exports = router;
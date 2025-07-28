var express = require('express');
var router = express.Router();
const sequelize = require('../../config/sequelize');
const Joke = require('../../models/Joke');

/* GET jokes listing. */
router.get('/', async function(req, res, next) {
    try {
        const jokes = await Joke.findAll();
        res.json({ jokes: jokes });
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

/* POST endpoint to add a new joke */
router.post('/add', async function(req, res, next) {
    try {
        await Joke.sync();
        const { question, answer } = req.body;
        const newJoke = await Joke.create({
            question,
            answer
        });

        res.status(201).json(newJoke);
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

module.exports = router;

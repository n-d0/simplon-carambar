var express = require('express');
var router = express.Router();
const sequelize = require('../../config/sequelize');
const Joke = require('../../models/Joke');

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Retrieve a list of all jokes
 *     responses:
 *       200:
 *         description: A list of jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the joke.
 *                     example: 1
 *                   question:
 *                     type: string
 *                     description: The question part of the joke.
 *                     example: Quelle est la femelle du hamster ?
 *                   answer:
 *                     type: string
 *                     description: The answer part of the joke.
 *                     example: L’Amsterdam
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the joke was created.
 *                     example: 2025-07-28T08:52:39.248Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the joke was last updated.
 *                     example: 2025-07-28T08:52:39.248Z
 */
router.get('/', async function(req, res, next) {
    try {
        const jokes = await Joke.findAll();
        res.json({ jokes: jokes });
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

/**
 * @swagger
 * /api/jokes/add:
 *   post:
 *     summary: Add a new joke
 *     description: Create a new joke with a question and an answer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question part of the joke.
 *                 example: "Quelle est la femelle du hamster ?"
 *               answer:
 *                 type: string
 *                 description: The answer part of the joke.
 *                 example: "L'Amsterdam"
 *     responses:
 *       201:
 *         description: The joke was created successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the joke.
 *                   example: 1
 *                 question:
 *                   type: string
 *                   description: The question part of the joke.
 *                   example: "Quelle est la femelle du hamster ?"
 *                 answer:
 *                   type: string
 *                   description: The answer part of the joke.
 *                   example: "L'Amsterdam"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error: Internal Server Error"
 */
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

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Retrieve a random joke
 *     description: Fetch a random joke from the collection of jokes.
 *     responses:
 *       200:
 *         description: A random joke.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the joke.
 *                   example: 1
 *                 question:
 *                   type: string
 *                   description: The question part of the joke.
 *                   example: Quelle est la femelle du hamster ?
 *                 answer:
 *                   type: string
 *                   description: The answer part of the joke.
 *                   example: L’Amsterdam
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the joke was created.
 *                   example: 2025-07-28T08:52:39.248Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the joke was last updated.
 *                   example: 2025-07-28T08:52:39.248Z
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error: Internal Server Error"
 */
router.get('/random', async function(req, res, next) {
    try {
        const jokes = await Joke.findAll();
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];
        res.json(randomJoke);
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Retrieve a joke by ID
 *     description: Fetch a specific joke by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the joke to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A joke matching the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the joke.
 *                   example: 1
 *                 question:
 *                   type: string
 *                   description: The question part of the joke.
 *                   example: Quelle est la femelle du hamster ?
 *                 answer:
 *                   type: string
 *                   description: The answer part of the joke.
 *                   example: L’Amsterdam
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the joke was created.
 *                   example: 2025-07-28T08:52:39.248Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the joke was last updated.
 *                   example: 2025-07-28T08:52:39.248Z
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error: Internal Server Error"
 */
router.get('/:id', async function(req, res, next) {
    try {
        const jokeId = req.params.id;
        const joke = await Joke.findByPk(jokeId);
        res.json(joke);
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

module.exports = router;

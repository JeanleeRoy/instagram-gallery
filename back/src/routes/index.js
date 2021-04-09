const express = require('express');
const instaApi = require('../services/instaApi')
const router = express.Router();

// credentials
let token = 'IGQVJWTlJ2MVQtLWl3WFh6dmE5SndhZAUNqTUlKVGdheUpWZAmQ0YVBLbTBCRnRjeU1BSElrZADVGZAGw2aGx3eU5Ddy1kQnRQNkVTTXFUUkkzNGN5QUxDUkRLY0UydlE5czM3SXROQlptMlNwZAi0wTGZAiS1EwTzN5OFRjOVVn'

router.get('/', (req, res) => {
    res.send("index Page");
});

router.get('/handleauth', (req, res) => {
    res.json({ user: 'me' });
});

router.get('/insta-media', (req, res) => {
    instaApi(token, media => {
        res.send(media.data.data);
    }, error => {
        res.status(404).json({ message: error.message });
    });
})

module.exports = router;
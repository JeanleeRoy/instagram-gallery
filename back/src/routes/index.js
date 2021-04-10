const express = require('express');
const instaApi = require('../services/instaApi')
const router = express.Router();

// credentials
let token = 'IGQVJWRkZA6emFkUlhJUHY3OGp5dndtX2loTTViNUZAjUG1qOXMwM3BfZAWl1VDlnVHdiTXJuNUI1MTQwU2t6UnZABMDhzM05ZANXltd2R1cjd1WmE2YU9SSGZA3b1pnMHRMZAEpKdVV5VE05WGc3VFFMak5uTm9qeGR0aThfaWNV'

router.get('/', (req, res) => {
    res.send("index Page");
});

router.get('/handleauth', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({ user: 'me' });
});

router.get('/insta-media', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    instaApi(token, media => {
        res.send(media.data.data);
    }, error => {
        res.status(error.response.status).json(error.response.data.error);
    });
})

module.exports = router;
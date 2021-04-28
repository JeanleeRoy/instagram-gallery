const express = require('express');
const instaApi = require('../services/instaApi')
const router = express.Router();
const path = require('path');

// credentials
let token = 'IGQVJXQXc3aFdfeUdSRF8ycmlmZAC1LRzhuSGNfdXoycVZAqNFpBQnpZAZA25Cd2RSbGVaZAjZAkelBxVUcyX3JIS1QzNFl4Sm1QYlNxbjlFY1VEeUl3b0VqTUF5SWkyM19mbGNST0xYMlBaczgtVzJTU1pOOQZDZD'

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

router.get('/update-token', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.normalize(__dirname+'/../views/index.html'));
});

router.post('/change-token', (req, res) => {
    console.log(token);
    token = req.body.token;
    console.log(token);
    res.json({"message": "Token actualizado", "token": token});
})

module.exports = router;
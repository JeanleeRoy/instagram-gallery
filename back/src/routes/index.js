const express = require('express');
const instaApi = require('../services/instaApi')
const instagram = require('../services/keys').instagram
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.send("index Page");
});

router.get('/handleauth', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({ user: 'me' });
});

router.get('/insta-media', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    instaApi(instagram.token, media => {
        res.send(media.data.data);
    }, error => {
        res.status(error.response.status).json(error.response.data.error);
    });
})

router.get('/get-token', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send({"token": instagram.token});
});

router.get('/update-token', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.normalize(__dirname+'/../views/index.html'));
});

router.post('/change-token', (req, res) => {
    console.log(instagram.token);
    instagram.token = req.body.token;
    console.log(instagram.token);
    res.json({"message": "Token actualizado", "token": instagram.token});
})

module.exports = router;
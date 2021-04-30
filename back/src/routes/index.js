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
        instagram.status.last_access = new Date(Date.now());
        res.send(media.data.data);
    }, error => {
        res.status(error.response.status).json(error.response.data.error);
    });
})

router.get('/get-insta-info', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    let date = new Date(instagram.status.new_token_date)
    instagram.status.left_days = (date.getTime() - new Date(Date.now()).getTime())/(1000 * 3600 * 24)
    res.send({"token": instagram.token, "status": instagram.status});
});

router.get('/update-token', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.normalize(__dirname+'/../views/index.html'));
});

router.post('/change-token', (req, res) => {
    instagram.token = req.body.token;
    let date = new Date(Date.now());
    instagram.status.new_token_date = date;
    date.setDate(date.getDate() + 59)
    instagram.status.last_renewal_date = date;
    instagram.status.left_days = (date.getTime() - new Date(Date.now()).getTime())/(1000 * 3600 * 24)
    res.json({"message": "Token actualizado", "token": instagram.token});
})

module.exports = router;
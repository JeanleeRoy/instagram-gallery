const express = require('express');
const instaApi = require('../services/instaApi')
const insta = require('../services/keys').instagram
const router = express.Router();
const path = require('path');
const {getLeftDays, addDays} = require('../shared/utilities')


router.get('/', (req, res) => {
    res.send("index Page");
});

router.get('/handleauth', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({ user: 'me' });
});

router.get('/insta-media', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    instaApi(insta.token, media => {
        insta.status.last_access = new Date(Date.now());
        res.send(media.data.data.slice(0,3));
    }, error => {
        res.status(error.response.status).json(error.response.data.error);
    });
})

router.get('/get-insta-info', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    insta.status.left_days = getLeftDays(insta.status.last_renewal_date)
    res.send({"token": insta.token, "status": insta.status});
});

router.get('/update-token', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.normalize(__dirname+'/../views/index.html'));
});

router.post('/change-token', (req, res) => {
    insta.token = req.body.token;
    insta.status.new_token_date = new Date(Date.now());
    insta.status.last_renewal_date = addDays(insta.status.new_token_date, 59);
    insta.status.left_days = getLeftDays(insta.status.last_renewal_date);
    res.json({"message": "Token actualizado", "token": insta.token});
})

module.exports = router;
const express = require('express');
const router = express.Router();
const https = require('https')

// credentials
const {clientId, clientSrcret} = require('../services/keys').instagram;

router.get('/', (req, res) => {
    res.send("index Page");
});

router.get('/handleauth', (req, res) => {
    res.json({ user: 'me' });
});

module.exports = router;
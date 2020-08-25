const express = require('express');
const router = express.Router();
const {verifyUser, guestAccess} = require('./auth.js');

router.get('/', (req, res) => {
    res.status(200).render('login');
})

router.post('/', guestAccess ,async (req, res) => {
    await verifyUser(req, res);
})

module.exports = router;
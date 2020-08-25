const express = require('express');
const router = express.Router();
const {createUser, guestAccess} = require('./auth');

router.get('/', guestAccess, (req, res) => {
    res.status(200).render('register');
})

router.post('/', async (req, res) => {
    await createUser(req, res);
})

module.exports = router;
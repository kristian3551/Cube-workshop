const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const loggedIn = req.cookies['token'];
    res.status(200).render('about', {loggedIn});
})

module.exports = router;
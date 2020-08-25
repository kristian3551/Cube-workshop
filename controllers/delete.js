const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const {hasAccess} = require('./auth');

router.get('/:id', hasAccess, async (req, res) => {
    const id = req.params.id;
    await Cube.deleteOne({_id: id});
    res.status(200).redirect('/');
});

module.exports = router;
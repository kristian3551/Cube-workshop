const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const {hasAccess, getDecodedToken} = require('./auth');

router.get('/:id', hasAccess, async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);
    res.status(200).render('edit', {cube});
})

router.post('/:id', hasAccess, async (req, res) => {
    const id = req.params.id;
    const {
        name, description, imageURL, difficulty
    } = req.body
    
    await Cube.updateOne({_id: id}, {$set: {name, description, imageURL, difficulty}});
    res.redirect(`/details/${id}`);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const {getDecodedToken, hasAccess} = require('../controllers/auth');

router.get('/:id', hasAccess, async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id).populate('accessories');
    const hasAccessories = cube.accessories.length > 0;
    const loggedIn = req.cookies['token'];
    const isCreator = (cube.creatorId == getDecodedToken(req)._id);
    res.status(200).render('details', {cube, hasAccessories, accessories: cube.accessories, loggedIn,
    isCreator});
})

module.exports = router;
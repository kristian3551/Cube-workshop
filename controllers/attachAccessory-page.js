const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { hasAccess } = require('./auth');

router.get('/:id',hasAccess, async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);
    let availableAccessories = await Accessory.find({});
    availableAccessories = availableAccessories.filter(e => {
        return !cube.accessories.includes(e._id);
    }).map(e => e.name);
    const hasAvailableAccessories = availableAccessories.length > 0;
    res.status(200).render('attachAccessory', {cube, availableAccessories, hasAvailableAccessories,
    loggedIn: res.loggedIn});
})

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        accessory
    } = req.body;
    
    await Cube.findById(id).then(async (cube) => {
        const availableAccessory = await Accessory.findOne({name: accessory});
        cube.accessories.push(availableAccessory);
        await cube.save()
    })

    res.redirect(`/details/${id}`);
})

module.exports = router;
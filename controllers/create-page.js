const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { hasAccess, getDecodedToken} = require('./auth');

router.get('/', hasAccess, (req, res) => {
    const loggedIn = !!req.cookies['token'];
    res.status(200).render('create', {loggedIn})
})

router.post('/', async (req, res) => {
    const {
        name, description, imageURL, difficulty
    } = req.body
    if(!/^[a-zA-Z0-9 ]{5,}$/.test(name))
        return res.status(404).render('create', {
            error: 'Invalid name',
            loggedIn: true
        })
    else if(!/^[a-zA-Z0-9 ]{20,}$/.test(description))
        return res.status(404).render('create', {
            error: 'Description should have more than 20 alphanumeric symbols or digits',
            loggedIn: true
        })
    else if(!(imageURL.indexOf('http://') == 0 ||
    imageURL.indexOf('https://') == 0))
        return res.status(404).render('create', {
            error: 'ImageURL should start with either http:// or https://',
            loggedIn: true
        })
        const cube = {name, description, imageURL, difficulty, creatorId: getDecodedToken(req)._id}

        new Cube(cube).save((err) => {
        if(err) console.error('Cube cannot be saved')
        });
        res.status(200).redirect('/');
})

router.get('/accessory', hasAccess, (req, res) => {
    res.status(200).render('createAccessory', {loggedIn: res.loggedIn});
})

router.post('/accessory', (req, res) => {
    const {
        name, description, imageURL
    } = req.body;
    if(!/^[a-zA-Z0-9 ]{5,}$/.test(name))
        return res.status(404).render('createAccessory', {
            error: 'Invalid name',
            loggedIn: true
        })
    else if(!/^[a-zA-Z0-9 ]{20,}$/.test(description))
        return res.status(404).render('createAccessory', {
            error: 'Description should have more than 20 alphanumeric symbols or digits',
            loggedIn: true
        })
    else if(!(imageURL.indexOf('http://') == 0 ||
    imageURL.indexOf('https://') == 0))
        return res.status(404).render('createAccessory', {
            error: 'ImageURL should start with either http:// or https://',
            loggedIn: true
        })
        const accessory = {name, description, imageURL};
    new Accessory(accessory).save();
    res.redirect('/');
})

module.exports = router;
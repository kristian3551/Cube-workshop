const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');

router.get('/', async (req, res) => {
    const cubes = await Cube.find();
    const hasCubes = cubes.length > 0;
    const loggedIn = req.cookies['token'];
    res.status(200).render('home', {cubes, hasCubes, loggedIn});
})

function isValid(req, res, next) {
    const {
        search, from, to
    } = req.body
    if(search || (from && to)) next();
    else res.redirect('/');
}

router.post('/', isValid, async (req, res) => {
    const {
        search, from, to
    } = req.body
    let cubes = await Cube.find();

    cubes = cubes.filter(e => {
        if(!(from && to)) {
            return e.name.includes(search)
        }
        if(!search) {
            
        }
        return e.name.includes(search) && e.difficulty >= +from && e.difficulty <= +to
    });

    const hasCubes = cubes.length > 0;
    res.status(200).render('home', {cubes, hasCubes});
})

module.exports = router;
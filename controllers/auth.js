const env = process.env.NODE_ENV || 'development'

const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const bcrypt = require('bcrypt')
const User = require('../models/User')

const generateToken = (data) => {
    const token = jwt.sign(data, config.privateKey);
    return token;
}

const createUser = async (req, res) => {
    const {
        username, password, repeatPassword
    } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if(repeatPassword != password) 
        return res.status(404).render('register', {
            error: 'Passwords do not match'
        });
    if(!(/^[a-zA-Z0-9]{5,}$/.test(username)))
        return res.status(404).render('register', {
            error: 'Invalid username'
        });
    if(!(/^[a-zA-Z0-9]{8,}$/.test(password)))
        return res.status(404).render('register', {
            error: 'Invalid password'
        });
    const user = new User({username, password: hash});
    user.save();
    const token = generateToken({
        _id: user._id,
        username: username
    })
    res.status(200).cookie('token', token).redirect('/');
}

const verifyUser = async (req, res) => {
    const {
        username, password
    } = req.body;

    const user = await User.findOne({username: username})
    if(!user) 
        return res.status(404).render('login', {
            error: 'Incorrect username or password'
        })
    
    bcrypt.compare(password, user.password, (err, status) => {
        if(status) {
            const token = generateToken({
                _id: user._id,
                username: username
            })
            res.cookie('token', token).redirect('/');
        }
        else {
            return res.status(404).render('login', {
                error: 'Incorrect username or password'
            })
        }
    })
}

const isLoggedIn = (req, res) => {
    return !!req.cookies['token'];
}

const hasAccess = (req, res, next) => {
    if(req.cookies['token']) {
        res.loggedIn = true;
        next();
    }
    else res.redirect('/');
}

const guestAccess = (req, res, next) => {
    if(!req.cookies['token']) {
        next();
    }
    else res.redirect('/');
}

const getDecodedToken = (req) => {
    const decodedToken = jwt.verify(req.cookies['token'], config.privateKey);
    return decodedToken
} 
module.exports = {createUser, verifyUser, isLoggedIn, hasAccess, guestAccess, getDecodedToken};
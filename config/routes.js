const homePageRouter = require('../controllers/home-page');
const aboutPageRouter = require('../controllers/about-page');
const createPageRouter = require('../controllers/create-page');
const detailsPageRouter = require('../controllers/details-page');
const attachAccessoryRouter = require('../controllers/attachAccessory-page');
const registerPageRouter = require('../controllers/register-page');
const loginPageRouter = require('../controllers/login-page');
const logoutRouter = require('../controllers/logout');
const editRouter = require('../controllers/edit-page');
const deleteRouter = require('../controllers/delete');

module.exports = (app) => {
    app.use('/', homePageRouter)
    app.use('/about', aboutPageRouter)
    app.use('/create', createPageRouter)
    app.use('/details', detailsPageRouter)
    app.use('/attach/accessory', attachAccessoryRouter)
    app.use('/register', registerPageRouter)
    app.use('/login', loginPageRouter)
    app.use('/logout', logoutRouter)
    app.use('/edit', editRouter)
    app.use('/delete', deleteRouter)
    app.all('*', (req, res) => {
        res.status(404).render('404')
    })
}
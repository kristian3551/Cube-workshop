const mongoose = require('mongoose')
const connectionStr = `mongodb+srv://dbUser:dbUser@cluster0.el6cf.mongodb.net/testdb?retryWrites=true&w=majority`
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

mongoose.connect(connectionStr, {useNewUrlParser: true,
    useUnifiedTopology: true});

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

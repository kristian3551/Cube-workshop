const mongoose = require('mongoose')
const connectionStr = `mongodb://localhost:27017/testdb`
const Cube = require('./models/Cube');
const Accessory = require('./models/Accessory');
const User = require('./models/User');

mongoose.connect(connectionStr, (err) => console.error);

// new User({username: 'default', password: '123456789'}).save()
// (async () => {
//     console.log(await User.find({}));
// })()

Cube.update(id, {name, description, imageURL, difficulty, 
    creatorId: getDecodedToken(req)._id});
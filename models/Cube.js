const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {type: String, required: true, match: [/^[a-zA-Z0-9 ]{5,}$/, 'Invalid name']},
    description: {type: String, required: true, match: [/^[a-zA-Z0-9 ]{20,}$/, 'Description should have more than 20 alphanumeric symbols or digits']},
    imageURL: {type: String, required: true},
    difficulty: {type: Number, required: true},
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Accessory'}],
    creatorId: {type: String, required: true}
});

module.exports = mongoose.model('Cube', cubeSchema);
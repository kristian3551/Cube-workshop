const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {type: String, required: true, match: /^[a-zA-Z0-9 ]{5,}$/},
    description: {type: String, required: true, match: /^[a-zA-Z0-9 ]{20,}$/},
    imageURL: {type: String, required: true, validate: {
        validator: function(v) {
            return v.indexOf('http://') == 0 || v.indexOf('https://') == 0;
        }
    }}
});

module.exports = mongoose.model('Accessory', accessorySchema);
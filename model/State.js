const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statesSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        array: [String]
    }
});

module.exports = mongoose.model('State', statesSchema);
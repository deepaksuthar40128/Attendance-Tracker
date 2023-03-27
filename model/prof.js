const mongoose = require('mongoose');

const prof = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    courser: {
        type: Object,
    }
}
);

module.exports = mongoose.model('Prof', prof);
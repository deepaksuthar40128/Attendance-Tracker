const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
}
);

module.exports = mongoose.model('Users', user);
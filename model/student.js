const mongoose = require('mongoose');

const student = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    courses: {
        type: Object,
    }
},
);

module.exports = mongoose.model('Students', student);
const mongoose = require('mongoose');
const keys = new mongoose.Schema({
    email: String,
    key: String,
}, { timestamps: true }
);

module.exports = mongoose.model('Keys', keys);
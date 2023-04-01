const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    email: String
});

module.exports = mongoose.model('Student', studentSchema);
